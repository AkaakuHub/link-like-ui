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

export interface RealDataPage<TItem> {
	hasMore: boolean;
	items: TItem[];
	nextOffset: number;
}

export async function fetchRealMediaItems(
	offset = 0,
	limit = 40,
): Promise<RealDataPage<RealMediaItem>> {
	const response = await fetch(
		`/__real-data/media?offset=${offset}&limit=${limit}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to load real media: ${response.status}`);
	}

	return (await response.json()) as RealDataPage<RealMediaItem>;
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

export async function fetchRealComments(
	liveId: string,
	offset = 0,
	limit = 80,
	playTimeMs?: number,
): Promise<RealDataPage<RealComment>> {
	const params = new URLSearchParams({
		limit: String(limit),
		offset: String(offset),
	});

	if (playTimeMs !== undefined) {
		params.set("playTimeMs", String(Math.floor(playTimeMs)));
	}

	const response = await fetch(
		`/__real-data/comments/${encodeURIComponent(liveId)}?${params.toString()}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to load real comments: ${response.status}`);
	}

	return (await response.json()) as RealDataPage<RealComment>;
}

export async function fetchRealRankings(
	liveId: string,
	offset = 0,
	limit = 80,
): Promise<RealDataPage<{
	amount: string;
	id: string;
	label: string;
	userName: string;
}>> {
	const response = await fetch(
		`/__real-data/rankings/${encodeURIComponent(liveId)}?offset=${offset}&limit=${limit}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to load real rankings: ${response.status}`);
	}

	return (await response.json()) as RealDataPage<{
		amount: string;
		id: string;
		label: string;
		userName: string;
	}>;
}
