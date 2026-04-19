import type { HTMLAttributes } from "react";
import { cn } from "../../utils";
import { ScreenBottomAreaBase } from "./primitives";

export function ScreenBottomArea({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<ScreenBottomAreaBase
			className={cn(
				"grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-3 border-t border-ll-disabled/16 bg-ll-white px-3 pt-3 pb-[calc(var(--ll-home-dock-height)+1rem)] shadow-[0_-8px_14px_-10px_color-mix(in_srgb,var(--color-ll-gray)_36%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenBottomNote({
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

export function ScreenBottomNoteLine({
	isAccent = false,
	...props
}: HTMLAttributes<HTMLSpanElement> & {
	isAccent?: boolean;
}) {
	return <span className={isAccent ? "text-ll-pink" : undefined} {...props} />;
}

export function ScreenBottomActions({
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
