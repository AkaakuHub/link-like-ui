import type { HTMLAttributes } from "react";
import { cn } from "../utils";

export function SystemModalHeading({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"mt-4 inline-flex h-7 min-w-50 items-center justify-center rounded-full bg-linear-to-r from-ll-system-left to-ll-system-right px-5 text-[1rem] font-bold text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function SystemModalHeadingContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("p-4", className)} {...props} />;
}

export function SystemModalHeadingGrid({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("grid grid-cols-2 gap-3", className)} {...props} />;
}

export function SystemModalMessage({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"rounded-[10px] bg-ll-modal-content-gray p-4 text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function SystemModalWarning({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"mt-3 text-center text-[0.78rem] leading-[1.5] font-semibold text-ll-pink",
				className,
			)}
			{...props}
		/>
	);
}

export function SystemModalSection({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return <section className={cn("mt-5", className)} {...props} />;
}

export function SystemModalSectionTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn(
				"border-b border-[color-mix(in_srgb,var(--color-ll-label)_35%,transparent)] pb-1 text-[0.98rem] font-bold text-ll-label",
				className,
			)}
			{...props}
		/>
	);
}

export function SystemModalSectionBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"mt-3 text-[0.9rem] leading-[1.8] text-ll-gray [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-2 [&_li+li]:mt-1",
				className,
			)}
			{...props}
		/>
	);
}
