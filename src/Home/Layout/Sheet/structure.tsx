import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
	ImgHTMLAttributes,
} from "react";
import { cn } from "../../../utils";
import {
	LayoutButtonBase,
	LayoutGridBase,
	LayoutPanelBase,
} from "../primitives";

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

export function LayoutSheet({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LayoutPanelBase>) {
	return (
		<LayoutPanelBase
			className={cn(
				"absolute bottom-[calc(var(--ll-home-dock-height)+var(--ll-home-sheet-gap))] left-1/2 z-20 max-h-[calc(100dvh-var(--ll-home-sheet-top-safe)-var(--ll-home-dock-height)-var(--ll-home-sheet-gap))] w-[calc(100%-4rem)] max-w-100 overflow-y-auto rounded-[1.45rem] bg-ll-white/18 p-4 shadow-[0_0_12px_3px_color-mix(in_srgb,var(--color-ll-gray)_12%,transparent)] backdrop-blur-3xl transition-[opacity,transform] duration-200 ease-out",
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
				"overflow-hidden rounded-[1rem] border border-ll-white/50 bg-linear-to-r from-ll-system-left/66 via-ll-white/24 to-ll-system-right/60 px-3 py-2.5 text-ll-white shadow-[0_7px_16px_color-mix(in_srgb,var(--color-ll-gray)_16%,transparent)]",
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
				"relative block aspect-[4/1] w-full overflow-visible rounded-[1rem] bg-ll-white/24 shadow-[0_0_8px_6px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)] focus-visible:outline-3 focus-visible:outline-ll-label",
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
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<LayoutGridBase
			className={cn("grid grid-cols-4 gap-6", className)}
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
				"relative cursor-pointer overflow-visible rounded-[0.92rem] border border-ll-white/62 bg-ll-white/92 p-2 text-left shadow-[0_6px_14px_color-mix(in_srgb,var(--color-ll-gray)_13%,transparent)] transition-transform duration-150 ease-out focus-visible:outline-3 focus-visible:outline-ll-label",
				layoutTileColumnClassMap[colSpan],
				layoutTileRowClassMap[rowSpan],
				className,
			)}
			{...props}
		/>
	);
}

export function LayoutTileBadge({
	children,
	className,
	variant = "pill",
	...props
}: HTMLAttributes<HTMLSpanElement> & {
	variant?: "pill" | "circle";
}) {
	const sizeClassName =
		variant === "circle" ? "h-[1.5rem] w-[1.5rem] p-0" : "px-1.5 py-1";

	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-ll-badge-orange to-ll-badge-red text-center leading-[1] font-semibold tabular-nums text-ll-white",
				sizeClassName,
				className,
			)}
			{...props}
		>
			<span>{children}</span>
		</span>
	);
}
