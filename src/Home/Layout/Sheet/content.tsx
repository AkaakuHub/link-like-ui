import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LayoutQuickTile } from "./quickTile";
import {
	LayoutGrid,
	LayoutImageBanner,
	LayoutImageBannerMedia,
	LayoutSheet,
	LayoutSheetStack,
	LayoutTileBadge,
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
	icon?: ReactNode;
	id: string;
	illustration?: ReactNode;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	rowSpan: LayoutTileRowSpan;
}

interface HomeLayoutSheetProps {
	isMenuOpen: boolean;
	isMenuVisible: boolean;
	menuTiles: LayoutTileDefinition[];
	topBanners: LayoutBannerDefinition[];
}

export function HomeLayoutSheet({
	isMenuOpen,
	isMenuVisible,
	menuTiles,
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
					? "animate-[llHomeMenuEnter_220ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
					: "pointer-events-none animate-[llHomeMenuExit_220ms_cubic-bezier(0.4,0,0.2,1)_both]"
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
							label={tile.label}
							rowSpan={tile.rowSpan}
							{...(tile.badge ? { badge: tile.badge } : {})}
							{...((tile.icon ?? tile.illustration)
								? { illustration: tile.icon ?? tile.illustration }
								: {})}
							{...(tile.onClick ? { onClick: tile.onClick } : {})}
						/>
					))}
				</LayoutGrid>
			</LayoutSheetStack>
		</LayoutSheet>
	);
}
