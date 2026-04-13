import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const iconsDirectoryPath = join(process.cwd(), "src/assets/icons");
const outputFilePath = join(iconsDirectoryPath, "index.tsx");

function toPascalCase(fileName) {
	return fileName
		.split("-")
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join("");
}

function createExportLine(fileName) {
	const exportBaseName = `${toPascalCase(fileName)}Icon`;
	const importName = `${toPascalCase(fileName)}Svg`;

	return `export const ${exportBaseName} = (props: SvgIconProps) => (\n\t<${importName} aria-hidden="true" height="24" width="24" {...props} />\n);`;
}

const svgFileNames = readdirSync(iconsDirectoryPath)
	.filter((fileName) => fileName.endsWith(".svg"))
	.map((fileName) => fileName.replace(/\.svg$/u, ""))
	.sort((leftValue, rightValue) => leftValue.localeCompare(rightValue));

const importLines = svgFileNames.map((fileName) => {
	const importName = `${toPascalCase(fileName)}Svg`;

	return `import ${importName} from "./${fileName}.svg";`;
});

const exportLines = svgFileNames.map(createExportLine);

const output = `import type { SVGProps } from "react";
${importLines.join("\n")}

type SvgIconProps = SVGProps<SVGSVGElement>;

${exportLines.join("\n")}
`;

writeFileSync(outputFilePath, output);
