import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { realDataPlugin } from "./playground/server/realDataPlugin";

export default defineConfig({
	root: "./playground",
	plugins: [
		realDataPlugin(),
		react(),
		svgr({ include: "**/*.svg" }),
		tailwindcss(),
	],
});
