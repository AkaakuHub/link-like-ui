import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";
import { cn } from "../../../utils";
import { LayoutButtonBase, LayoutPanelBase } from "../primitives";

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
				"absolute top-[4.95rem] right-[2rem] z-10 text-right text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}
