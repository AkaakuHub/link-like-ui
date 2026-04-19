import type { ReactNode } from "react";
import { cn } from "../../../utils";
import { LayoutTile, LayoutTileBadge, type LayoutTileProps } from "./structure";

export interface LayoutQuickTileProps
	extends Omit<LayoutTileProps, "children"> {
	badge?: string;
	illustration?: ReactNode;
	label: string;
}

export function LayoutQuickTile({
	badge,
	className,
	illustration,
	label,
	...props
}: LayoutQuickTileProps) {
	return (
		<LayoutTile
			className={cn(
				"aspect-square min-h-0 w-[calc(100%-0.08rem)] justify-self-center self-center px-[0.3rem] pt-[0.28rem] pb-[0.16rem] text-center",
				className,
			)}
			{...props}
		>
			{badge ? (
				<LayoutTileBadge
					className="absolute -top-1 -right-1 z-10"
					variant="circle"
				>
					{badge}
				</LayoutTileBadge>
			) : null}
			<div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-(--ll-home-tile-stack-gap) pt-[0.02rem]">
				{illustration ? (
					<div className="grid min-h-0 place-items-center text-ll-label">
						<div className="grid h-(--ll-home-tile-icon-size) w-(--ll-home-tile-icon-size) place-items-center">
							{illustration}
						</div>
					</div>
				) : null}
				<div className="mt-[0.08rem] w-full min-w-0 overflow-x-hidden overflow-y-visible px-[0.01rem] pb-[0.02rem]">
					<p className="block overflow-visible text-center whitespace-nowrap bg-linear-to-r from-ll-system-left to-ll-system-right bg-clip-text text-[0.86rem] leading-[1.18] font-medium text-transparent text-ellipsis max-[420px]:text-[0.78rem] max-[380px]:text-[0.7rem] max-[360px]:text-[0.63rem]">
						<span className="inline-block max-w-full overflow-hidden align-top text-ellipsis whitespace-nowrap pb-[0.08rem]">
							{label}
						</span>
					</p>
				</div>
			</div>
		</LayoutTile>
	);
}
