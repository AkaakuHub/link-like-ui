import { existsSync, readdirSync } from "node:fs";
import { defineConfig } from "tsdown";

function collectEntryFiles(): Record<string, string> {
	const entryFiles: Record<string, string> = {};
	const families = readdirSync("src", { withFileTypes: true }).filter((entry) =>
		entry.isDirectory(),
	);

	for (const family of families) {
		const familyPath = `src/${family.name}`;
		const components = readdirSync(familyPath, { withFileTypes: true }).filter(
			(entry) => entry.isDirectory(),
		);

		for (const component of components) {
			const entryKey = `${family.name}/${component.name}/index`;
			const entryValue = `${familyPath}/${component.name}/index.tsx`;

			if (!existsSync(entryValue)) {
				continue;
			}

			entryFiles[entryKey] = entryValue;
		}
	}

	return entryFiles;
}

export default defineConfig({
	dts: true,
	entry: collectEntryFiles(),
	platform: "neutral",
});
