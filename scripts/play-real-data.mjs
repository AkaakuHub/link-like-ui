import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const rootDirIndex = args.indexOf("--rootDir");
const rootDir = rootDirIndex >= 0 ? args[rootDirIndex + 1] : undefined;
const forwardedArgs =
	rootDirIndex >= 0
		? args.filter(
				(_, index) => index !== rootDirIndex && index !== rootDirIndex + 1,
			)
		: args;

if (!rootDir) {
	console.error("Usage: pnpm play:real -- --rootDir <data-root>");
	process.exit(1);
}

const child = spawn(
	process.platform === "win32" ? "pnpm.cmd" : "pnpm",
	["play", "--host", "0.0.0.0", ...forwardedArgs],
	{
		env: {
			...process.env,
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
