import type { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { PresentPageLayerBase, PresentPageRootBase } from "./primitives";

const presentPageMessageClassName = tv({
	base: "ll-font-ja text-center text-[1rem] leading-[1.7] font-medium text-ll-gray/78",
});

export function PresentPageRoot({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<PresentPageRootBase
			className={cn(
				"absolute inset-x-0 top-[3.05rem] bottom-0 z-0 overflow-hidden bg-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function PresentPageBand({
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"ll-bg-system-gradient relative flex h-[2.35rem] items-center justify-start px-[0.72rem]",
				className,
			)}
			{...props}
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(0_0,50%_0,25%_50%)] bg-linear-to-r from-ll-prism-1 to-ll-prism-2" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(0_100%,50%_100%,25%_50%)] bg-linear-to-r from-ll-prism-1 to-ll-prism-2" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(50%_0,100%_0,75%_50%)] bg-linear-to-r from-ll-prism-2 to-ll-prism-3" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(50%_100%,100%_100%,75%_50%)] bg-linear-to-r from-ll-prism-2 to-ll-prism-3" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(50%_0,75%_50%,50%_100%,25%_50%)] bg-linear-to-r from-ll-prism-4 to-ll-prism-5" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(100%_0,100%_100%,75%_50%)] bg-linear-to-r from-ll-prism-5 to-ll-prism-6" />
			</div>
			<div className="ll-font-ja relative z-1 text-[1rem] leading-none tracking-[0.01em] text-ll-white">
				{children}
			</div>
		</div>
	);
}

export function PresentPageBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<PresentPageLayerBase
			className={cn(
				"grid h-[calc(100%-2.35rem)] grid-rows-[1fr_auto] bg-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function PresentPageEmptyState({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn(presentPageMessageClassName(), className)} {...props} />
	);
}

export function PresentPageFooter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-3 border-t border-ll-disabled/16 bg-ll-white px-3 pt-3 pb-[calc(var(--ll-home-dock-height)+1rem)] shadow-[0_-8px_14px_-10px_color-mix(in_srgb,var(--color-ll-gray)_36%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function PresentPageNote({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"ll-font-ja text-[0.72rem] leading-[1.45] text-ll-gray/72",
				className,
			)}
			{...props}
		/>
	);
}

export function PresentPageActionRow({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("grid grid-cols-[7.55rem_9.25rem] gap-2", className)}
			{...props}
		/>
	);
}
