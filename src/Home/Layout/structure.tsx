import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";
import { cn } from "../../utils";
import {
	LayoutButtonBase,
	LayoutGridBase,
	LayoutLayerBase,
	LayoutPanelBase,
	LayoutRootBase,
} from "./primitives";

export type LayoutTileColumnSpan = 1 | 2 | 4;
export type LayoutTileRowSpan = 1 | 2;

const layoutTileColumnClassMap: Record<LayoutTileColumnSpan, string> = {
	1: "col-span-1",
	2: "col-span-2",
	4: "col-span-4",
};

const layoutTileRowClassMap: Record<LayoutTileRowSpan, string> = {
	1: "row-span-1 min-h-[4.35rem]",
	2: "row-span-2 min-h-[9rem]",
};

export function LayoutRoot({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LayoutRootBase>) {
	return (
		<LayoutRootBase
			className={cn(
				"relative isolate h-dvh w-full overflow-hidden bg-linear-to-b from-ll-white via-ll-system-left/14 to-ll-orange/18",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutBackground({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LayoutLayerBase>) {
	return (
		<LayoutLayerBase
			className={cn(
				"absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-ll-system-left)_18%,var(--color-ll-white))_0%,color-mix(in_srgb,var(--color-ll-white)_92%,var(--color-ll-system-left))_12%,color-mix(in_srgb,var(--color-ll-white)_74%,var(--color-ll-system-left))_36%,color-mix(in_srgb,var(--color-ll-white)_70%,var(--color-ll-orange))_74%,color-mix(in_srgb,var(--color-ll-white)_56%,var(--color-ll-orange))_100%)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutScenery({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("absolute inset-0 overflow-hidden", className)}
			{...props}
		/>
	);
}

export function LayoutScrim({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<LayoutButtonBase
			className={cn("absolute inset-0 z-15 bg-ll-gray/14", className)}
			{...props}
		/>
	);
}

export function LayoutHeader({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<header
			className={cn(
				"pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-[3.05rem] items-start justify-between gap-1.5 border-b border-ll-disabled/12 bg-ll-white px-[0.58rem] pt-[0.38rem] pb-0",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutHeaderCluster({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex gap-2", className)} {...props} />;
}

export function LayoutGlassPanel({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LayoutPanelBase>) {
	return (
		<LayoutPanelBase
			className={cn(
				"pointer-events-auto rounded-[0.82rem] border border-ll-disabled/18 bg-ll-white px-2 py-1 shadow-[0_1px_4px_color-mix(in_srgb,var(--color-ll-gray)_6%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutHeaderBadge({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full bg-linear-to-r from-ll-system-left to-ll-system-right px-2 py-1 text-[0.6rem] leading-none font-semibold text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutHeaderMeta({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("text-[0.64rem] leading-[1.1] text-ll-gray", className)}
			{...props}
		/>
	);
}

export function LayoutHeaderPrimary({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"text-[1rem] leading-none font-semibold text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutRoundButton({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<LayoutButtonBase
			className={cn(
				"pointer-events-auto grid h-8.5 w-8.5 place-items-center rounded-full border border-ll-disabled/18 bg-ll-white text-[0.68rem] font-semibold uppercase text-ll-label shadow-[0_2px_8px_color-mix(in_srgb,var(--color-ll-gray)_8%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutHeaderCounter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"pointer-events-auto min-w-5 rounded-full border border-transparent bg-transparent px-1 py-1 text-right text-[1rem] leading-none font-medium text-ll-gray/82 shadow-none",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutClock({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"absolute top-[4.95rem] right-[0.55rem] z-10 text-right text-ll-white/78 drop-shadow-[0_1px_2px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutAuxActions({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("absolute top-[5.45rem] left-3 z-10 flex gap-2", className)}
			{...props}
		/>
	);
}

export function LayoutSheet({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LayoutPanelBase>) {
	return (
		<LayoutPanelBase
			className={cn(
				"absolute inset-x-3.5 top-[12.7rem] bottom-[3.45rem] z-20 rounded-[1.45rem] border border-ll-white/62 bg-ll-white/18 p-2.5 shadow-[0_12px_34px_color-mix(in_srgb,var(--color-ll-gray)_16%,transparent)] backdrop-blur-[18px] transition-[opacity,transform] duration-200 ease-out",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutSheetStack({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("space-y-2.5", className)} {...props} />;
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
				"overflow-hidden rounded-[1rem] border border-ll-white/50 bg-linear-to-r from-ll-system-left/66 via-ll-white/24 to-ll-system-right/60 px-3 py-2.5 text-ll-white shadow-[0_7px_16px_color-mix(in_srgb,var(--color-ll-gray)_16%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutGrid({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<LayoutGridBase
			className={cn("grid grid-cols-4 gap-2", className)}
			{...props}
		/>
	);
}

export interface LayoutTileProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	colSpan?: LayoutTileColumnSpan;
	rowSpan?: LayoutTileRowSpan;
}

export function LayoutTile({
	className,
	colSpan = 1,
	rowSpan = 1,
	...props
}: LayoutTileProps) {
	return (
		<LayoutButtonBase
			className={cn(
				"relative overflow-hidden rounded-[0.95rem] border border-ll-white/62 bg-ll-white/88 p-2.5 text-left shadow-[0_6px_14px_color-mix(in_srgb,var(--color-ll-gray)_13%,transparent)] transition-transform duration-150 ease-out hover:-translate-y-px focus-visible:outline-3 focus-visible:outline-ll-label",
				layoutTileColumnClassMap[colSpan],
				layoutTileRowClassMap[rowSpan],
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutTileAccent({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"absolute inset-x-0 top-0 h-1 bg-linear-to-r from-ll-system-left to-ll-system-right",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutTileBadge({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"inline-flex rounded-full bg-ll-red px-2 py-1 text-[0.58rem] leading-none font-semibold text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutDock({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("absolute inset-x-0 bottom-0 z-30 px-0 pb-0", className)}
			{...props}
		/>
	);
}

export function LayoutDockSurface({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"grid grid-cols-3 overflow-hidden rounded-t-[1.15rem] border border-b-0 border-ll-white/78 bg-ll-white shadow-[0_8px_18px_color-mix(in_srgb,var(--color-ll-gray)_14%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutDockButton({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<LayoutButtonBase
			className={cn(
				"pointer-events-auto relative flex h-[4rem] items-center justify-center text-[2.22rem] text-ll-label transition-colors hover:text-ll-system-right focus-visible:outline-3 focus-visible:outline-ll-label",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutDockDivider({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"pointer-events-none absolute top-1/2 right-0 h-[56%] w-px -translate-y-1/2 bg-ll-disabled/28",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutDockLabel({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("text-[0.72rem] leading-none font-medium", className)}
			{...props}
		/>
	);
}

export function LayoutDockGlyph({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"relative block h-[0.94em] w-[1.34em] text-current",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutDockGlyphLine({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"absolute top-1/2 left-1/2 block h-[0.1em] w-[1.04em] -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-ll-system-left to-ll-system-right rounded-full transition-transform duration-200 ease-out",
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutDockGlyphDot({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-ll-red",
				className,
			)}
			{...props}
		/>
	);
}
