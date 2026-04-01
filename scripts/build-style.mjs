import { cpSync, mkdirSync } from "node:fs";

mkdirSync("dist/assets/fonts", { recursive: true });
cpSync(
	"src/assets/fonts/Poppins-Regular.ttf",
	"dist/assets/fonts/Poppins-Regular.ttf",
);
