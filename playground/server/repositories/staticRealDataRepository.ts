import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import type {
	RealComment,
	RealDataConfig,
	RealDataRepository,
	RealMediaItem,
} from "../domain/realData";
import { resolveInsideRoot, toServedFilePath } from "./pathUtils";

interface ArchiveMetadata {
	archives_id?: unknown;
	live_id?: unknown;
	name?: unknown;
	thumbnail_image_url?: unknown;
	total_playing_time_second?: unknown;
	video_url?: unknown;
}

export class StaticRealDataRepository implements RealDataRepository {
	readonly #rootDir: string;
	#commentsByLiveId: Record<string, readonly RealComment[]> | null = null;

	constructor(config: RealDataConfig) {
		this.#rootDir = resolve(config.rootDir);
	}

	resolveFilePath(relativePath: string) {
		return resolveInsideRoot(this.#rootDir, relativePath);
	}

	async listMedia(): Promise<readonly RealMediaItem[]> {
		const metadataItems = await this.#readMetadataItems();

		if (metadataItems.length > 0) {
			return this.#listMediaFromMetadata(metadataItems);
		}

		return this.#listMediaFromDirectories();
	}

	async getComments(liveId: string): Promise<readonly RealComment[]> {
		this.#commentsByLiveId ??= await this.#readComments();
		return this.#commentsByLiveId[liveId] ?? [];
	}

	async #listMediaFromMetadata(
		metadataItems: readonly ArchiveMetadata[],
	): Promise<readonly RealMediaItem[]> {
		const items: RealMediaItem[] = [];

		for (const metadata of metadataItems) {
			const id = stringValue(metadata.archives_id) ?? stringValue(metadata.live_id);
			const title = stringValue(metadata.name) ?? id;
			const hlsPath = stringValue(metadata.video_url);

			if (!id || !title || !hlsPath) continue;

			const hlsRelativePath = this.#resolveHlsRelativePath(hlsPath);
			const thumbnailRelativePath = await this.#resolveThumbnailRelativePath(id);

			if (!hlsRelativePath || !thumbnailRelativePath) continue;

			items.push({
				duration: durationLabel(numberValue(metadata.total_playing_time_second)),
				hlsPath: toServedFilePath(hlsRelativePath),
				id,
				imageAlt: title,
				imageSrc: toServedFilePath(thumbnailRelativePath),
				releasedAt: dateLabelFromHlsPath(hlsPath),
				title,
			});
		}

		return sortMediaItems(items);
	}

	async #listMediaFromDirectories(): Promise<readonly RealMediaItem[]> {
		const hlsRoot = join(this.#rootDir, "with-meets-hls");
		const entries = await readdir(hlsRoot, { withFileTypes: true }).catch(() => []);
		const items: RealMediaItem[] = [];

		for (const entry of entries) {
			if (!entry.isDirectory()) continue;

			const id = entry.name;
			const hlsRelativePath = join("with-meets-hls", id, "index.m3u8");
			const thumbnailRelativePath = await this.#resolveThumbnailRelativePath(id);

			if (!existsSync(join(this.#rootDir, hlsRelativePath)) || !thumbnailRelativePath) {
				continue;
			}

			items.push({
				duration: "",
				hlsPath: toServedFilePath(hlsRelativePath),
				id,
				imageAlt: id,
				imageSrc: toServedFilePath(thumbnailRelativePath),
				releasedAt: dateLabelFromId(id),
				title: id,
			});
		}

		return sortMediaItems(items);
	}

	async #readMetadataItems(): Promise<readonly ArchiveMetadata[]> {
		const candidates = [
			join(this.#rootDir, "linkura-live-data", "data", "archive.json"),
			join(this.#rootDir, "data", "archive.json"),
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

function firstPathSegment(pathname: string) {
	return pathname.split("/")[0] ?? "";
}
