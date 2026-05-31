import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
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

interface ArchiveMetadata {
	archives_id?: unknown;
	description?: unknown;
	live_id?: unknown;
	name?: unknown;
	thumbnail_image_url?: unknown;
	total_playing_time_second?: unknown;
	video_url?: unknown;
}

interface ArchiveDetailMetadata {
	chapters?: unknown;
	description?: unknown;
	is_horizontal?: unknown;
	live_id?: unknown;
	title?: unknown;
	total_play_time_second?: unknown;
	video_url?: unknown;
}

interface ChapterMetadata {
	is_extra?: unknown;
	name?: unknown;
	play_time_second?: unknown;
}

export class StaticRealDataRepository implements RealDataRepository {
	readonly #metadataRoot: string;
	readonly #rootDir: string;
	#commentsByLiveId: Record<string, readonly RealComment[]> | null = null;
	#mediaItems: readonly RealMediaItem[] | null = null;

	constructor(config: RealDataConfig) {
		this.#metadataRoot = resolve(config.metadataRoot);
		this.#rootDir = resolve(config.rootDir);
	}

	resolveFilePath(relativePath: string) {
		return resolveInsideRoot(this.#rootDir, relativePath);
	}

	async listMedia(
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealMediaItem>> {
		this.#mediaItems ??= await this.#listMediaFromMetadata();
		return pageItems(this.#mediaItems, options);
	}

	async getMedia(liveId: string): Promise<RealMediaItem | null> {
		this.#mediaItems ??= await this.#listMediaFromMetadata();
		const items = this.#mediaItems;
		return items.find((item) => item.id === liveId) ?? null;
	}

	async getComments(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealComment>> {
		this.#commentsByLiveId ??= await this.#readComments();
		const comments = (this.#commentsByLiveId[liveId] ?? []).filter((comment) => {
			if (
				typeof options.fromPlayTimeMs === "number" &&
				comment.playTimeMs <= options.fromPlayTimeMs
			) {
				return false;
			}
			return (
				typeof options.playTimeMs !== "number" ||
				comment.playTimeMs <= options.playTimeMs
			);
		});
		return pageItems(comments, options);
	}

	async getRankings(
		_liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealGiftRanking>> {
		return pageItems([], options);
	}

	async #listMediaFromMetadata(): Promise<readonly RealMediaItem[]> {
		const archiveRows = await this.#readMetadataItems("archive.json");
		const withStationRows = await this.#readMetadataItems("with-station.json");
		const detailRows = await this.#readDetailItems("archive-details.json");
		const withStationDetailRows = await this.#readDetailItems(
			"with-station-details.json",
		);
		const detailsByTitle = new Map(
			[...detailRows, ...withStationDetailRows].map((detail) => [
				stringValue(detail.title) ?? "",
				detail,
			]),
		);
		const items: RealMediaItem[] = [];

		for (const metadata of [...archiveRows, ...withStationRows]) {
			const id = stringValue(metadata.archives_id) ?? stringValue(metadata.live_id);
			const listTitle = stringValue(metadata.name) ?? id;
			const detail = listTitle ? detailsByTitle.get(listTitle) : undefined;
			const title = stringValue(detail?.title) ?? listTitle;
			const hlsPath =
				stringValue(detail?.video_url) ?? stringValue(metadata.video_url);

			if (!id || !title || !hlsPath) continue;

			const hlsRelativePath = this.#resolveHlsRelativePath(hlsPath);
			const thumbnailRelativePath = await this.#resolveThumbnailRelativePath(id);

			if (!hlsRelativePath || !thumbnailRelativePath) continue;

			items.push({
				chapters: normalizeChapters(detail?.chapters),
				description:
					stringValue(detail?.description) ??
					stringValue(metadata.description) ??
					"",
				duration: durationLabel(
					numberValue(detail?.total_play_time_second) ??
						numberValue(metadata.total_playing_time_second),
				),
				hlsPath: toServedFilePath(hlsRelativePath),
				id,
				imageAlt: title,
				imageSrc: toServedFilePath(thumbnailRelativePath),
				isHorizontal:
					typeof detail?.is_horizontal === "boolean"
						? detail.is_horizontal
						: inferHorizontal(title),
				releasedAt: dateLabelFromHlsPath(hlsPath),
				title,
			});
		}

		return sortMediaItems(items);
	}

	async #readJsonArray(
		fileName: string,
	): Promise<readonly Record<string, unknown>[]> {
		const candidates = [
			join(this.#rootDir, "linkura-live-data", "data", fileName),
			join(this.#metadataRoot, "data", fileName),
		];
		for (const candidate of candidates) {
			const content = await readFile(candidate, "utf8").catch(() => null);

			if (!content) continue;

			const parsed = JSON.parse(content) as unknown;
			return Array.isArray(parsed)
				? parsed.filter(isObject)
				: Object.values(isObject(parsed) ? parsed : {}).filter(isObject);
		}

		return [];
	}

	async #readMetadataItems(
		fileName: string,
	): Promise<readonly ArchiveMetadata[]> {
		return this.#readJsonArray(fileName);
	}

	async #readDetailItems(
		fileName: string,
	): Promise<readonly ArchiveDetailMetadata[]> {
		return this.#readJsonArray(fileName);
	}

	async #readComments(): Promise<Record<string, readonly RealComment[]>> {
		const commentsPath = join(
			this.#rootDir,
			"with-meets-comments",
			"withlive-comments.json",
		);
		const content = await readFile(commentsPath, "utf8").catch(() => "{}");
		return JSON.parse(content) as Record<string, readonly RealComment[]>;
	}

	#resolveHlsRelativePath(videoUrl: string) {
		const pathname = videoUrl.startsWith("http")
			? new URL(videoUrl).pathname
			: videoUrl;
		const hlsPath = pathname.replace(/^\/?archive\/hls\//, "");
		const candidates = [
			join("with-meets-hls", hlsPath),
			join("with-meets-hls", firstPathSegment(hlsPath), "index.m3u8"),
		];

		return candidates.find((candidate) => existsSync(join(this.#rootDir, candidate))) ?? null;
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

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function stringValue(value: unknown) {
	return typeof value === "string" && value.length > 0 ? value : null;
}

function numberValue(value: unknown) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function durationLabel(seconds: number | null) {
	if (!seconds) return "";

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function dateLabelFromHlsPath(hlsPath: string) {
	const match = hlsPath.match(/(\d{8})/);
	return match?.[1] ? dateLabelFromId(match[1]) : "";
}

function dateLabelFromId(id: string) {
	return /^\d{8}/.test(id)
		? `${id.slice(0, 4)}.${id.slice(4, 6)}.${id.slice(6, 8)}`
		: id;
}

function sortMediaItems(items: readonly RealMediaItem[]) {
	return [...items].sort((left, right) =>
		right.releasedAt.localeCompare(left.releasedAt),
	);
}

function pageItems<TItem>(
	items: readonly TItem[],
	options: RealDataPageOptions,
): RealDataPage<TItem> {
	const page = items.slice(options.offset, options.offset + options.limit);
	const nextOffset = options.offset + page.length;

	return {
		hasMore: nextOffset < items.length,
		items: page,
		nextOffset,
	};
}

function normalizeChapters(value: unknown): readonly RealMediaChapter[] {
	if (!Array.isArray(value)) return [];

	return value.filter(isObject).flatMap((chapter: ChapterMetadata) => {
		const name = stringValue(chapter.name);

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

function firstPathSegment(pathname: string) {
	return pathname.split("/")[0] ?? "";
}

function inferHorizontal(title: string) {
	return title.includes("Fes×LIVE") || title.includes("Fes x LIVE");
}
