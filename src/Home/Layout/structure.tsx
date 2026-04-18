import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";
import { cn } from "../../utils";
import {
	LayoutButtonBase,
	LayoutLayerBase,
	LayoutRootBase,
} from "./primitives";

export function LayoutRoot({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LayoutRootBase>) {
	return (
		<LayoutRootBase
			className={cn(
				"relative isolate h-dvh w-full overflow-hidden [--ll-home-dock-height:4rem] [--ll-home-sheet-gap:1.5rem] [--ll-home-sheet-top-safe:2rem] bg-linear-to-b from-ll-white via-ll-system-left/14 to-ll-orange/18",
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
