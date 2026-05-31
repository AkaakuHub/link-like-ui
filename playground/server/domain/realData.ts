export interface RealDataConfig {
	metadataRoot: string;
	rootDir: string;
	source: "postgresDocker" | "static";
	postgresContainer?: string;
	postgresDatabase?: string;
	postgresUser?: string;
}

export interface RealMediaItem {
	chapters: readonly RealMediaChapter[];
	description: string;
	duration: string;
	hlsPath: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	isHorizontal: boolean;
	releasedAt: string;
	title: string;
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
	fromPlayTimeMs?: number;
	limit: number;
	offset: number;
	playTimeMs?: number;
}
