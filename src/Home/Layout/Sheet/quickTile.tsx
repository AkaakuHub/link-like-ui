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
				"aspect-square min-h-0 w-[calc(100%-0.35rem)] justify-self-center self-center p-1.25 text-center",
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
			<div className="flex h-full flex-col items-center justify-center gap-[0.2rem] pt-[0.1rem]">
				{illustration ? (
					<div className="grid h-8 w-8 place-items-center text-ll-label">
						{illustration}
					</div>
				) : null}
				<p className="w-full truncate text-center bg-linear-to-r from-ll-system-left to-ll-system-right bg-clip-text text-[0.8em] leading-none font-medium text-transparent">
					{label}
				</p>
			</div>
		</LayoutTile>
	);
}
