import type { ButtonHTMLAttributes } from "react";
import {
	homeMenuEnterAnimationClass,
	homeMenuExitAnimationClass,
} from "../animation";
import { LayoutTileBadge } from "../Badge";
import type { LayoutTileIllustrationDefinition } from "../content";
import { LayoutQuickTile } from "./quickTile";
import {
	LayoutGrid,
	LayoutImageBanner,
	LayoutImageBannerMedia,
	LayoutSheet,
	LayoutSheetStack,
	type LayoutTileColumnSpan,
	type LayoutTileRowSpan,
} from "./structure";

export interface LayoutBannerDefinition {
	alt: string;
	badge?: string;
	id: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	src: string;
}

export interface LayoutTileDefinition {
	badge?: string;
	colSpan: LayoutTileColumnSpan;
	id: string;
	illustration?: LayoutTileIllustrationDefinition;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	pageId?: string;
	rowSpan: LayoutTileRowSpan;
	submenu?: LayoutTileSubmenuDefinition;
}

interface LayoutTileSubmenuItemDefinition {
	icon: import("../../../System/Icon").GradientIconDefinition;
	id: string;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

interface LayoutTileSubmenuDefinition {
	items: readonly LayoutTileSubmenuItemDefinition[];
	title: string;
}

interface HomeLayoutSheetProps {
	isMenuOpen: boolean;
	isMenuVisible: boolean;
	menuTiles: LayoutTileDefinition[];
	onGoToPage: (pageId: string) => void;
	onOpenSubmenu: (tileId: string) => void;
	topBanners: LayoutBannerDefinition[];
}

export function HomeLayoutSheet({
	isMenuOpen,
	isMenuVisible,
	menuTiles,
	onGoToPage,
	onOpenSubmenu,
	topBanners,
}: HomeLayoutSheetProps) {
	if (!isMenuVisible) {
		return null;
	}

	return (
		<LayoutSheet
			role="dialog"
			aria-modal="true"
			aria-hidden={!isMenuOpen}
			className={
				isMenuOpen
					? homeMenuEnterAnimationClass
					: `pointer-events-none ${homeMenuExitAnimationClass}`
			}
		>
			<LayoutSheetStack>
				{topBanners.map((banner) => (
					<LayoutImageBanner
						key={banner.id}
						aria-label={banner.alt}
						{...(banner.onClick ? { onClick: banner.onClick } : {})}
					>
						<LayoutImageBannerMedia alt={banner.alt} src={banner.src} />
						{banner.badge ? (
							<div className="pointer-events-none absolute -top-3 right-0 z-10">
								<LayoutTileBadge>{banner.badge}</LayoutTileBadge>
							</div>
						) : null}
					</LayoutImageBanner>
				))}
				<LayoutGrid>
					{menuTiles.map((tile) => (
						<LayoutQuickTile
							key={tile.id}
							colSpan={tile.colSpan}
							hideLabel={tile.illustration?.kind === "cluster"}
							label={tile.label}
							rowSpan={tile.rowSpan}
							{...(tile.badge ? { badge: tile.badge } : {})}
							{...(tile.illustration?.kind === "cluster"
								? {
										className:
											"ll-glass-surface border-ll-white/48 p-[0.16rem] shadow-[0_0_12px_3px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)]",
										clusterClassName:
											"aspect-square h-full w-full place-self-center gap-[5%] p-[6%]",
										clusterIconClassName: "h-[76%] w-[76%]",
										clusterItemClassName:
											"ll-shadow-icon-tile rounded-[22%] bg-ll-white/92",
										contentClassName: "h-full w-full justify-center gap-0 pt-0",
										illustrationFrameClassName:
											"aspect-square h-full w-full max-h-full max-w-full place-self-center",
									}
								: {})}
							{...(tile.illustration
								? { illustration: tile.illustration }
								: {})}
							onClick={(event) => {
								if (tile.submenu) {
									onOpenSubmenu(tile.id);
									return;
								}

								if (tile.pageId) {
									onGoToPage(tile.pageId);
									return;
								}

								tile.onClick?.(event);
							}}
						/>
					))}
				</LayoutGrid>
			</LayoutSheetStack>
		</LayoutSheet>
	);
}
