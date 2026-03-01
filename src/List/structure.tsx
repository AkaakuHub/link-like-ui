import type { HTMLAttributes } from "react";
import { cn } from "../utils";
import { ListCard, ListItems, ListRoot } from "./primitives";

export { ListCard, ListItems, ListRoot };

export function ListCardHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex items-center justify-between gap-3", className)}
			{...props}
		/>
	);
}

export function ListCardHeading({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"inline-flex min-w-16 items-center justify-center rounded-full bg-ll-pink px-3 py-0.5 text-[0.72rem] leading-none font-bold text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function ListCardMeta({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'font-["Noto_Sans_JP","Segoe_UI",sans-serif] text-[0.74rem] leading-none text-ll-gray',
				className,
			)}
			{...props}
		/>
	);
}

export function ListCardText({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				'font-["Noto_Sans_JP","Segoe_UI",sans-serif] text-[0.9rem] leading-[1.4] text-ll-gray',
				className,
			)}
			{...props}
		/>
	);
}
