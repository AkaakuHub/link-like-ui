import {
	type ButtonHTMLAttributes,
	type CSSProperties,
	type ReactNode,
	useEffect,
	useState,
} from "react";
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
import {
	LayoutBackground,
	LayoutRoot,
	LayoutScenery,
	LayoutScrim,
} from "./structure";

export interface LayoutAction {
	ariaLabel: string;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export type LayoutVariant = "home";
export type {
	LayoutBannerDefinition,
	LayoutTileDefinition,
} from "./Sheet/content";

export interface LayoutProps {
	actions?: LayoutAction[];
	centerContent?: ReactNode;
	dateLabel?: string;
	defaultMenuOpen?: boolean;
	hasMenuNotification?: boolean;
	homeAction?: LayoutAction;
	menuTiles: LayoutTileDefinition[];
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
	icon?: ReactNode;
	id?: string;
	illustration?: ReactNode;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	rowSpan?: LayoutTileDefinition["rowSpan"];
}

export interface HomeScreenProps
	extends Omit<
		LayoutProps,
		"hasMenuNotification" | "menuTiles" | "topBanners" | "variant"
	> {
	banners: HomeScreenBannerInput[];
	menuItems: HomeScreenMenuItemInput[];
	menuNotificationCount?: number;
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
	centerContent,
	defaultMenuOpen = false,
	hasMenuNotification = false,
	homeAction = { ariaLabel: "Home", label: "Home" },
	menuTiles,
	rightContent,
	topBanners,
}: Omit<LayoutProps, "variant">) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(defaultMenuOpen);
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

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMenuOpen(false);
			}
		};

		globalThis.addEventListener("keydown", handleKeyDown);

		return () => {
			globalThis.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMenuOpen]);

	return (
		<LayoutRoot style={layoutRootStyle}>
			<LayoutBackground />
			<LayoutScenery aria-hidden="true">
				<div className="absolute inset-0 bg-linear-to-b from-ll-system-left/10 via-ll-white/6 to-ll-orange/18" />
			</LayoutScenery>
			<HomeLayoutHeader
				battery={battery}
				centerContent={centerContent}
				clock={clock}
				rightContent={rightContent}
			/>
			{isMenuVisible ? (
				<LayoutScrim
					aria-label="Close menu"
					className={
						isMenuOpen
							? homeMenuScrimInAnimationClass
							: homeMenuScrimOutAnimationClass
					}
					onClick={() => {
						setIsMenuOpen(false);
					}}
				/>
			) : null}
			<HomeLayoutSheet
				isMenuOpen={isMenuOpen}
				isMenuVisible={isMenuVisible}
				menuTiles={menuTiles}
				topBanners={topBanners}
			/>
			<HomeLayoutDock
				homeAction={homeAction}
				hasMenuNotification={hasMenuNotification}
				isMenuOpen={isMenuOpen}
				onToggleMenu={() => {
					setIsMenuOpen((currentValue) => !currentValue);
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
	...props
}: HomeScreenProps) {
	return (
		<Layout
			{...props}
			hasMenuNotification={menuNotificationCount > 0}
			menuTiles={toLayoutTileDefinitions(menuItems)}
			topBanners={toLayoutBannerDefinitions(banners)}
			variant="home"
		/>
	);
}
