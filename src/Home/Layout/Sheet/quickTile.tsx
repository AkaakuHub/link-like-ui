import type { ReactNode } from "react";
import { cn } from "../../../utils";
import { LayoutTile, type LayoutTileProps } from "./structure";

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
			className={cn("aspect-square min-h-0 p-1.5 text-center", className)}
			{...props}
		>
			{badge ? (
				<span className="absolute top-[0.25rem] right-[0.25rem] z-10 grid h-[0.88rem] w-[0.88rem] place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-ll-red)_58%,var(--color-ll-orange))] text-[0.48rem] leading-none font-semibold text-ll-white">
					{badge}
				</span>
			) : null}
			<div className="flex h-full flex-col items-center justify-center gap-[0.34rem] pt-[0.14rem]">
				{illustration ? (
					<div className="grid h-[1.38rem] w-[1.38rem] place-items-center text-ll-label">
						{illustration}
					</div>
				) : null}
				<p className="text-[0.54rem] leading-none font-semibold text-ll-gray">
					{label}
				</p>
			</div>
		</LayoutTile>
	);
}
