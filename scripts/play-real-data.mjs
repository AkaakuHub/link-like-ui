import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const optionNames = new Set([
	"--commentsRoot",
	"--hlsRoot",
	"--liveAssetsRoot",
	"--metadataRoot",
	"--postgresContainer",
	"--postgresDatabase",
	"--postgresUser",
	"--source",
]);
const options = new Map();
const forwardedArgs = [];

for (let index = 0; index < args.length; index += 1) {
	const arg = args[index];

	if (arg === "--") {
		continue;
	}

	if (!optionNames.has(arg)) {
		forwardedArgs.push(arg);
		continue;
	}

	const value = args[index + 1];

	if (!value) {
		console.error(`${arg} requires a value.`);
		process.exit(1);
	}

	options.set(arg, value);
	index += 1;
}

const hlsRoot = options.get("--hlsRoot");
const liveAssetsRoot = options.get("--liveAssetsRoot");
const metadataRoot = options.get("--metadataRoot");
const source = options.get("--source") ?? "static";

if (
	typeof hlsRoot !== "string" ||
	typeof liveAssetsRoot !== "string" ||
	typeof metadataRoot !== "string"
) {
	console.error(
		"Usage: pnpm play:real -- --metadataRoot <metadata-root> --hlsRoot <hls-root> --liveAssetsRoot <live-assets-root>",
	);
	process.exit(1);
}

if (source !== "postgresDocker" && !options.has("--commentsRoot")) {
	console.error(
		"--commentsRoot is required unless --source postgresDocker is used.",
	);
	process.exit(1);
}

const child = spawn(
	process.platform === "win32" ? "pnpm.cmd" : "pnpm",
	["play", "--host", "0.0.0.0", ...forwardedArgs],
	{
		env: {
			...process.env,
			...(options.has("--commentsRoot")
				? { LINK_LIKE_UI_COMMENTS_ROOT: options.get("--commentsRoot") }
				: {}),
			LINK_LIKE_UI_HLS_ROOT: hlsRoot,
			LINK_LIKE_UI_LIVE_ASSETS_ROOT: liveAssetsRoot,
			LINK_LIKE_UI_METADATA_ROOT: metadataRoot,
			...(options.has("--postgresContainer")
				? {
						LINK_LIKE_UI_POSTGRES_CONTAINER: options.get("--postgresContainer"),
					}
				: {}),
			...(options.has("--postgresDatabase")
				? { LINK_LIKE_UI_POSTGRES_DATABASE: options.get("--postgresDatabase") }
				: {}),
			...(options.has("--postgresUser")
				? { LINK_LIKE_UI_POSTGRES_USER: options.get("--postgresUser") }
				: {}),
			LINK_LIKE_UI_REAL_DATA_SOURCE: source,
			VITE_LINK_LIKE_UI_REAL_DATA: "1",
		},
		stdio: "inherit",
	},
);

child.on("exit", (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal);
		return;
	}

	process.exit(code ?? 0);
});
