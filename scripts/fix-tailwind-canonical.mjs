import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { __unstable__loadDesignSystem } from "@tailwindcss/node";
import ts from "typescript";

const repoRoot = process.cwd();
const cssPath = path.resolve(repoRoot, "src/styles/index.css");
const supportedExtensions = new Set([".ts", ".tsx"]);
const classAttributes = new Set(["class", "className"]);
const calleeFunctions = new Set(["cn", "clsx", "classNames", "twMerge", "cva"]);
const mode = process.argv.includes("--check") ? "check" : "write";

async function main() {
	const cssSource = await fs.readFile(cssPath, "utf8");
	const designSystem = await __unstable__loadDesignSystem(cssSource, {
		base: path.dirname(cssPath),
	});

	const filePaths = getTrackedTypeScriptFiles();
	let changedFileCount = 0;
	let changedOccurrenceCount = 0;

	for (const filePath of filePaths) {
		const fileSource = await fs.readFile(filePath, "utf8");
		const sourceFile = ts.createSourceFile(
			filePath,
			fileSource,
			ts.ScriptTarget.Latest,
			true,
			getScriptKind(filePath),
		);
		const replacements = [];

		visitNode(sourceFile, sourceFile, designSystem, replacements);

		if (replacements.length === 0) {
			continue;
		}

		const nextSource = applyReplacements(fileSource, replacements);

		if (nextSource === fileSource) {
			continue;
		}

		changedFileCount += 1;
		changedOccurrenceCount += replacements.length;

		if (mode === "write") {
			await fs.writeFile(filePath, nextSource, "utf8");
		}
	}

	if (changedFileCount === 0) {
		console.log("tailwind-canonical: no changes");
		return;
	}

	if (mode === "check") {
		console.error(
			`tailwind-canonical: ${changedOccurrenceCount} issue(s) in ${changedFileCount} file(s)`,
		);
		process.exitCode = 1;
		return;
	}

	console.log(
		`tailwind-canonical: fixed ${changedOccurrenceCount} issue(s) in ${changedFileCount} file(s)`,
	);
}

function getTrackedTypeScriptFiles() {
	const stdout = execFileSync("git", ["ls-files", "--", "*.ts", "*.tsx"], {
		cwd: repoRoot,
		encoding: "utf8",
	});

	return stdout
		.split(/\r?\n/)
		.map((filePath) => filePath.trim())
		.filter(Boolean)
		.filter((filePath) => !filePath.startsWith("dist/"))
		.filter((filePath) => !filePath.startsWith("node_modules/"))
		.filter((filePath) => !filePath.startsWith("cc-docs/"))
		.map((filePath) => path.resolve(repoRoot, filePath))
		.filter((filePath) => supportedExtensions.has(path.extname(filePath)));
}

function getScriptKind(filePath) {
	return path.extname(filePath) === ".tsx"
		? ts.ScriptKind.TSX
		: ts.ScriptKind.TS;
}

function visitNode(node, sourceFile, designSystem, replacements) {
	if (ts.isJsxAttribute(node)) {
		handleJsxAttribute(node, sourceFile, designSystem, replacements);
	}

	if (ts.isCallExpression(node)) {
		handleCallExpression(node, sourceFile, designSystem, replacements);
	}

	ts.forEachChild(node, (child) =>
		visitNode(child, sourceFile, designSystem, replacements),
	);
}

function handleJsxAttribute(node, sourceFile, designSystem, replacements) {
	if (!classAttributes.has(node.name.text) || node.initializer === undefined) {
		return;
	}

	if (ts.isStringLiteral(node.initializer)) {
		maybeAddReplacement(
			node.initializer,
			sourceFile,
			designSystem,
			replacements,
		);
		return;
	}

	if (
		!ts.isJsxExpression(node.initializer) ||
		node.initializer.expression === undefined
	) {
		return;
	}

	const expression = node.initializer.expression;

	if (ts.isStringLiteral(expression)) {
		maybeAddReplacement(expression, sourceFile, designSystem, replacements);
	}
}

function handleCallExpression(node, sourceFile, designSystem, replacements) {
	const calleeName = getCalleeName(node.expression);

	if (calleeName === null || !calleeFunctions.has(calleeName)) {
		return;
	}

	for (const argument of node.arguments) {
		if (ts.isStringLiteral(argument)) {
			maybeAddReplacement(argument, sourceFile, designSystem, replacements);
		}
	}
}

function getCalleeName(expression) {
	if (ts.isIdentifier(expression)) {
		return expression.text;
	}

	if (ts.isPropertyAccessExpression(expression)) {
		return expression.name.text;
	}

	return null;
}

function maybeAddReplacement(node, sourceFile, designSystem, replacements) {
	const originalValue = node.text;
	const canonicalValue = canonicalizeClassList(originalValue, designSystem);

	if (canonicalValue === null || canonicalValue === originalValue) {
		return;
	}

	replacements.push({
		start: node.getStart(sourceFile),
		end: node.getEnd(),
		text: JSON.stringify(canonicalValue),
	});
}

function canonicalizeClassList(classList, designSystem) {
	const tokenMatches = Array.from(classList.matchAll(/\S+/g));

	if (tokenMatches.length === 0) {
		return null;
	}

	const originalCandidates = tokenMatches.map((match) => match[0]);
	const canonicalCandidates =
		designSystem.canonicalizeCandidates(originalCandidates);

	if (canonicalCandidates.length !== originalCandidates.length) {
		return canonicalCandidates.join(" ");
	}

	let changed = false;
	let result = "";
	let previousIndex = 0;

	for (let index = 0; index < tokenMatches.length; index += 1) {
		const match = tokenMatches[index];
		const canonicalCandidate = canonicalCandidates[index];
		const matchIndex = match.index ?? 0;

		result += classList.slice(previousIndex, matchIndex);
		result += canonicalCandidate;
		previousIndex = matchIndex + match[0].length;

		if (canonicalCandidate !== match[0]) {
			changed = true;
		}
	}

	result += classList.slice(previousIndex);

	return changed ? result : null;
}

function applyReplacements(sourceText, replacements) {
	const sortedReplacements = [...replacements].sort(
		(left, right) => right.start - left.start,
	);
	let nextSourceText = sourceText;

	for (const replacement of sortedReplacements) {
		nextSourceText =
			nextSourceText.slice(0, replacement.start) +
			replacement.text +
			nextSourceText.slice(replacement.end);
	}

	return nextSourceText;
}

await main();
