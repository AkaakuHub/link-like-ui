export interface RealDataConfig {
	hlsRoot: string;
	liveAssetsRoot: string;
	metadataRoot: string;
	source: "postgresDocker" | "static";
	commentsRoot?: string;
	postgresContainer?: string;
	postgresDatabase?: string;
	postgresUser?: string;
}

export interface RealMediaItem {
	chapters: readonly RealMediaChapter[];
	characters: readonly string[];
	description: string;
	duration: string;
	hasExtra: boolean;
	hlsPath: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	isHorizontal: boolean;
	liveType: number | null;
	releasedAt: string;
	title: string;
	withStarCount: number;
}

export interface RealMediaChapter {
	isExtra: boolean;
	name: string;
	playTimeSecond: number | null;
}

export interface RealComment {
	id: string;
	message: string;
	playTimeMs: number;
	userName: string;
}

export interface RealDataPage<TItem> {
	hasMore: boolean;
	items: readonly TItem[];
	nextOffset: number;
}

export interface RealGiftRanking {
	amount: string;
	id: string;
	label: string;
	userName: string;
}

export interface RealDataRepository {
	getComments(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealComment>>;
	getMedia(liveId: string): Promise<RealMediaItem | null>;
	getRankings(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealGiftRanking>>;
	listMedia(options: RealDataPageOptions): Promise<RealDataPage<RealMediaItem>>;
	resolveFilePath(relativePath: string): string;
}

export interface RealDataPageOptions {
	afterMode?: "all" | "has" | "none";
	characterFilters?: Record<string, "all" | "show" | "hide">;
	fromPlayTimeMs?: number;
	keyword?: string;
	limit: number;
	liveType?: "all" | "withMeets" | "fesLive";
	offset: number;
	playTimeMs?: number;
	sortBy?: "date" | "withStar";
}
