import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";

export function ListRoot({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"rounded-[0.65rem] bg-ll-modal-content-gray p-3",
				className,
			)}
			{...props}
		/>
	);
}

export function ListItems({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return <div className={cn("space-y-2.5", className)} {...props} />;
}

export function ListCard({
	className,
	...props
}: ComponentPropsWithoutRef<"article">) {
	return (
		<article
			className={cn(
				"rounded-[0.6rem] bg-ll-white p-3 shadow-[0_0_6px_color-mix(in_srgb,var(--color-ll-gray)_20%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}
