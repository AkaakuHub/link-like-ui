import {
	cpSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";

mkdirSync("dist/assets/fonts", { recursive: true });
cpSync(
	"src/assets/fonts/Poppins-Regular.ttf",
	"dist/assets/fonts/Poppins-Regular.ttf",
);

const cssImportTarget = "dist/styles/index.css";
const entryFiles = [];

for (const entryName of readdirSync("dist")) {
	const entryPath = join("dist", entryName);
	if (!statSync(entryPath).isDirectory()) {
		continue;
	}

	const candidate = join(entryPath, "index.js");
	try {
		if (statSync(candidate).isFile()) {
			entryFiles.push(candidate);
		}
	} catch {}
}

for (const entryFile of entryFiles) {
	const relativeCssPath = relative(
		entryFile.replace(/[^/]+$/, ""),
		cssImportTarget,
	).replaceAll("\\", "/");
	const cssImportStatement = `import "${relativeCssPath.startsWith(".") ? relativeCssPath : `./${relativeCssPath}`}";\n`;
	const currentSource = readFileSync(entryFile, "utf8");

	if (currentSource.startsWith(cssImportStatement)) {
		continue;
	}

	writeFileSync(entryFile, `${cssImportStatement}${currentSource}`);
}
