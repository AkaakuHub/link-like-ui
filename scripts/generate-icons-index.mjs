import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const iconsDirectoryPath = join(process.cwd(), "src/assets/icons");
const outputFilePath = join(iconsDirectoryPath, "index.tsx");

function toPascalCase(fileName) {
	return fileName
		.split(/[-/]/u)
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join("");
}

function findSvgFileNames(directoryPath, prefix = "") {
	return readdirSync(directoryPath, { withFileTypes: true }).flatMap(
		(entry) => {
			const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

			if (entry.isDirectory()) {
				return findSvgFileNames(join(directoryPath, entry.name), relativePath);
			}

			if (!entry.name.endsWith(".svg")) {
				return [];
			}

			return [relativePath.replace(/\.svg$/u, "")];
		},
	);
}

function createExportLine(filePath) {
	const exportBaseName = `${toPascalCase(filePath)}Icon`;
	const importName = `${toPascalCase(filePath)}Svg`;

	return `export const ${exportBaseName} = (props: SvgIconProps) => (\n\t<${importName} aria-hidden="true" height="24" width="24" {...props} />\n);`;
}

const svgFileNames = findSvgFileNames(iconsDirectoryPath).sort(
	(leftValue, rightValue) => leftValue.localeCompare(rightValue),
);

const importLines = svgFileNames.map((filePath) => {
	const importName = `${toPascalCase(filePath)}Svg`;

	return `import ${importName} from "./${filePath}.svg";`;
});

const exportLines = svgFileNames.map(createExportLine);

const output = `import type { SVGProps } from "react";
${importLines.join("\n")}

type SvgIconProps = SVGProps<SVGSVGElement>;

${exportLines.join("\n")}
`;

writeFileSync(outputFilePath, output);
