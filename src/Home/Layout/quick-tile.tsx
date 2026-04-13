import type { ReactNode } from "react";
import { cn } from "../../utils";
import {
	LayoutTile,
	LayoutTileAccent,
	LayoutTileBadge,
	type LayoutTileProps,
} from "./structure";

export interface LayoutQuickTileProps
	extends Omit<LayoutTileProps, "children"> {
	badge?: string;
	caption?: string;
	illustration?: ReactNode;
	label: string;
}

export function LayoutQuickTile({
	badge,
	caption,
	className,
	illustration,
	label,
	...props
}: LayoutQuickTileProps) {
	return (
		<LayoutTile
			className={cn("flex flex-col justify-between", className)}
			{...props}
		>
			<LayoutTileAccent />
			<div className="relative flex items-start justify-end gap-2 pt-1.5">
				{badge ? <LayoutTileBadge>{badge}</LayoutTileBadge> : null}
			</div>
			<div className="relative space-y-0.5">
				<p className="text-[0.68rem] leading-[1.15] font-semibold text-ll-gray">
					{label}
				</p>
				{caption ? (
					<p className="text-[0.5rem] leading-[1.15] text-ll-gray/72">
						{caption}
					</p>
				) : null}
			</div>
		</LayoutTile>
	);
}
