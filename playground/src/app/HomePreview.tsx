import { HomeScreen } from "../../../src/Home/Layout";
import { TapEffect } from "../../../src/System/TapEffect";
import { homeMenuItems, homeTopBanners } from "./homeData";
import { countNoticeItems } from "./noticeData";

export function HomePreview() {
	return (
		<TapEffect>
			<main className="h-dvh overflow-hidden bg-ll-white">
				<HomeScreen
					banners={homeTopBanners}
					defaultMenuOpen
					menuItems={homeMenuItems}
					menuNotificationCount={countNoticeItems()}
				/>
			</main>
		</TapEffect>
	);
}
