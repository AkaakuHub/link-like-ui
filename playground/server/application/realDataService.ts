import type {
	RealComment,
	RealDataPage,
	RealDataPageOptions,
	RealDataRepository,
	RealGiftRanking,
	RealMediaItem,
} from "../domain/realData";

export class RealDataService {
	readonly #repository: RealDataRepository;

	constructor(repository: RealDataRepository) {
		this.#repository = repository;
	}

	getComments(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealComment>> {
		return this.#repository.getComments(liveId, options);
	}

	getMedia(liveId: string): Promise<RealMediaItem | null> {
		return this.#repository.getMedia(liveId);
	}

	getRankings(
		liveId: string,
		options: RealDataPageOptions,
	): Promise<RealDataPage<RealGiftRanking>> {
		return this.#repository.getRankings(liveId, options);
	}

	listMedia(options: RealDataPageOptions): Promise<RealDataPage<RealMediaItem>> {
		return this.#repository.listMedia(options);
	}

	resolveFilePath(relativePath: string): string {
		return this.#repository.resolveFilePath(relativePath);
	}
}
