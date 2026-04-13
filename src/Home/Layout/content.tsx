import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import { HomeLayoutDock } from "./Dock/content";
import { HomeLayoutHeader } from "./Header/content";
import { formatLocalClock } from "./Header/helpers";
import { useBatteryState } from "./Header/useBatteryState";
import { HomeLayoutSheet, type LayoutTileDefinition } from "./Sheet/content";
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
export type { LayoutTileDefinition } from "./Sheet/content";

export interface LayoutProps {
	actions?: LayoutAction[];
	dateLabel?: string;
	dayHeading: string;
	dayLabel: string;
	defaultMenuOpen?: boolean;
	homeAction?: LayoutAction;
	menuTiles: LayoutTileDefinition[];
	nameHeading: string;
	name: string;
	resourceCount?: number;
	statusLabel?: string;
	timeLabel?: string;
	variant?: LayoutVariant;
}

const layoutMenuAnimationDurationMs = 220;

function HomeLayout({
	dayHeading,
	dayLabel,
	defaultMenuOpen = false,
	homeAction = { ariaLabel: "Home", label: "Home" },
	menuTiles,
	nameHeading,
	name,
	resourceCount = 0,
}: Omit<LayoutProps, "variant">) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(defaultMenuOpen);
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(defaultMenuOpen);
	const [clock, setClock] = useState(() => formatLocalClock(new Date()));
	const battery = useBatteryState();

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
		}, layoutMenuAnimationDurationMs);

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
		<LayoutRoot>
			<LayoutBackground />
			<LayoutScenery aria-hidden="true">
				<div className="absolute inset-0 bg-linear-to-b from-ll-system-left/10 via-ll-white/6 to-ll-orange/18" />
			</LayoutScenery>
			<HomeLayoutHeader
				battery={battery}
				clock={clock}
				dayHeading={dayHeading}
				dayLabel={dayLabel}
				name={name}
				nameHeading={nameHeading}
				resourceCount={resourceCount}
			/>
			{isMenuVisible ? (
				<LayoutScrim
					aria-label="Close menu"
					className={
						isMenuOpen
							? "animate-[llHomeMenuScrimIn_220ms_ease-out_both]"
							: "animate-[llHomeMenuScrimOut_220ms_ease-out_both]"
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
			/>
			<HomeLayoutDock
				homeAction={homeAction}
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
