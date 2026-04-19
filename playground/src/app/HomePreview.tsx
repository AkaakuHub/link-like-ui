import { HomeScreen } from "../../../src/Components/Patterns/AppShell";
import { TapEffect } from "../../../src/Components/System/TapEffect";
import { homeMenuItems, homeTopBanners } from "./homeData";
import { countNoticeItems } from "./noticeData";
import { presentPageDefinition } from "./presentData";

export function HomePreview() {
	return (
		<TapEffect>
			<main className="h-dvh overflow-hidden bg-ll-white">
				<HomeScreen
					banners={homeTopBanners}
					defaultMenuOpen
					menuItems={homeMenuItems}
					menuNotificationCount={countNoticeItems()}
					pageDefinitions={[presentPageDefinition]}
				/>
			</main>
		</TapEffect>
	);
}
