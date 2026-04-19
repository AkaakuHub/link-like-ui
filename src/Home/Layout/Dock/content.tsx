import type { ButtonHTMLAttributes } from "react";
import { BackIcon, HomeIcon } from "../../../assets/icons";
import { cn } from "../../../utils";
import { LayoutTileBadge } from "../Badge";
import {
	LayoutDock,
	LayoutDockButton,
	LayoutDockDivider,
	LayoutDockGlyph,
	LayoutDockGlyphLine,
	LayoutDockSurface,
} from "./structure";

interface HomeLayoutDockProps {
	canGoBack: boolean;
	homeAction: {
		ariaLabel: string;
		label: string;
		onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	};
	hasMenuNotification: boolean;
	isMenuOpen: boolean;
	onBack: () => void;
	onToggleMenu: () => void;
}

function MenuGlyph({ isMenuOpen }: { isMenuOpen: boolean }) {
	return (
		<LayoutDockGlyph aria-hidden="true">
			<LayoutDockGlyphLine
				className={
					isMenuOpen
						? "translate-x-[-50%] translate-y-[-50%] rotate-45"
						: "translate-x-[-50%] translate-y-[calc(-50%-0.38rem)] rotate-0"
				}
			/>
			<LayoutDockGlyphLine
				className={
					isMenuOpen
						? "translate-x-[-50%] translate-y-[-50%] -rotate-45"
						: "translate-x-[-50%] translate-y-[calc(-50%+0.38rem)] rotate-0"
				}
			/>
		</LayoutDockGlyph>
	);
}

export function HomeLayoutDock({
	canGoBack,
	homeAction,
	hasMenuNotification,
	isMenuOpen,
	onBack,
	onToggleMenu,
}: HomeLayoutDockProps) {
	return (
		<LayoutDock>
			<LayoutDockSurface>
				<LayoutDockButton
					aria-label="Back"
					disabled={!canGoBack}
					onClick={onBack}
				>
					<BackIcon className="h-10 w-10" />
					<LayoutDockDivider />
				</LayoutDockButton>
				<LayoutDockButton
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					onClick={onToggleMenu}
				>
					{hasMenuNotification ? (
						<LayoutTileBadge
							aria-label="通知あり"
							className={cn(
								"pointer-events-none absolute top-[0.62rem] right-6 h-4.5 w-4.5 transition-opacity duration-100 ease-out",
								isMenuOpen ? "opacity-0" : "opacity-100",
							)}
							variant="circle"
						>
							{""}
						</LayoutTileBadge>
					) : null}
					<MenuGlyph isMenuOpen={isMenuOpen} />
					<LayoutDockDivider />
				</LayoutDockButton>
				<LayoutDockButton
					aria-label={homeAction.ariaLabel}
					onClick={homeAction.onClick}
				>
					<HomeIcon className="h-10 w-10" />
				</LayoutDockButton>
			</LayoutDockSurface>
		</LayoutDock>
	);
}
