import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { promisify } from "node:util";
import type {
	RealComment,
	RealDataConfig,
	RealDataPage,
	RealDataPageOptions,
	RealDataRepository,
	RealGiftRanking,
	RealMediaChapter,
	RealMediaItem,
} from "../domain/realData";
import { resolveInsideRoot, toServedFilePath } from "./pathUtils";

const execFileAsync = promisify(execFile);

interface PostgresMediaRow {
	description: string;
	duration: string;
	id: string;
	imageAlt: string;
	isHorizontal: boolean;
	releasedAt: string;
	title: string;
	videoUrl: string;
}

interface ArchiveDetailMetadata {
	chapters?: unknown;
	is_horizontal?: unknown;
	live_id?: unknown;
	title?: unknown;
}

interface ChapterMetadata {
	is_extra?: unknown;
	name?: unknown;
	play_time_second?: unknown;
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

	async listMedia(
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealMediaItem>> {
		const rows = await this.#queryJson<PostgresMediaRow>(`
			select coalesce(json_agg(row_to_json(media_rows)), '[]'::json)
			from (
				select
					with_meets.archives_id as id,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as title,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as "imageAlt",
					coalesce(live_archive_details.description, '') as description,
					coalesce(live_archive_details.is_horizontal, true) as "isHorizontal",
					to_char(coalesce(with_meets.live_start_time, live_archive_details.live_start_time), 'YYYY.MM.DD') as "releasedAt",
					case
						when coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) is null then ''
						else floor(coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) / 60)::text || ':' || lpad((coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) % 60)::text, 2, '0')
					end as duration,
					live_archive_details.video_url as "videoUrl"
				from with_meets
				left join live_archive_details on live_archive_details.live_id = with_meets.archives_id
				where with_meets.thumbnail_image_url is not null
					and live_archive_details.video_url is not null
				order by coalesce(with_meets.live_start_time, live_archive_details.live_start_time) desc
				limit ${options.limit + 1}
				offset ${options.offset}
			) media_rows
		`);

		const items: RealMediaItem[] = [];

		for (const row of rows) {
			const item = await this.#toMediaItem(row);
			if (item) {
				items.push(item);
			}
		}

		return pageFromLimitPlusOne(items, options);
	}

	async getMedia(liveId: string): Promise<RealMediaItem | null> {
		const rows = await this.#queryJson<PostgresMediaRow>(`
			select coalesce(json_agg(row_to_json(media_rows)), '[]'::json)
			from (
				select
					with_meets.archives_id as id,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as title,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as "imageAlt",
					coalesce(live_archive_details.description, '') as description,
					coalesce(live_archive_details.is_horizontal, true) as "isHorizontal",
					to_char(coalesce(with_meets.live_start_time, live_archive_details.live_start_time), 'YYYY.MM.DD') as "releasedAt",
					case
						when coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) is null then ''
						else floor(coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) / 60)::text || ':' || lpad((coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) % 60)::text, 2, '0')
					end as duration,
					live_archive_details.video_url as "videoUrl"
				from with_meets
				left join live_archive_details on live_archive_details.live_id = with_meets.archives_id
				where with_meets.archives_id = ${sqlLiteral(liveId)}
					and with_meets.thumbnail_image_url is not null
					and live_archive_details.video_url is not null
				limit 1
			) media_rows
		`);
		const row = rows[0];
		return row ? await this.#toMediaItem(row) : null;
	}

	async getComments(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealComment>> {
		const playTimeCondition =
			typeof options.playTimeMs === "number"
				? `and play_time_ms <= ${Math.floor(options.playTimeMs)}`
				: "";
		const fromPlayTimeCondition =
			typeof options.fromPlayTimeMs === "number"
				? `and play_time_ms > ${Math.floor(options.fromPlayTimeMs)}`
				: "";
		const orderBy =
			typeof options.playTimeMs === "number"
				? "play_time_ms asc, timeline_id asc"
				: "play_time_ms asc, timeline_id asc";
		const rows = await this.#queryJson<RealComment>(`
			select coalesce(json_agg(row_to_json(comment_rows)), '[]'::json)
			from (
				select
					(timeline_id || '-' || play_time_ms::text || '-' || coalesce(type, '') || '-' || coalesce(user_player_id, '')) as id,
					case
						when body is not null and body <> '' then body
						when type = 'gift' then 'Gift item ' || coalesce(item_id::text, 'unknown') || ' x' || coalesce(amount::text, '1') || ' / ' || coalesce(gift_pt::text, '0') || ' pt'
						else '[' || coalesce(type, 'event') || ']'
					end as message,
					coalesce(play_time_ms, 0) as "playTimeMs",
					user_name as "userName"
				from withlive_comments
				where live_id = ${sqlLiteral(liveId)}
					${fromPlayTimeCondition}
					${playTimeCondition}
				order by ${orderBy}
				limit ${options.limit + 1}
				offset ${options.offset}
			) comment_rows
		`);
		return pageFromLimitPlusOne(rows, options);
	}

	async getRankings(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealGiftRanking>> {
		const rows = await this.#queryJson<RealGiftRanking>(`
			select coalesce(json_agg(row_to_json(ranking_rows)), '[]'::json)
			from (
				select
					timeline_id as id,
					coalesce(gift_pt::text, '0') || ' pt' as amount,
					'item ' || coalesce(item_id::text, 'unknown') || ' x' || coalesce(amount::text, '1') as label,
					user_name as "userName"
				from withlive_comments
				where live_id = ${sqlLiteral(liveId)}
					and type = 'gift'
				order by play_time_ms asc, timeline_id asc
				limit ${options.limit + 1}
				offset ${options.offset}
			) ranking_rows
		`);
		return pageFromLimitPlusOne(rows, options);
	}

	async #queryJson<T>(sql: string): Promise<T[]> {
		const container = this.#config.postgresContainer ?? "with-meets-server-db-1";
		const database = this.#config.postgresDatabase ?? "withmeets";
		const user = this.#config.postgresUser ?? "hinoshita";
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

	async #toMediaItem(row: PostgresMediaRow): Promise<RealMediaItem | null> {
		const hlsRelativePath = this.#resolveHlsRelativePath(row.videoUrl);
		const thumbnailRelativePath = await this.#resolveThumbnailRelativePath(row.id);

		if (!hlsRelativePath || !thumbnailRelativePath) return null;

		const detail = await this.#readDetail(row.id);

		return {
			chapters: normalizeChapters(detail?.chapters),
			description: row.description,
			duration: row.duration,
			hlsPath: toServedFilePath(hlsRelativePath),
			id: row.id,
			imageAlt: row.imageAlt,
			imageSrc: toServedFilePath(thumbnailRelativePath),
			isHorizontal: detail?.is_horizontal === false ? false : row.isHorizontal,
			releasedAt: row.releasedAt,
			title: row.title,
		};
	}

	async #readDetail(liveId: string): Promise<ArchiveDetailMetadata | null> {
		for (const fileName of ["archive-details.json", "with-station-details.json"]) {
			const content = await readFile(
				join(this.#rootDir, "linkura-live-data", "data", fileName),
				"utf8",
			).catch(() => null);

			if (!content) continue;

			const parsed = JSON.parse(content) as unknown;
			if (!isObject(parsed)) continue;

			const detail = parsed[liveId];
			if (isObject(detail)) return detail;
		}

		return null;
	}
}

function pageFromLimitPlusOne<TItem>(
	rows: readonly TItem[],
	options: RealDataPageOptions,
): RealDataPage<TItem> {
	const items = rows.slice(0, options.limit);
	return {
		hasMore: rows.length > options.limit,
		items,
		nextOffset: options.offset + items.length,
	};
}

function sqlLiteral(value: string) {
	return `'${value.replaceAll("'", "''")}'`;
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function normalizeChapters(value: unknown): readonly RealMediaChapter[] {
	if (!Array.isArray(value)) return [];

	return value.filter(isObject).flatMap((chapter: ChapterMetadata) => {
		const name = typeof chapter.name === "string" ? chapter.name : null;

		if (!name) return [];

		return [
			{
				isExtra: chapter.is_extra === true,
				name,
				playTimeSecond:
					typeof chapter.play_time_second === "number"
						? chapter.play_time_second
						: null,
			},
		];
	});
}
