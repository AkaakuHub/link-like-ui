import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
	ImgHTMLAttributes,
} from "react";
import SimpleBar from "simplebar-react";
import { cn } from "../../../../utils";
import {
	LayoutButtonBase,
	LayoutGridBase,
	LayoutPanelBase,
} from "../primitives";

export type LayoutTileColumnSpan = 1 | 2 | 4;
export type LayoutTileRowSpan = 1 | 2;
export type LayoutTileDisabledState =
	| "none"
	| "not-available"
	| "not-implemented";
type LayoutGridColumns = 2 | 4;

const layoutTileColumnClassMap: Record<LayoutTileColumnSpan, string> = {
	1: "col-span-1",
	2: "col-span-2",
	4: "col-span-4",
};

const layoutTileRowClassMap: Record<LayoutTileRowSpan, string> = {
	1: "row-span-1 min-h-[4.35rem]",
	2: "row-span-2 min-h-[9rem]",
};

const layoutGridColumnClassMap: Record<LayoutGridColumns, string> = {
	2: "grid-cols-2",
	4: "grid-cols-4",
};

export function LayoutSheet({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof LayoutPanelBase>) {
	return (
		<LayoutPanelBase
			className={cn(
				"ll-glass-surface ll-shadow-float absolute bottom-[calc(var(--ll-home-dock-height)+var(--ll-home-sheet-gap))] left-1/2 z-20 max-h-[calc(100dvh-var(--ll-home-sheet-top-safe)-var(--ll-home-dock-height)-var(--ll-home-sheet-gap))] w-[calc(100%-4rem)] max-w-100 overflow-hidden rounded-[1.45rem] transition-[opacity,transform] duration-200 ease-out",
				className,
			)}
			{...props}
		>
			<SimpleBar
				autoHide={false}
				className="ll-system-modal-scrollbar max-h-[calc(100dvh-var(--ll-home-sheet-top-safe)-var(--ll-home-dock-height)-var(--ll-home-sheet-gap))]"
			>
				<div className="p-4">{children}</div>
			</SimpleBar>
		</LayoutPanelBase>
	);
}

export function LayoutSheetStack({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("space-y-6", className)} {...props} />;
}

export function LayoutHeroCard({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-[1.15rem] border border-ll-white/48 bg-linear-to-r from-ll-orange/58 via-ll-pink/58 to-ll-system-right/68 p-3 text-ll-white shadow-[0_8px_18px_color-mix(in_srgb,var(--color-ll-gray)_18%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutBannerCard({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-2xl border border-ll-white/50 bg-linear-to-r from-ll-system-left/66 via-ll-white/24 to-ll-system-right/60 px-3 py-2.5 text-ll-white shadow-[0_7px_16px_color-mix(in_srgb,var(--color-ll-gray)_16%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutImageBanner({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<LayoutButtonBase
			className={cn(
				"ll-interactive-filter relative block aspect-4/1 w-full cursor-pointer overflow-visible rounded-2xl bg-ll-white/24 shadow-[0_0_8px_6px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)] focus-visible:outline-3 focus-visible:outline-ll-label",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutImageBannerMedia({
	alt,
	className,
	...props
}: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
	return (
		<img
			alt={alt}
			className={cn(
				"block h-full w-full rounded-[inherit] object-cover",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutGrid({
	className,
	columns = 4,
	...props
}: HTMLAttributes<HTMLDivElement> & { columns?: LayoutGridColumns }) {
	return (
		<LayoutGridBase
			className={cn(
				"grid gap-(--ll-home-tile-gap) [--ll-home-tile-gap:clamp(0.54rem,2.15vw,1.5rem)] [--ll-home-tile-icon-size:clamp(1.9rem,6.9vw,2.4rem)] [--ll-home-tile-label-line-height:1.18] [--ll-home-tile-stack-gap:clamp(0.01rem,0.2vw,0.08rem)] max-[360px]:[--ll-home-tile-gap:0.42rem] max-[360px]:[--ll-home-tile-icon-size:1.66rem] max-[360px]:[--ll-home-tile-stack-gap:0rem]",
				layoutGridColumnClassMap[columns],
				className,
			)}
			{...props}
		/>
	);
}

export interface LayoutTileProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	colSpan?: LayoutTileColumnSpan;
	disabledState?: LayoutTileDisabledState;
	rowSpan?: LayoutTileRowSpan;
}

export function LayoutTile({
	className,
	colSpan = 1,
	disabledState = "none",
	rowSpan = 1,
	...props
}: LayoutTileProps) {
	return (
		<LayoutButtonBase
			className={cn(
				"ll-interactive-filter relative overflow-visible rounded-[0.92rem] border text-left focus-visible:outline-3 focus-visible:outline-ll-label",
				disabledState === "none"
					? "border-ll-white/62 bg-ll-white/92 shadow-[0_6px_14px_color-mix(in_srgb,var(--color-ll-gray)_13%,transparent)]"
					: "border-transparent bg-transparent shadow-none",
				layoutTileColumnClassMap[colSpan],
				layoutTileRowClassMap[rowSpan],
				className,
			)}
			disabled={disabledState !== "none"}
			{...props}
		/>
	);
}
