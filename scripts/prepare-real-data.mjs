import { spawnSync } from "node:child_process";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline";

const args = process.argv.slice(2);

function readArg(name) {
	const index = args.indexOf(name);
	return index >= 0 ? args[index + 1] : undefined;
}

const commentsRoot =
	readArg("--commentsRoot") ?? process.env.LINK_LIKE_UI_COMMENTS_ROOT;

if (!commentsRoot) {
	console.error(
		"Usage: pnpm real-data:prepare -- --commentsRoot <comments-root>",
	);
	process.exit(1);
}

const dumpPath = readArg("--dump") ?? join(commentsRoot, "full-withmeets.dump");
const outputPath =
	readArg("--out") ?? join(commentsRoot, "withlive-comments.json");
const sqlPath = join(
	tmpdir(),
	`link-like-ui-withlive-comments-${process.pid}.sql`,
);
const imageName = readArg("--postgresImage") ?? "postgres:17-alpine";
const dumpDir = dirname(resolve(dumpPath));
const dockerUser =
	typeof process.getuid === "function" && typeof process.getgid === "function"
		? [`--user`, `${process.getuid()}:${process.getgid()}`]
		: [];

const restored = spawnSync(
	"docker",
	[
		"run",
		"--rm",
		...dockerUser,
		"-v",
		`${dumpDir}:/dump:ro`,
		"-v",
		`${tmpdir()}:/out`,
		imageName,
		"pg_restore",
		"-t",
		"withlive_comments",
		"-f",
		`/out/${basename(sqlPath)}`,
		`/dump/${basename(dumpPath)}`,
	],
	{ stdio: "inherit" },
);

if (restored.status !== 0) {
	console.error("pg_restore failed.");
	process.exit(restored.status ?? 1);
}

function parseCell(value) {
	if (value === "\\N") return null;

	return value
		.replaceAll("\\\\", "\\")
		.replaceAll("\\t", "\t")
		.replaceAll("\\n", "\n")
		.replaceAll("\\r", "\r");
}

const grouped = new Map();
let isReadingCopyData = false;
let foundCopyData = false;
let liveIdIndex = -1;
let idIndex = -1;
let userNameIndex = -1;
let bodyIndex = -1;
let playTimeIndex = -1;

for await (const line of createInterface({
	input: createReadStream(sqlPath, { encoding: "utf8" }),
})) {
	if (!isReadingCopyData) {
		if (!line.startsWith("COPY public.withlive_comments")) continue;

		const columnsMatch = line.match(/\(([^)]+)\)/);

		if (!columnsMatch) {
			console.error("withlive_comments COPY columns were not found.");
			process.exit(1);
		}

		const columns = columnsMatch[1].split(",").map((column) => column.trim());
		liveIdIndex = columns.indexOf("live_id");
		idIndex = columns.indexOf("id");
		userNameIndex = columns.indexOf("user_name");
		bodyIndex = columns.indexOf("body");
		playTimeIndex = columns.indexOf("play_time_ms");

		if (liveIdIndex < 0 || userNameIndex < 0 || bodyIndex < 0) {
			console.error("withlive_comments does not contain required columns.");
			process.exit(1);
		}

		isReadingCopyData = true;
		foundCopyData = true;
		continue;
	}

	if (line === "\\.") {
		break;
	}

	if (!line) continue;

	const cells = line.split("\t").map(parseCell);
	const liveId = cells[liveIdIndex];
	const body = cells[bodyIndex];
	const userName = cells[userNameIndex];

	if (!liveId || !body || !userName) continue;

	const comments = grouped.get(liveId) ?? [];
	grouped.set(liveId, comments);
	comments.push({
		id: cells[idIndex] ?? `${liveId}-${comments.length + 1}`,
		message: body,
		playTimeMs: Number(cells[playTimeIndex] ?? 0),
		userName,
	});
}

await rm(sqlPath, { force: true });

if (!foundCopyData) {
	console.error("withlive_comments COPY data was not found.");
	process.exit(1);
}

await mkdir(dirname(outputPath), { recursive: true });

const stream = createWriteStream(outputPath, { encoding: "utf8" });
stream.write("{\n");

let groupIndex = 0;
for (const [liveId, comments] of grouped.entries()) {
	comments.sort((left, right) => left.playTimeMs - right.playTimeMs);
	stream.write(
		`${groupIndex === 0 ? "" : ",\n"}${JSON.stringify(liveId)}:${JSON.stringify(comments)}`,
	);
	groupIndex += 1;
}

stream.write("\n}\n");
stream.end();
await new Promise((resolveFinished) => {
	stream.on("finish", resolveFinished);
});

await writeFile(
	join(dirname(outputPath), "withlive-comments.summary.json"),
	JSON.stringify(
		{
			liveCount: grouped.size,
			outputPath,
		},
		null,
		2,
	),
);
