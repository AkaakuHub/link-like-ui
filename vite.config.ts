import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	root: "./playground",
	plugins: [react(), svgr({ include: "**/*.svg" }), tailwindcss()],
});
