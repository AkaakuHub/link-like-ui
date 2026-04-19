import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { cn } from "../../../utils";
import { Button } from "../../System/Button";
import { ScreenCardListBase, ScreenCardListItemBase } from "./primitives";

export function ScreenCardList({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<ScreenCardListBase
			className={cn("overflow-y-auto px-3 pt-3 pb-4", className)}
			{...props}
		/>
	);
}

export function ScreenCardListItems({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("grid gap-3", className)} {...props} />;
}

export function ScreenCardListItem({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<ScreenCardListItemBase
			className={cn(
				"grid grid-cols-[3.55rem_minmax(0,1fr)_4.3rem] items-start gap-x-2.5 rounded-[0.82rem] border border-ll-disabled/10 bg-ll-white px-2.5 py-2 shadow-[0_0_8px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListThumb({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"relative grid h-full content-center justify-items-center text-center",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListThumbFrame({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"grid h-12 w-[2.45rem] place-items-center text-ll-label",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListThumbCount({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"ll-font-ja absolute top-[calc(50%+0.95rem)] left-[calc(50%+0.45rem)] text-[0.8rem] leading-none font-semibold text-ll-gray/72",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("min-w-0 pt-0.5", className)} {...props} />;
}

export function ScreenCardListTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn(
				"ll-font-ja truncate text-[1rem] leading-none font-semibold text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"ll-font-ja mt-1.5 min-h-[2.65rem] text-[0.78rem] leading-[1.35] text-ll-gray/84",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListDivider({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mt-1.5 mb-1 h-px w-full bg-ll-disabled/24", className)}
			{...props}
		/>
	);
}

export function ScreenCardListMetaRow({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex items-center gap-1.5 text-[0.66rem] leading-none",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListMetaLabel({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"ll-font-ja rounded-full bg-ll-modal-tab-gray px-1.5 py-[0.18rem] font-medium text-ll-gray/76",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListMetaText({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("ll-font-ja font-medium text-ll-gray/74", className)}
			{...props}
		/>
	);
}

export function ScreenCardListStatus({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"ll-font-ja rounded-full bg-ll-pink px-1.5 py-[0.18rem] font-semibold text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function ScreenCardListAction({
	children,
	className,
	...props
}: ComponentPropsWithoutRef<typeof Button>) {
	return (
		<Button
			className={cn(
				"mt-[0.1rem] h-[2.55rem] w-full self-center rounded-[0.72rem] px-0 text-[1rem] shadow-[0_0_8px_color-mix(in_srgb,var(--color-ll-system-right)_20%,transparent)]",
				className,
			)}
			size="sm"
			variant="primary"
			{...props}
		>
			{children}
		</Button>
	);
}
