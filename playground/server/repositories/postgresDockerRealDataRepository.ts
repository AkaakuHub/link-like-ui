import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
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
	characterIds: number[] | null;
	description: string;
	duration: string;
	hasExtra: boolean | null;
	id: string;
	imageAlt: string;
	isHorizontal: boolean | null;
	liveType: number | null;
	releasedAt: string;
	thumbnailImageUrl: string;
	title: string;
	videoUrl: string;
	withStarCount: number | null;
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
		const rows = await this.#listMediaRows(options);
		const items = rows.map((row) => this.#toMediaListItem(row));
		return pageFromLimitPlusOne(items, options);
	}

	async #listMediaRows(options: RealDataPageOptions) {
		const whereConditions = mediaWhereConditions(options);
		const orderBy =
			options.sortBy === "withStar"
				? "coalesce(with_meets.earned_star_count, 0) desc, coalesce(with_meets.live_start_time, live_archive_details.live_start_time) desc"
				: "coalesce(with_meets.live_start_time, live_archive_details.live_start_time) desc";
		const rows = await this.#queryJson<PostgresMediaRow>(`
			select coalesce(json_agg(row_to_json(media_rows)), '[]'::json)
			from (
				select
					coalesce(
						(
							select array_agg(live_archive_characters.character_id order by live_archive_characters.character_index)
							from live_archive_characters
							where live_archive_characters.live_id = with_meets.archives_id
						),
						array[]::integer[]
					) as "characterIds",
					with_meets.archives_id as id,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as title,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as "imageAlt",
					coalesce(live_archive_details.description, '') as description,
					coalesce(live_archive_details.has_extra, with_meets.has_extra, false) as "hasExtra",
					live_archive_details.is_horizontal as "isHorizontal",
					with_meets.live_type as "liveType",
					to_char(coalesce(with_meets.live_start_time, live_archive_details.live_start_time), 'YYYY.MM.DD') as "releasedAt",
					with_meets.thumbnail_image_url as "thumbnailImageUrl",
					case
						when coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) is null then ''
						else floor(coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) / 60)::text || ':' || lpad((coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) % 60)::text, 2, '0')
					end as duration,
					live_archive_details.video_url as "videoUrl",
					coalesce(with_meets.earned_star_count, 0) as "withStarCount"
				from with_meets
				left join live_archive_details on live_archive_details.live_id = with_meets.archives_id
				where ${whereConditions.join("\n\t\t\t\t\tand ")}
				order by ${orderBy}
				limit ${options.limit + 1}
				offset ${options.offset}
			) media_rows
		`);
		return rows;
	}

	async getMedia(liveId: string): Promise<RealMediaItem | null> {
		const rows = await this.#queryJson<PostgresMediaRow>(`
			select coalesce(json_agg(row_to_json(media_rows)), '[]'::json)
			from (
				select
					coalesce(
						(
							select array_agg(live_archive_characters.character_id order by live_archive_characters.character_index)
							from live_archive_characters
							where live_archive_characters.live_id = with_meets.archives_id
						),
						array[]::integer[]
					) as "characterIds",
					with_meets.archives_id as id,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as title,
					coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) as "imageAlt",
					coalesce(live_archive_details.description, '') as description,
					coalesce(live_archive_details.has_extra, with_meets.has_extra, false) as "hasExtra",
					live_archive_details.is_horizontal as "isHorizontal",
					with_meets.live_type as "liveType",
					to_char(coalesce(with_meets.live_start_time, live_archive_details.live_start_time), 'YYYY.MM.DD') as "releasedAt",
					with_meets.thumbnail_image_url as "thumbnailImageUrl",
					case
						when coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) is null then ''
						else floor(coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) / 60)::text || ':' || lpad((coalesce(live_archive_details.total_play_time_second, with_meets.total_playing_time_second) % 60)::text, 2, '0')
					end as duration,
					live_archive_details.video_url as "videoUrl",
					coalesce(with_meets.earned_star_count, 0) as "withStarCount"
				from with_meets
				left join live_archive_details on live_archive_details.live_id = with_meets.archives_id
				where with_meets.archives_id = ${sqlLiteral(liveId)}
					and with_meets.thumbnail_image_url is not null
					and live_archive_details.video_url is not null
				limit 1
			) media_rows
		`);
		const row = rows[0];
		return row ? await this.#toMediaDetailItem(row) : null;
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
		return join("official-assets", "archive", "hls", hlsPath);
	}

	#resolveThumbnailRelativePath(id: string, thumbnailImageUrl: string) {
		const pathname = thumbnailImageUrl.startsWith("http")
			? new URL(thumbnailImageUrl).pathname
			: thumbnailImageUrl;
		const fileName = pathname.split("/").at(-1) ?? "";
		return join("with-meets-live-assets", "thumbnail", id, fileName);
	}

	#toMediaListItem(row: PostgresMediaRow): RealMediaItem {
		const hlsRelativePath = this.#resolveHlsRelativePath(row.videoUrl);
		const thumbnailRelativePath = this.#resolveThumbnailRelativePath(row.id, row.thumbnailImageUrl);

		return {
			chapters: [],
			characters: characterIdsToNames(row.characterIds ?? []),
			description: row.description,
			duration: row.duration,
			hasExtra: row.hasExtra ?? false,
			hlsPath: toServedFilePath(hlsRelativePath),
			id: row.id,
			imageAlt: row.imageAlt,
			imageSrc: toServedFilePath(thumbnailRelativePath),
			isHorizontal: row.isHorizontal ?? inferHorizontal(row.title),
			liveType: row.liveType,
			releasedAt: row.releasedAt,
			title: row.title,
			withStarCount: row.withStarCount ?? 0,
		};
	}

	async #toMediaDetailItem(row: PostgresMediaRow): Promise<RealMediaItem> {
		const hlsRelativePath = this.#resolveHlsRelativePath(row.videoUrl);
		const thumbnailRelativePath = this.#resolveThumbnailRelativePath(row.id, row.thumbnailImageUrl);
		const detail = await this.#readDetail(row.id);
		const chapters = await this.#readChapters(row.id);

		return {
			chapters: chapters.length > 0 ? chapters : normalizeChapters(detail?.chapters),
			characters: characterIdsToNames(row.characterIds ?? []),
			description: row.description,
			duration: row.duration,
			hasExtra: row.hasExtra ?? false,
			hlsPath: toServedFilePath(hlsRelativePath),
			id: row.id,
			imageAlt: row.imageAlt,
			imageSrc: toServedFilePath(thumbnailRelativePath),
			isHorizontal:
					typeof detail?.is_horizontal === "boolean"
						? detail.is_horizontal
						: row.isHorizontal ?? inferHorizontal(row.title),
			liveType: row.liveType,
			releasedAt: row.releasedAt,
			title: row.title,
			withStarCount: row.withStarCount ?? 0,
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

	async #readChapters(liveId: string): Promise<readonly RealMediaChapter[]> {
		return this.#queryJson<RealMediaChapter>(`
			select coalesce(json_agg(row_to_json(chapter_rows)), '[]'::json)
			from (
				select
					live_archive_chapters.is_extra as "isExtra",
					live_archive_chapters.name,
					live_archive_chapters.play_time_second as "playTimeSecond"
				from live_archive_chapters
				where live_archive_chapters.live_id = ${sqlLiteral(liveId)}
				order by live_archive_chapters.chapter_index asc
			) chapter_rows
		`);
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

const characterNamesById = new Map<number, string>([
	[1021, "梢"],
	[1022, "綴理"],
	[1023, "慈"],
	[1031, "花帆"],
	[1032, "さやか"],
	[1033, "瑠璃乃"],
	[1041, "吟子"],
	[1042, "小鈴"],
	[1043, "姫芽"],
	[1051, "セラス"],
	[1052, "泉"],
]);

function characterIdsToNames(characterIds: readonly number[]) {
	return characterIds.flatMap((characterId) => {
		const name = characterNamesById.get(characterId);
		return name ? [name] : [];
	});
}

function characterNameToId(characterName: string) {
	for (const [characterId, name] of characterNamesById.entries()) {
		if (name === characterName) return characterId;
	}

	return null;
}

function mediaWhereConditions(options: RealDataPageOptions) {
	const conditions = [
		"with_meets.thumbnail_image_url is not null",
		"live_archive_details.video_url is not null",
	];
	const keyword = options.keyword?.trim();

	if (options.liveType === "withMeets") {
		conditions.push("with_meets.live_type = 2");
	}
	if (options.liveType === "fesLive") {
		conditions.push("with_meets.live_type = 1");
	}
	if (options.afterMode === "has") {
		conditions.push("coalesce(live_archive_details.has_extra, with_meets.has_extra, false) = true");
	}
	if (options.afterMode === "none") {
		conditions.push("coalesce(live_archive_details.has_extra, with_meets.has_extra, false) = false");
	}
	if (keyword) {
		const keywordPattern = sqlLikeLiteral(keyword);
		conditions.push(`(
			coalesce(live_archive_details.title, with_meets.name, with_meets.archives_id) ilike ${keywordPattern} escape '\\'
			or coalesce(live_archive_details.description, '') ilike ${keywordPattern} escape '\\'
			or coalesce(with_meets.archives_id, '') ilike ${keywordPattern} escape '\\'
		)`);
	}

	for (const [character, filter] of Object.entries(
		options.characterFilters ?? {},
	)) {
		if (filter === "all") continue;
		const characterId = characterNameToId(character);
		if (!characterId) continue;
		const existsCondition = `exists (select 1 from live_archive_characters where live_archive_characters.live_id = with_meets.archives_id and live_archive_characters.character_id = ${characterId})`;
		conditions.push(filter === "show" ? existsCondition : `not (${existsCondition})`);
	}

	return conditions;
}

function sqlLikeLiteral(value: string) {
	return sqlLiteral(
		`%${value
			.replaceAll("\\", "\\\\")
			.replaceAll("%", "\\%")
			.replaceAll("_", "\\_")}%`,
	);
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

function inferHorizontal(title: string) {
	return title.includes("Fes×LIVE") || title.includes("Fes x LIVE");
}
