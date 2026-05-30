import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const optionNames = new Set([
	"--metadataRoot",
	"--postgresContainer",
	"--postgresDatabase",
	"--postgresUser",
	"--rootDir",
	"--source",
]);
const options = new Map();
const forwardedArgs = [];

for (let index = 0; index < args.length; index += 1) {
	const arg = args[index];

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

const rootDir = options.get("--rootDir");

if (typeof rootDir !== "string") {
	console.error("Usage: pnpm play:real -- --rootDir <data-root>");
	process.exit(1);
}

const child = spawn(
	process.platform === "win32" ? "pnpm.cmd" : "pnpm",
	["play", "--host", "0.0.0.0", ...forwardedArgs],
	{
		env: {
			...process.env,
			...(options.has("--metadataRoot")
				? { LINK_LIKE_UI_METADATA_ROOT: options.get("--metadataRoot") }
				: {}),
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
			...(options.has("--source")
				? { LINK_LIKE_UI_REAL_DATA_SOURCE: options.get("--source") }
				: {}),
			LINK_LIKE_UI_REAL_DATA_ROOT: rootDir,
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
