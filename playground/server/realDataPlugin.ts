import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import type { RealDataConfig, RealDataPageOptions } from "./domain/realData";
import { RealDataService } from "./application/realDataService";
import { createRealDataRepository } from "./repositories/createRealDataRepository";

export function realDataPlugin(): Plugin {
	const hlsRoot = process.env["LINK_LIKE_UI_HLS_ROOT"];
	const liveAssetsRoot = process.env["LINK_LIKE_UI_LIVE_ASSETS_ROOT"];
	const metadataRoot = process.env["LINK_LIKE_UI_METADATA_ROOT"];

	if (!hlsRoot || !liveAssetsRoot || !metadataRoot) {
		return {
			name: "link-like-ui-real-data-disabled",
		};
	}

	const config: RealDataConfig = {
		hlsRoot: resolve(hlsRoot),
		liveAssetsRoot: resolve(liveAssetsRoot),
		metadataRoot: resolve(metadataRoot),
		source:
			process.env["LINK_LIKE_UI_REAL_DATA_SOURCE"] === "postgresDocker"
				? "postgresDocker"
				: "static",
	};
	const commentsRoot = process.env["LINK_LIKE_UI_COMMENTS_ROOT"];
	const postgresContainer = process.env["LINK_LIKE_UI_POSTGRES_CONTAINER"];
	const postgresDatabase = process.env["LINK_LIKE_UI_POSTGRES_DATABASE"];
	const postgresUser = process.env["LINK_LIKE_UI_POSTGRES_USER"];

	if (commentsRoot) config.commentsRoot = resolve(commentsRoot);
	if (postgresContainer) config.postgresContainer = postgresContainer;
	if (postgresDatabase) config.postgresDatabase = postgresDatabase;
	if (postgresUser) config.postgresUser = postgresUser;
	const service = new RealDataService(createRealDataRepository(config));

	return {
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const requestUrl = new URL(req.url ?? "/", "http://localhost");

				try {
					if (requestUrl.pathname === "/__real-data/media") {
						sendJson(res, await service.listMedia(readPageOptions(requestUrl)));
						return;
					}

					if (requestUrl.pathname.startsWith("/__real-data/media/")) {
						const liveId = decodeURIComponent(
							requestUrl.pathname.replace("/__real-data/media/", ""),
						);
						const media = await service.getMedia(liveId);
						if (!media) {
							res.statusCode = 404;
							res.end("Not found");
							return;
						}
						sendJson(res, media);
						return;
					}

					if (requestUrl.pathname.startsWith("/__real-data/comments/")) {
						const liveId = decodeURIComponent(
							requestUrl.pathname.replace("/__real-data/comments/", ""),
						);
						sendJson(res, await service.getComments(liveId, readPageOptions(requestUrl)));
						return;
					}

					if (requestUrl.pathname.startsWith("/__real-data/rankings/")) {
						const liveId = decodeURIComponent(
							requestUrl.pathname.replace("/__real-data/rankings/", ""),
						);
						sendJson(res, await service.getRankings(liveId, readPageOptions(requestUrl)));
						return;
					}

					if (requestUrl.pathname.startsWith("/__real-data/file/")) {
						const relativePath = decodeURIComponent(
							requestUrl.pathname.replace("/__real-data/file/", ""),
						);
						await sendFile(req, res, service.resolveFilePath(relativePath));
						return;
					}
				} catch (error) {
					res.statusCode = 500;
					res.end(error instanceof Error ? error.message : String(error));
					return;
				}

				next();
			});
		},
		name: "link-like-ui-real-data",
	};
}

function readPageOptions(requestUrl: URL): RealDataPageOptions {
	const afterMode = requestUrl.searchParams.get("afterMode");
	const characterFilters = readCharacterFilters(
		requestUrl.searchParams.get("characterFilters"),
	);
	const fromPlayTimeMs = requestUrl.searchParams.get("fromPlayTimeMs");
	const keyword = requestUrl.searchParams.get("keyword");
	const liveType = requestUrl.searchParams.get("liveType");
	const playTimeMs = requestUrl.searchParams.get("playTimeMs");
	const sortBy = requestUrl.searchParams.get("sortBy");
	const options: RealDataPageOptions = {
		limit: clampNumber(
			Number(requestUrl.searchParams.get("limit") ?? 60),
			1,
			5000,
		),
		offset: Math.max(0, Number(requestUrl.searchParams.get("offset") ?? 0)),
	};

	if (afterMode === "has" || afterMode === "none" || afterMode === "all") {
		options.afterMode = afterMode;
	}
	if (characterFilters) {
		options.characterFilters = characterFilters;
	}
	if (fromPlayTimeMs !== null) {
		options.fromPlayTimeMs = Math.max(0, Number(fromPlayTimeMs));
	}
	if (keyword !== null) {
		options.keyword = keyword.trim();
	}
	if (liveType === "withMeets" || liveType === "fesLive" || liveType === "all") {
		options.liveType = liveType;
	}
	if (playTimeMs !== null) {
		options.playTimeMs = Math.max(0, Number(playTimeMs));
	}
	if (sortBy === "withStar" || sortBy === "date") {
		options.sortBy = sortBy;
	}

	return options;
}

function readCharacterFilters(value: string | null) {
	if (!value) return null;

	try {
		const parsed: unknown = JSON.parse(value);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			return null;
		}

		const filters: Record<string, "all" | "show" | "hide"> = {};
		for (const [key, filterValue] of Object.entries(parsed)) {
			if (filterValue === "all" || filterValue === "show" || filterValue === "hide") {
				filters[key] = filterValue;
			}
		}

		return filters;
	} catch {
		return null;
	}
}

function clampNumber(value: number, min: number, max: number) {
	if (!Number.isFinite(value)) return min;
	return Math.min(max, Math.max(min, Math.floor(value)));
}

function sendJson(res: ServerResponse, value: unknown) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.end(JSON.stringify(value));
}

async function sendFile(req: IncomingMessage, res: ServerResponse, filePath: string) {
	const file = await stat(filePath);
	const range = req.headers.range;
	res.setHeader("Accept-Ranges", "bytes");
	res.setHeader("Content-Type", contentTypeForPath(filePath));

	if (!range) {
		res.setHeader("Content-Length", String(file.size));
		createReadStream(filePath).pipe(res);
		return;
	}

	const match = range.match(/^bytes=(\d+)-(\d*)$/);

	if (!match) {
		res.statusCode = 416;
		res.end();
		return;
	}

	const start = Number(match[1]);
	const end = match[2] ? Number(match[2]) : file.size - 1;

	if (start >= file.size || end >= file.size || start > end) {
		res.statusCode = 416;
		res.end();
		return;
	}

	res.statusCode = 206;
	res.setHeader("Content-Range", `bytes ${start}-${end}/${file.size}`);
	res.setHeader("Content-Length", String(end - start + 1));
	createReadStream(filePath, { end, start }).pipe(res);
}

function contentTypeForPath(pathname: string) {
	const extension = extname(pathname).toLowerCase();

	if (extension === ".m3u8") return "application/vnd.apple.mpegurl";
	if (extension === ".m4s") return "video/iso.segment";
	if (extension === ".m2ts" || extension === ".ts") return "video/mp2t";
	if (extension === ".jpg") return "image/jpeg";
	if (extension === ".json") return "application/json; charset=utf-8";
	return "application/octet-stream";
}
