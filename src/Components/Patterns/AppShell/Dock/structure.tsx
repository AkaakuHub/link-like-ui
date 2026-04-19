import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../../../../utils";
import { LayoutButtonBase } from "../primitives";

export function LayoutDock({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"absolute inset-x-0 bottom-0 z-30 h-(--ll-home-dock-height) px-0 pb-0",
				className,
			)}
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
				"ll-shadow-float grid grid-cols-3 overflow-hidden rounded-t-[1.15rem] border border-b-0 border-ll-white/78 bg-ll-white",
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
				"pointer-events-auto relative flex h-16 items-center justify-center text-[2.22rem] text-ll-label transition-colors hover:text-ll-system-right focus-visible:outline-3 focus-visible:outline-ll-label",
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
				"ll-bg-system-gradient absolute top-1/2 left-1/2 block h-[0.1em] w-[1.04em] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-300 ease-out",
				className,
			)}
			{...props}
		/>
	);
}
