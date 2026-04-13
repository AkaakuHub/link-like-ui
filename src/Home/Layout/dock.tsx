import type { ButtonHTMLAttributes } from "react";
import { BackIcon, HomeIcon } from "../../assets/icons";
import {
	LayoutDock,
	LayoutDockButton,
	LayoutDockDivider,
	LayoutDockGlyph,
	LayoutDockGlyphLine,
	LayoutDockSurface,
} from "./structure";

interface HomeLayoutDockProps {
	homeAction: {
		ariaLabel: string;
		label: string;
		onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	};
	isMenuOpen: boolean;
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
	homeAction,
	isMenuOpen,
	onToggleMenu,
}: HomeLayoutDockProps) {
	return (
		<LayoutDock>
			<LayoutDockSurface>
				<LayoutDockButton aria-label="Back">
					<BackIcon className="h-[2.5rem] w-[2.5rem]" />
					<LayoutDockDivider />
				</LayoutDockButton>
				<LayoutDockButton
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					onClick={onToggleMenu}
				>
					<MenuGlyph isMenuOpen={isMenuOpen} />
					<LayoutDockDivider />
				</LayoutDockButton>
				<LayoutDockButton
					aria-label={homeAction.ariaLabel}
					onClick={homeAction.onClick}
				>
					<HomeIcon className="h-[2.5rem] w-[2.5rem]" />
				</LayoutDockButton>
			</LayoutDockSurface>
		</LayoutDock>
	);
}
