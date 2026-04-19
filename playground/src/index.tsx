import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./playground.css";

const app = document.querySelector("#app");

if (!app) {
	throw new Error('Root element "#app" not found.');
}

createRoot(app).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
