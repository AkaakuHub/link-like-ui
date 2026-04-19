import type { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../../utils";
import { ScreenPageLayerBase, ScreenPageRootBase } from "./primitives";

const screenPageMessageClassName = tv({
	base: "ll-font-ja text-center text-[1rem] leading-[1.7] font-medium text-ll-gray/78",
});

export function ScreenPageRoot({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<ScreenPageRootBase
			className={cn(
				"absolute inset-x-0 top-[3.05rem] bottom-0 z-0 overflow-hidden bg-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenPageBody({
	bandHeight = "2.35rem",
	className,
	style,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	bandHeight?: string;
}) {
	return (
		<ScreenPageLayerBase
			className={cn("grid bg-ll-white", className)}
			style={{ height: `calc(100% - ${bandHeight})`, ...style }}
			{...props}
		/>
	);
}

export function ScreenPageContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<ScreenPageLayerBase
			className={cn("grid h-full grid-rows-[1fr_auto] bg-ll-white", className)}
			{...props}
		/>
	);
}

export function ScreenPageEmptyState({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn(screenPageMessageClassName(), className)} {...props} />
	);
}

export function ScreenPageCenter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<ScreenPageLayerBase
			className={cn("grid place-items-center px-6", className)}
			{...props}
		/>
	);
}
