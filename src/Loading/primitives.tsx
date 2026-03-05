import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";

export function LoadingRoot({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"pointer-events-none fixed inset-0 z-[2147483647] grid place-items-center",
				className,
			)}
			{...props}
		/>
	);
}

export function LoadingContent({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn("grid place-items-center gap-10", className)}
			{...props}
		/>
	);
}
