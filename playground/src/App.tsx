import { ComponentsPreview } from "./app/ComponentsPreview";
import { HomePreview } from "./app/HomePreview";

export function App() {
	const pathname = globalThis.location.pathname;

	if (pathname !== "/components") {
		return <HomePreview />;
	}

	return <ComponentsPreview />;
}
