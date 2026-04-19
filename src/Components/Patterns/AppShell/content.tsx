import {
	type ButtonHTMLAttributes,
	type CSSProperties,
	type ReactNode,
	useEffect,
	useState,
} from "react";
import type {
	GradientIconClusterItems,
	GradientIconDefinition,
} from "../../System/Icon";
import {
	homeMenuCloseAnimationDurationCssVar,
	homeMenuCloseAnimationDurationMs,
	homeMenuOpenAnimationDurationCssVar,
	homeMenuOpenAnimationDurationMs,
	homeMenuScrimInAnimationClass,
	homeMenuScrimOutAnimationClass,
} from "./animation";
import { HomeLayoutDock } from "./Dock/content";
import { HomeLayoutHeader } from "./Header/content";
import { formatLocalClock } from "./Header/helpers";
import { useBatteryState } from "./Header/useBatteryState";
import {
	HomeLayoutSheet,
	type LayoutBannerDefinition,
	type LayoutTileDefinition,
} from "./Sheet/content";
import { LayoutQuickTile } from "./Sheet/quickTile";
import { LayoutGrid } from "./Sheet/structure";
import {
	AppShellSubmenuModal,
	AppShellSubmenuModalBody,
	AppShellSubmenuModalContent,
	AppShellSubmenuModalTitle,
} from "./SubmenuModal";
import {
	LayoutBackground,
	LayoutRoot,
	LayoutScenery,
	LayoutScrim,
} from "./structure";
import { useHomeLayoutState } from "./useHomeLayoutState";

export interface LayoutAction {
	ariaLabel: string;
	label: string;
	onClick?: () => void;
}

export type LayoutTileIllustrationDefinition =
	| {
			icon: GradientIconDefinition;
			kind: "single";
	  }
	| {
			items: GradientIconClusterItems;
			kind: "cluster";
	  };

interface LayoutTileSubmenuDefinition {
	items: readonly {
		icon: GradientIconDefinition;
		id: string;
		label: string;
		onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	}[];
	title: string;
}

export type LayoutVariant = "home";
export type {
	LayoutBannerDefinition,
	LayoutTileDefinition,
} from "./Sheet/content";

export interface LayoutPageDefinition {
	centerContent?: ReactNode;
	content: ReactNode;
	id: string;
	rightContent?: ReactNode;
	showClock?: boolean;
}

export interface LayoutProps {
	actions?: LayoutAction[];
	backAction?: LayoutAction;
	canGoBackToPage?: boolean;
	centerContent?: ReactNode;
	currentPageId?: string;
	dateLabel?: string;
	defaultMenuOpen?: boolean;
	hasMenuNotification?: boolean;
	homeAction?: LayoutAction;
	menuTiles: LayoutTileDefinition[];
	onNavigate?: (pageId: string) => void;
	overlayContent?: ReactNode;
	pageDefinitions?: LayoutPageDefinition[];
	topBanners: LayoutBannerDefinition[];
	rightContent?: ReactNode;
	statusLabel?: string;
	timeLabel?: string;
	variant?: LayoutVariant;
}

export interface HomeScreenBannerInput {
	alt: string;
	badge?: string;
	id?: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	src: string;
}

export interface HomeScreenMenuItemInput {
	badge?: string;
	colSpan?: LayoutTileDefinition["colSpan"];
	id?: string;
	illustration?: LayoutTileIllustrationDefinition;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	pageId?: string;
	rowSpan?: LayoutTileDefinition["rowSpan"];
	submenu?: LayoutTileSubmenuDefinition;
}

export interface HomeScreenProps
	extends Omit<
		LayoutProps,
		| "hasMenuNotification"
		| "menuTiles"
		| "pageDefinitions"
		| "topBanners"
		| "variant"
	> {
	banners: HomeScreenBannerInput[];
	menuItems: HomeScreenMenuItemInput[];
	menuNotificationCount?: number;
	pageDefinitions?: LayoutPageDefinition[];
}

function resolveBannerId(banner: HomeScreenBannerInput, index: number) {
	return banner.id ?? `banner-${index + 1}`;
}

function resolveMenuItemId(menuItem: HomeScreenMenuItemInput, index: number) {
	return menuItem.id ?? `tile-${index + 1}`;
}

function toLayoutBannerDefinitions(
	banners: HomeScreenBannerInput[],
): LayoutBannerDefinition[] {
	return banners.map((banner, index) => ({
		...banner,
		id: resolveBannerId(banner, index),
	}));
}

function toLayoutTileDefinitions(
	menuItems: HomeScreenMenuItemInput[],
): LayoutTileDefinition[] {
	return menuItems.map((menuItem, index) => ({
		...menuItem,
		colSpan: menuItem.colSpan ?? 1,
		id: resolveMenuItemId(menuItem, index),
		rowSpan: menuItem.rowSpan ?? 1,
	}));
}

function HomeLayout({
	backAction,
	canGoBackToPage = false,
	centerContent,
	currentPageId = "home",
	defaultMenuOpen = false,
	hasMenuNotification = false,
	homeAction = { ariaLabel: "Home", label: "Home" },
	menuTiles,
	onNavigate,
	overlayContent,
	pageDefinitions = [],
	rightContent,
	topBanners,
}: Omit<LayoutProps, "variant">) {
	const {
		activeSubmenuTileId,
		back,
		canGoBack,
		closeMenu,
		isMenuOpen,
		isSubmenuModalOpen,
		openSubmenu,
		setSubmenuModalOpen,
		toggleMenu,
	} = useHomeLayoutState(defaultMenuOpen);
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(defaultMenuOpen);
	const [clock, setClock] = useState(() => formatLocalClock(new Date()));
	const battery = useBatteryState();
	const layoutRootStyle = {
		[homeMenuOpenAnimationDurationCssVar]: `${homeMenuOpenAnimationDurationMs}ms`,
		[homeMenuCloseAnimationDurationCssVar]: `${homeMenuCloseAnimationDurationMs}ms`,
	} as CSSProperties;

	useEffect(() => {
		const timerId = globalThis.setInterval(() => {
			setClock(formatLocalClock(new Date()));
		}, 1000);

		return () => {
			globalThis.clearInterval(timerId);
		};
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuVisible(true);
			return;
		}

		const timeoutId = globalThis.setTimeout(() => {
			setIsMenuVisible(false);
		}, homeMenuCloseAnimationDurationMs);

		return () => {
			globalThis.clearTimeout(timeoutId);
		};
	}, [isMenuOpen]);

	const activeSubmenuTile =
		activeSubmenuTileId === null
			? null
			: (menuTiles.find((tile) => tile.id === activeSubmenuTileId) ?? null);
	const activePageDefinition =
		currentPageId === "home"
			? null
			: (pageDefinitions.find(
					(pageDefinition) => pageDefinition.id === currentPageId,
				) ?? null);
	const headerCenterContent =
		activePageDefinition?.centerContent ?? centerContent;
	const headerRightContent = activePageDefinition?.rightContent ?? rightContent;
	const showClock = activePageDefinition?.showClock ?? currentPageId === "home";
	const canGoBackInLayout = canGoBack || canGoBackToPage;

	return (
		<LayoutRoot style={layoutRootStyle}>
			<LayoutBackground />
			<LayoutScenery aria-hidden="true">
				<div className="absolute inset-0 bg-linear-to-b from-ll-system-left/10 via-ll-white/6 to-ll-orange/18" />
			</LayoutScenery>
			<HomeLayoutHeader
				battery={battery}
				centerContent={headerCenterContent}
				clock={clock}
				rightContent={headerRightContent}
				showClock={showClock}
			/>
			{activePageDefinition?.content ?? null}
			{isMenuVisible ? (
				<LayoutScrim
					aria-label="Close menu"
					className={
						isMenuOpen
							? homeMenuScrimInAnimationClass
							: homeMenuScrimOutAnimationClass
					}
					onClick={() => {
						closeMenu();
					}}
				/>
			) : null}
			<HomeLayoutSheet
				isMenuOpen={isMenuOpen}
				isMenuVisible={isMenuVisible}
				menuTiles={menuTiles}
				onGoToPage={(pageId) => {
					closeMenu();
					onNavigate?.(pageId);
				}}
				onOpenSubmenu={(tileId) => {
					openSubmenu(tileId);
				}}
				topBanners={topBanners}
			/>
			{activeSubmenuTile?.submenu ? (
				<AppShellSubmenuModal
					open={isSubmenuModalOpen}
					onOpenChange={(nextOpen: boolean) => {
						setSubmenuModalOpen(nextOpen);
					}}
				>
					<AppShellSubmenuModalContent
						aria-describedby={undefined}
						className="ll-glass-surface [--ll-home-tile-gap:clamp(0.54rem,2.15vw,1.5rem)] [--ll-submenu-padding:2rem] [--ll-submenu-tile-size:4.35rem] w-[calc((var(--ll-submenu-tile-size)*2)+var(--ll-home-tile-gap)+(var(--ll-submenu-padding)*2))]"
					>
						<AppShellSubmenuModalBody>
							<AppShellSubmenuModalTitle className="sr-only">
								{activeSubmenuTile.submenu.title}
							</AppShellSubmenuModalTitle>
							<LayoutGrid
								columns={2}
								className="grid-cols-[repeat(2,var(--ll-submenu-tile-size))] w-fit p-(--ll-submenu-padding)"
							>
								{activeSubmenuTile.submenu.items.map((item) => (
									<LayoutQuickTile
										key={item.id}
										className="h-(--ll-submenu-tile-size) w-(--ll-submenu-tile-size)"
										illustration={{
											icon: item.icon,
											kind: "single",
										}}
										label={item.label}
										onClick={item.onClick}
									/>
								))}
							</LayoutGrid>
						</AppShellSubmenuModalBody>
					</AppShellSubmenuModalContent>
				</AppShellSubmenuModal>
			) : null}
			{overlayContent}
			<HomeLayoutDock
				canGoBack={canGoBackInLayout}
				homeAction={homeAction}
				hasMenuNotification={hasMenuNotification}
				isMenuOpen={isMenuOpen}
				onBack={() => {
					if (canGoBack) {
						back();
						return;
					}

					backAction?.onClick?.();
				}}
				onToggleMenu={() => {
					toggleMenu();
				}}
				onGoHome={() => {
					if (currentPageId === "home" && !canGoBack) {
						return;
					}

					homeAction.onClick?.();
				}}
			/>
		</LayoutRoot>
	);
}

export function Layout(props: LayoutProps) {
	if ((props.variant ?? "home") === "home") {
		return <HomeLayout {...props} />;
	}

	return null;
}

export function HomeScreen({
	banners,
	menuItems,
	menuNotificationCount = 0,
	pageDefinitions = [],
	...props
}: HomeScreenProps) {
	return (
		<Layout
			{...props}
			hasMenuNotification={menuNotificationCount > 0}
			menuTiles={toLayoutTileDefinitions(menuItems)}
			pageDefinitions={pageDefinitions}
			topBanners={toLayoutBannerDefinitions(banners)}
			variant="home"
		/>
	);
}
