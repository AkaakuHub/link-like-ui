import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { ListCardBase, ListItemsBase, ListRootBase } from "./primitives";

const listWhiteCardClassName = "rounded-[0.6rem] bg-ll-white p-3";

const listLabelVariants = tv({
	base: "inline-flex min-w-16 items-center justify-center rounded-full px-3 py-0.5 text-[0.72rem] leading-none font-bold",
	variants: {
		tone: {
			heading: "bg-ll-pink text-ll-white",
			action: "ll-bg-system-gradient text-ll-white",
		},
	},
});

export function ListRoot({
	className,
	...props
}: ComponentPropsWithoutRef<typeof ListRootBase>) {
	return (
		<ListRootBase
			className={cn("ll-surface-muted-panel", className)}
			{...props}
		/>
	);
}

export function ListItems({
	className,
	...props
}: ComponentPropsWithoutRef<typeof ListItemsBase>) {
	return (
		<ListItemsBase className={cn("ll-stack-field", className)} {...props} />
	);
}

export function ListCard({
	className,
	...props
}: ComponentPropsWithoutRef<typeof ListCardBase>) {
	return (
		<ListCardBase
			className={cn(
				listWhiteCardClassName,
				"shadow-[0_0_6px_color-mix(in_srgb,var(--color-ll-gray)_20%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function ListCardHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("ll-split-row", className)} {...props} />;
}

export function ListCardLead({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex items-center gap-2.5", className)} {...props} />
	);
}

export function ListCardHeading({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(listLabelVariants({ tone: "heading" }), className)}
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
				"ll-font-ja text-[0.74rem] leading-none text-ll-gray",
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
				"ll-font-ja text-[0.9rem] leading-[1.4] text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function ListActionButton({
	className,
	type,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type={type ?? "button"}
			className={cn(listLabelVariants({ tone: "action" }), className)}
			{...props}
		/>
	);
}

export function ListDetailBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				listWhiteCardClassName,
				"space-y-3 text-[0.86rem] leading-normal text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function ListDetailActions({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex justify-end", className)} {...props} />;
}

export function ListDetailImage({
	alt = "",
	className,
	src,
	...props
}: Omit<ComponentPropsWithoutRef<"img">, "alt"> & { alt?: string }) {
	if (src) {
		return (
			<img
				alt={alt}
				src={src}
				className={cn("h-24 w-full rounded-lg object-cover", className)}
				{...props}
			/>
		);
	}

	return (
		<div
			className={cn(
				"grid h-24 w-full place-items-center rounded-lg bg-ll-modal-tab-gray text-[0.75rem] text-ll-gray",
				className,
			)}
		>
			Image
		</div>
	);
}
