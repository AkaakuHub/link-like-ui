import type {
	MediaArchiveItemInput,
} from "../../../src/Components/Patterns/MediaScreen";
import type {
	WithMeetsCommentInput,
} from "../../../src/Components/Patterns/WithMeetsScreen";

export interface RealMediaItem extends MediaArchiveItemInput {
	chapters: readonly RealMediaChapter[];
	description: string;
	hlsPath: string;
}

export interface RealMediaChapter {
	isExtra: boolean;
	name: string;
	playTimeSecond: number | null;
}

export interface RealComment extends WithMeetsCommentInput {
	playTimeMs: number;
}

export async function fetchRealMediaItems(): Promise<RealMediaItem[]> {
	const response = await fetch("/__real-data/media");

	if (!response.ok) {
		throw new Error(`Failed to load real media: ${response.status}`);
	}

	return (await response.json()) as RealMediaItem[];
}

export async function fetchRealMediaItem(
	liveId: string,
): Promise<RealMediaItem> {
	const response = await fetch(`/__real-data/media/${encodeURIComponent(liveId)}`);

	if (!response.ok) {
		throw new Error(`Failed to load real media item: ${response.status}`);
	}

	return (await response.json()) as RealMediaItem;
}

export async function fetchRealComments(liveId: string): Promise<RealComment[]> {
	const response = await fetch(`/__real-data/comments/${encodeURIComponent(liveId)}`);

	if (!response.ok) {
		throw new Error(`Failed to load real comments: ${response.status}`);
	}

	return (await response.json()) as RealComment[];
}
