import { useState } from "react";
import { HomeScreen } from "../../../src/Components/Patterns/AppShell";
import { TapEffect } from "../../../src/Components/System/TapEffect";
import { homeMenuItems, homeTopBanners } from "./homeData";
import { countNoticeItems } from "./noticeData";
import { presentPageDefinition } from "./presentData";
import { SoundModal } from "./SoundModal";

export function HomePreview() {
	const [isSoundModalOpen, setIsSoundModalOpen] = useState<boolean>(false);

	return (
		<TapEffect>
			<main className="h-dvh overflow-hidden bg-ll-white">
				<HomeScreen
					banners={homeTopBanners}
					defaultMenuOpen
					menuItems={homeMenuItems({
						onSoundOpen: () => {
							setIsSoundModalOpen(true);
						},
					})}
					menuNotificationCount={countNoticeItems()}
					overlayContent={
						<SoundModal
							hasOverlay={false}
							onOpenChange={setIsSoundModalOpen}
							open={isSoundModalOpen}
						/>
					}
					pageDefinitions={[presentPageDefinition]}
				/>
			</main>
		</TapEffect>
	);
}
