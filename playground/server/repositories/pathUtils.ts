import { normalize, resolve, sep } from "node:path";

export function isInsideRoot(rootDir: string, targetPath: string) {
	const normalizedRoot = normalize(rootDir);
	const normalizedTarget = normalize(targetPath);
	const relativePath = normalizedTarget.replace(normalizedRoot, "");

	return relativePath.length === 0 || relativePath.startsWith(sep);
}

export function resolveInsideRoot(rootDir: string, relativePath: string) {
	const targetPath = resolve(rootDir, relativePath);

	if (!isInsideRoot(rootDir, targetPath)) {
		throw new Error("Path escapes rootDir.");
	}

	return targetPath;
}

export function toServedFilePath(relativePath: string) {
	return `/__real-data/file/${relativePath
		.split(/[\\/]/)
		.map((segment) => encodeURIComponent(segment))
		.join("/")}`;
}
