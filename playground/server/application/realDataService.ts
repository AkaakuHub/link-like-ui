import type {
	RealComment,
	RealDataRepository,
	RealMediaItem,
} from "../domain/realData";

export class RealDataService {
	readonly #repository: RealDataRepository;

	constructor(repository: RealDataRepository) {
		this.#repository = repository;
	}

	getComments(liveId: string): Promise<readonly RealComment[]> {
		return this.#repository.getComments(liveId);
	}

	getMedia(liveId: string): Promise<RealMediaItem | null> {
		return this.#repository.getMedia(liveId);
	}

	listMedia(): Promise<readonly RealMediaItem[]> {
		return this.#repository.listMedia();
	}

	resolveFilePath(relativePath: string): string {
		return this.#repository.resolveFilePath(relativePath);
	}
}
