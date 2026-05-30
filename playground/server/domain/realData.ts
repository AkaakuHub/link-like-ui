export interface RealDataConfig {
	rootDir: string;
	source: "postgresDocker" | "static";
	postgresContainer?: string;
	postgresDatabase?: string;
	postgresUser?: string;
}

export interface RealMediaItem {
	duration: string;
	hlsPath: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	releasedAt: string;
	title: string;
}

export interface RealComment {
	id: string;
	message: string;
	playTimeMs: number;
	userName: string;
}

export interface RealDataRepository {
	getComments(liveId: string): Promise<readonly RealComment[]>;
	listMedia(): Promise<readonly RealMediaItem[]>;
	resolveFilePath(relativePath: string): string;
}
