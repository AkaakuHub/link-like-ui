import { ComponentsPreview } from "./app/ComponentsPreview";
import { HomePreview } from "./app/HomePreview";
import { WithMeetsPreview } from "./app/WithMeetsPreview";

export function App() {
	const pathname = globalThis.location.pathname;

	if (pathname === "/with-meets") {
		return <WithMeetsPreview />;
	}

	if (pathname !== "/components") {
		return <HomePreview />;
	}

	return <ComponentsPreview />;
}
