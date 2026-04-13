import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LayoutQuickTile } from "./quickTile";
import {
	LayoutBannerCard,
	LayoutGrid,
	LayoutHeroCard,
	LayoutSheet,
	LayoutSheetStack,
	LayoutTileBadge,
	type LayoutTileColumnSpan,
	type LayoutTileRowSpan,
} from "./structure";

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
}

export function HomeLayoutSheet({
	isMenuOpen,
	isMenuVisible,
	menuTiles,
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
				<LayoutHeroCard className="relative min-h-31 rounded-[1.2rem] bg-linear-to-r from-ll-orange/65 via-ll-pink/55 to-ll-system-right/65 px-4 py-3">
					<div className="pointer-events-none absolute left-[-1.4rem] top-[0.35rem] h-[5.8rem] w-[6.6rem] rounded-full border border-ll-white/28" />
					<div className="pointer-events-none absolute left-[2.9rem] top-[-0.3rem] h-[2.6rem] w-[2.6rem] rounded-full border border-ll-white/24" />
					<div className="pointer-events-none absolute left-[4.1rem] top-[1.1rem] h-[4.8rem] w-[4.8rem] rounded-full border border-ll-white/18" />
					<div className="flex h-full flex-col justify-between">
						<div className="flex items-start justify-between gap-3">
							<p className="text-[0.54rem] leading-none font-semibold uppercase tracking-[0.16em] text-ll-white/80">
								LiveStreaming
							</p>
							<LayoutTileBadge className="bg-ll-orange px-1.5 py-0.5 text-[0.5rem]">
								New
							</LayoutTileBadge>
						</div>
						<div className="space-y-1">
							<p className="text-[1.38rem] leading-none font-bold text-ll-white">
								Home Portal
							</p>
							<p className="text-[0.8rem] leading-none text-ll-white/88">
								Activity Record
							</p>
						</div>
					</div>
				</LayoutHeroCard>
				<LayoutBannerCard className="relative min-h-12 rounded-[1rem] bg-linear-to-r from-ll-system-left/65 via-ll-white/30 to-ll-system-right/55 px-3 py-2">
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-ll-white/18 to-transparent" />
					<div className="flex h-full items-end">
						<div className="space-y-1">
							<p className="text-[0.56rem] leading-none font-semibold uppercase tracking-[0.14em] text-ll-white/78">
								Winter
							</p>
							<p className="text-[1.06rem] leading-none font-bold text-ll-white">
								Season Banner
							</p>
						</div>
					</div>
				</LayoutBannerCard>
				<LayoutBannerCard className="relative min-h-14 rounded-[1rem] bg-linear-to-r from-ll-system-left/70 via-ll-white/25 to-ll-orange/55 px-3 py-2.5">
					<div className="pointer-events-none absolute left-2 top-2 h-10 w-10 rounded-full bg-ll-white/20" />
					<div className="flex items-end justify-between gap-3">
						<div className="space-y-1">
							<p className="text-[0.56rem] leading-none font-semibold uppercase tracking-[0.14em] text-ll-white/78">
								Stage
							</p>
							<p className="text-[1.12rem] leading-none font-bold text-ll-white">
								Special Stage
							</p>
						</div>
						<LayoutTileBadge className="px-1.5 py-0.5 text-[0.5rem]">
							New
						</LayoutTileBadge>
					</div>
				</LayoutBannerCard>
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
