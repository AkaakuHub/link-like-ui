import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { cn } from "../../../utils";
import {
	MediaScreenArticleBase,
	MediaScreenButtonBase,
	MediaScreenDivBase,
	MediaScreenImageBase,
} from "./primitives";

export function MediaHeaderProfileRoot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"grid h-9 w-64 grid-cols-[2.5rem_3.25rem_1fr] overflow-hidden rounded-[0.65rem] border border-ll-disabled/18 bg-ll-white shadow-[0_1px_4px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaHeaderProfileIconSlot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"grid place-items-center bg-linear-to-br from-ll-system-left to-ll-system-right text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaHeaderProfileLevelSlot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"grid place-items-center border-r border-ll-disabled/18 text-center",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaHeaderProfileNameSlot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("grid content-center px-3", className)}
			{...props}
		/>
	);
}

export function MediaHeaderProfileLabel({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"text-[0.55rem] leading-none font-semibold text-ll-label",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaHeaderProfileLevel({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn("text-xl leading-none font-light text-ll-gray", className)}
			{...props}
		/>
	);
}

export function MediaHeaderProfileName({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"mt-1 text-base leading-none font-semibold text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaHeaderPointActionRoot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}

export function MediaHeaderPointCount({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"min-w-6 text-center text-xl leading-none font-medium text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaHeaderPointButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof MediaScreenButtonBase>) {
	return (
		<MediaScreenButtonBase
			className={cn(
				"grid h-9 w-9 place-items-center rounded-full bg-ll-white text-ll-label shadow-[0_2px_8px_color-mix(in_srgb,var(--color-ll-gray)_12%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaChannelListShortcut({
	className,
	...props
}: ComponentPropsWithoutRef<typeof MediaScreenButtonBase>) {
	return (
		<MediaScreenButtonBase
			className={cn(
				"absolute top-1 left-2 grid h-14 w-14 place-items-center rounded-full bg-ll-tab-gray text-center text-[0.5rem] leading-tight font-semibold tracking-[0.04em] text-ll-gray/78",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaSectionHeadingRoot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"mx-auto flex h-14 w-full max-w-162 items-center justify-between px-3 text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaSectionHeadingTitle({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("inline-flex items-center gap-2", className)}
			{...props}
		/>
	);
}

export function MediaSectionHeadingText({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			className={cn("text-2xl leading-none font-semibold", className)}
			{...props}
		/>
	);
}

export function MediaSectionHeadingMeta({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn("text-sm leading-none font-semibold", className)}
			{...props}
		/>
	);
}

export function MediaUpcomingArticle({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return <MediaScreenArticleBase className={cn(className)} {...props} />;
}

export function MediaUpcomingActionButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof MediaScreenButtonBase>) {
	return (
		<MediaScreenButtonBase
			className={cn("block w-full text-left", className)}
			{...props}
		/>
	);
}

export function MediaUpcomingImage({
	className,
	...props
}: ComponentPropsWithoutRef<typeof MediaScreenImageBase>) {
	return (
		<MediaScreenImageBase
			className={cn("mx-auto h-auto w-full max-w-162 object-cover", className)}
			{...props}
		/>
	);
}

export function MediaUpcomingTitle({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"mx-auto w-full max-w-162 px-3 py-4 text-base leading-none font-medium text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaArchiveRoot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("mx-auto w-full max-w-162 px-3 pt-4", className)}
			{...props}
		/>
	);
}

export function MediaArchiveHeading({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"mb-4 inline-flex items-center gap-2 text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaArchiveGrid({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("grid grid-cols-2 gap-x-4 gap-y-3", className)}
			{...props}
		/>
	);
}

export function MediaArchiveCardRoot({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<MediaScreenArticleBase
			className={cn("grid gap-1", className)}
			{...props}
		/>
	);
}

export function MediaArchiveCardButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof MediaScreenButtonBase>) {
	return (
		<MediaScreenButtonBase
			className={cn("grid w-full gap-1 text-left", className)}
			{...props}
		/>
	);
}

export function MediaArchiveThumbnail({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("relative overflow-hidden", className)}
			{...props}
		/>
	);
}

export function MediaArchiveImage({
	className,
	...props
}: ComponentPropsWithoutRef<typeof MediaScreenImageBase>) {
	return (
		<MediaScreenImageBase
			className={cn("h-auto w-full object-cover", className)}
			{...props}
		/>
	);
}

export function MediaArchiveDuration({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"absolute right-1 top-1 rounded-sm bg-ll-gray/95 px-1.5 py-0.5 text-xs leading-none text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaArchiveDate({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"mt-1 text-xs leading-none font-semibold text-ll-gray/70",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaArchiveTitle({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"text-sm leading-tight font-medium text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function MediaArchiveMeta({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn("grid gap-1 px-0.5", className)}
			{...props}
		/>
	);
}

export function MediaEmptyPanel({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<MediaScreenDivBase
			className={cn(
				"grid min-h-80 place-items-center px-6 text-center text-[1rem] leading-normal font-medium text-ll-gray/70",
				className,
			)}
			{...props}
		/>
	);
}
