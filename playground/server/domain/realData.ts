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

export interface RealDataRepository {
	getComments(liveId: string): Promise<readonly RealComment[]>;
	getMedia(liveId: string): Promise<RealMediaItem | null>;
	listMedia(): Promise<readonly RealMediaItem[]>;
	resolveFilePath(relativePath: string): string;
}
