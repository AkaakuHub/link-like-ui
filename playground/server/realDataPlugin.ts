import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import type { RealDataConfig } from "./domain/realData";
import { RealDataService } from "./application/realDataService";
import { createRealDataRepository } from "./repositories/createRealDataRepository";

export function realDataPlugin(): Plugin {
	const rootDir = process.env["LINK_LIKE_UI_REAL_DATA_ROOT"];

	if (!rootDir) {
		return {
			name: "link-like-ui-real-data-disabled",
		};
	}

	const config: RealDataConfig = {
		rootDir: resolve(rootDir),
		source:
			process.env["LINK_LIKE_UI_REAL_DATA_SOURCE"] === "postgresDocker"
				? "postgresDocker"
				: "static",
	};
	const postgresContainer = process.env["LINK_LIKE_UI_POSTGRES_CONTAINER"];
	const postgresDatabase = process.env["LINK_LIKE_UI_POSTGRES_DATABASE"];
	const postgresUser = process.env["LINK_LIKE_UI_POSTGRES_USER"];

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
						sendJson(res, await service.listMedia());
						return;
					}

					if (requestUrl.pathname.startsWith("/__real-data/comments/")) {
						const liveId = decodeURIComponent(
							requestUrl.pathname.replace("/__real-data/comments/", ""),
						);
						sendJson(res, await service.getComments(liveId));
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
