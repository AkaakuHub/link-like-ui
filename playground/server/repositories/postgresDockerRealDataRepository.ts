import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { promisify } from "node:util";
import type {
	RealComment,
	RealDataConfig,
	RealDataRepository,
	RealMediaItem,
} from "../domain/realData";
import { resolveInsideRoot, toServedFilePath } from "./pathUtils";

const execFileAsync = promisify(execFile);

interface PostgresMediaRow {
	duration: string;
	id: string;
	imageAlt: string;
	releasedAt: string;
	title: string;
	videoUrl: string;
}

export class PostgresDockerRealDataRepository implements RealDataRepository {
	readonly #config: RealDataConfig;
	readonly #rootDir: string;

	constructor(config: RealDataConfig) {
		this.#config = config;
		this.#rootDir = resolve(config.rootDir);
	}

	resolveFilePath(relativePath: string) {
		return resolveInsideRoot(this.#rootDir, relativePath);
	}

	async listMedia(): Promise<readonly RealMediaItem[]> {
		const rows = await this.#queryJson<PostgresMediaRow>(`
			select coalesce(json_agg(row_to_json(media_rows)), '[]'::json)
			from (
				select
					with_meets.archives_id as id,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as title,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as "imageAlt",
					to_char(coalesce(with_meets.live_start_time, live_archive_details.live_start_time), 'YYYY.MM.DD') as "releasedAt",
					case
						when with_meets.total_playing_time_second is null then ''
						else floor(with_meets.total_playing_time_second / 60)::text || ':' || lpad((with_meets.total_playing_time_second % 60)::text, 2, '0')
					end as duration,
					live_archive_details.video_url as "videoUrl"
				from with_meets
				left join live_archive_details on live_archive_details.live_id = with_meets.archives_id
				where with_meets.thumbnail_image_url is not null
					and live_archive_details.video_url is not null
			) media_rows
		`);

		const items: RealMediaItem[] = [];

		for (const row of rows) {
			const hlsRelativePath = this.#resolveHlsRelativePath(row.videoUrl);
			const thumbnailRelativePath = await this.#resolveThumbnailRelativePath(row.id);

			if (!hlsRelativePath || !thumbnailRelativePath) continue;

			items.push({
				duration: row.duration,
				hlsPath: toServedFilePath(hlsRelativePath),
				id: row.id,
				imageAlt: row.imageAlt,
				imageSrc: toServedFilePath(thumbnailRelativePath),
				releasedAt: row.releasedAt,
				title: row.title,
			});
		}

		return items;
	}

	async getComments(liveId: string): Promise<readonly RealComment[]> {
		return this.#queryJson<RealComment>(`
			select coalesce(json_agg(row_to_json(comment_rows)), '[]'::json)
			from (
				select
					id::text as id,
					body as message,
					coalesce(play_time_ms, 0) as "playTimeMs",
					user_name as "userName"
				from withlive_comments
				where live_id = ${sqlLiteral(liveId)}
				order by play_time_ms asc, id asc
			) comment_rows
		`);
	}

	async #queryJson<T>(sql: string): Promise<T[]> {
		const container = this.#config.postgresContainer ?? "with-meets-server-db-1";
		const database = this.#config.postgresDatabase ?? "postgres";
		const user = this.#config.postgresUser ?? "postgres";
		const { stdout } = await execFileAsync("docker", [
			"exec",
			"-i",
			container,
			"psql",
			"-U",
			user,
			"-d",
			database,
			"-At",
			"-c",
			sql,
		]);

		const text = stdout.trim();
		return text ? (JSON.parse(text) as T[]) : [];
	}

	#resolveHlsRelativePath(videoUrl: string) {
		const pathname = videoUrl.startsWith("http")
			? new URL(videoUrl).pathname
			: videoUrl;
		const hlsPath = pathname.replace(/^\/?archive\/hls\//, "");
		const firstSegment = hlsPath.split("/")[0] ?? "";
		const candidates = [
			join("with-meets-hls", hlsPath),
			join("with-meets-hls", firstSegment, "index.m3u8"),
		];

		return (
			candidates.find((candidate) => existsSync(join(this.#rootDir, candidate))) ??
			null
		);
	}

	async #resolveThumbnailRelativePath(id: string) {
		const dir = join(this.#rootDir, "with-meets-live-assets", "thumbnail", id);
		const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
		const image = entries.find(
			(entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".jpg"),
		);

		return image ? relative(this.#rootDir, join(dir, image.name)) : null;
	}
}

function sqlLiteral(value: string) {
	return `'${value.replaceAll("'", "''")}'`;
}
