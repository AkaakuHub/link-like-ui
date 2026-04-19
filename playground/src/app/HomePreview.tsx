import { useEffect, useState } from "react";
import { HomeScreen } from "../../../src/Components/Patterns/AppShell";
import { TapEffect } from "../../../src/Components/System/TapEffect";
import { homeMenuItems, homeTopBanners } from "./homeData";
import { countNoticeItems } from "./noticeData";
import { presentPageDefinition } from "./presentData";
import { SoundModal } from "./SoundModal";

type AppRoute = "home" | "present";
type AppHistoryState = {
	depth: number;
	pageId: AppRoute;
	routeManaged: true;
};

function resolveRouteFromPathname(pathname: string): AppRoute {
	return pathname === "/present" ? "present" : "home";
}

export function HomePreview() {
	const [isSoundModalOpen, setIsSoundModalOpen] = useState<boolean>(false);
	const [currentPageId, setCurrentPageId] = useState<AppRoute>(() =>
		resolveRouteFromPathname(globalThis.location.pathname),
	);
	const [historyDepth, setHistoryDepth] = useState<number>(0);

	useEffect(() => {
		const pageId = resolveRouteFromPathname(globalThis.location.pathname);
		const currentState = globalThis.history.state as AppHistoryState | null;

		if (currentState?.routeManaged === true) {
			setHistoryDepth(currentState.depth);
			return;
		}

		const nextState: AppHistoryState = {
			depth: 0,
			pageId,
			routeManaged: true,
		};
		globalThis.history.replaceState(nextState, "", globalThis.location.pathname);
		setHistoryDepth(0);
	}, []);

	useEffect(() => {
		const handlePopState = () => {
			const nextState = globalThis.history.state as AppHistoryState | null;
			setCurrentPageId(resolveRouteFromPathname(globalThis.location.pathname));
			setHistoryDepth(
				nextState?.routeManaged === true ? nextState.depth : 0,
			);
		};

		globalThis.addEventListener("popstate", handlePopState);

		return () => {
			globalThis.removeEventListener("popstate", handlePopState);
		};
	}, []);

	function navigateTo(pageId: AppRoute) {
		const pathname = pageId === "home" ? "/" : "/present";

		if (globalThis.location.pathname === pathname) {
			setCurrentPageId(pageId);
			return;
		}

		const nextDepth = historyDepth + 1;
		const nextState: AppHistoryState = {
			depth: nextDepth,
			pageId,
			routeManaged: true,
		};

		globalThis.history.pushState(nextState, "", pathname);
		setCurrentPageId(pageId);
		setHistoryDepth(nextDepth);
	}

	return (
		<TapEffect>
			<main className="h-dvh overflow-hidden bg-ll-white">
				<HomeScreen
					backAction={{
						ariaLabel: "Back",
						label: "Back",
						onClick: () => {
							if (historyDepth === 0) {
								return;
							}

							globalThis.history.back();
						},
					}}
					banners={homeTopBanners}
					canGoBackToPage={historyDepth > 0}
					currentPageId={currentPageId}
					homeAction={{
						ariaLabel: "Home",
						label: "Home",
						onClick: () => {
							navigateTo("home");
						},
					}}
					menuItems={homeMenuItems({
						onSoundOpen: () => {
							setIsSoundModalOpen(true);
						},
					})}
					menuNotificationCount={countNoticeItems()}
					onNavigate={(pageId) => {
						if (pageId === "present") {
							navigateTo("present");
						}
					}}
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
