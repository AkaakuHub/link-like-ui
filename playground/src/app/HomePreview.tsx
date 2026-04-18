import { Layout } from "../../../src/Home/Layout";
import { homeMenuTiles, homeTopBanners } from "./homeData";

export function HomePreview() {
	return (
		<main className="h-dvh overflow-hidden bg-ll-white">
			<Layout
				defaultMenuOpen
				menuTiles={homeMenuTiles}
				topBanners={homeTopBanners}
				variant="home"
			/>
		</main>
	);
}
