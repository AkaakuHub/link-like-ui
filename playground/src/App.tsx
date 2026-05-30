import { ComponentsPreview } from "./app/ComponentsPreview";
import { HomePreview } from "./app/HomePreview";
import { RealMediaPreview } from "./app/RealMediaPreview";
import { RealWithMeetsPreview } from "./app/RealWithMeetsPreview";
import { WithMeetsPreview } from "./app/WithMeetsPreview";

export function App() {
	const pathname = globalThis.location.pathname;
	const isRealDataMode = import.meta.env["VITE_LINK_LIKE_UI_REAL_DATA"] === "1";

	if (pathname === "/with-meets") {
		return <WithMeetsPreview />;
	}

	if (pathname === "/real-media") {
		return <RealMediaPreview />;
	}

	if (pathname === "/real-with-meets") {
		return <RealWithMeetsPreview />;
	}

	if (isRealDataMode && pathname === "/media") {
		return <RealMediaPreview />;
	}

	if (pathname !== "/components") {
		return <HomePreview />;
	}

	return <ComponentsPreview />;
}
