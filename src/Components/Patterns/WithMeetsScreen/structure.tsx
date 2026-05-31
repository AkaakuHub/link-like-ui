import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type HTMLAttributes,
} from "react";
import { cn } from "../../../utils";
import {
	WithMeetsButtonBase,
	WithMeetsDivBase,
	WithMeetsImageBase,
} from "./primitives";

export function WithMeetsRoot({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn(
				"grid h-dvh w-dvw place-items-center overflow-hidden bg-ll-black text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsFrame({
	className,
	"data-orientation": dataOrientation,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	"data-orientation"?: "horizontal" | "vertical";
}) {
	return (
		<WithMeetsDivBase
			className={cn(
				dataOrientation === "vertical"
					? "relative aspect-1170/2532 h-dvh max-h-dvh w-auto max-w-dvw overflow-hidden bg-ll-black text-[clamp(0.5rem,1.3vw,0.78rem)]"
					: "relative aspect-2532/1170 h-auto max-h-dvh w-dvw max-w-[calc(100dvh*2532/1170)] overflow-hidden bg-ll-black text-[clamp(0.5rem,0.68vw,0.78rem)]",
				className,
			)}
			data-orientation={dataOrientation}
			{...props}
		/>
	);
}

export function WithMeetsVideoViewport({
	className,
	"data-orientation": dataOrientation,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	"data-orientation"?: "horizontal" | "vertical";
}) {
	return (
		<WithMeetsDivBase
			className={cn(
				dataOrientation === "vertical"
					? "absolute inset-x-[5%] top-[3%] bottom-[27%] overflow-hidden bg-ll-black"
					: "absolute top-[5.4%] bottom-[3.8%] left-[13.4%] w-[73.2%] overflow-hidden bg-ll-black",
				className,
			)}
			data-orientation={dataOrientation}
			{...props}
		/>
	);
}

export function WithMeetsStageImage({
	className,
	...props
}: ComponentPropsWithoutRef<typeof WithMeetsImageBase>) {
	return (
		<WithMeetsImageBase
			className={cn("absolute inset-0 h-full w-full object-cover", className)}
			{...props}
		/>
	);
}

export const WithMeetsStageVideo = forwardRef<
	HTMLVideoElement,
	ComponentPropsWithoutRef<"video">
>(function WithMeetsStageVideo({ className, ...props }, ref) {
	return (
		<video
			ref={ref}
			className={cn("absolute inset-0 h-full w-full", className)}
			playsInline
			preload="metadata"
			{...props}
		/>
	);
});

export function WithMeetsTopBar({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn(
				"absolute inset-x-[7%] top-[6%] flex items-start",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsIconButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof WithMeetsButtonBase>) {
	return (
		<WithMeetsButtonBase
			className={cn(
				"grid h-[2em] w-[2em] place-items-center rounded-full text-ll-true-white drop-shadow-[0_1px_2px_var(--color-ll-black)]",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsPlayBadge({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn(
				"mt-[0.15em] inline-flex h-[1.6em] items-center gap-[0.25em] rounded-full bg-ll-badge-orange px-[0.7em] text-[0.76em] leading-none font-semibold text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsScoreTrack({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn(
				"relative ml-[1.8em] h-[3.2em] flex-1 max-w-[47%] text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsSideActions({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn(
				"absolute top-[8%] right-[6.8%] flex gap-[1.15em]",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsProgressArea({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn("absolute inset-x-[7%] bottom-[8%]", className)}
			{...props}
		/>
	);
}

export function WithMeetsControlRow({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn("mt-[1.35em] flex items-center justify-between", className)}
			{...props}
		/>
	);
}

export function WithMeetsMenuButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof WithMeetsButtonBase>) {
	return (
		<WithMeetsButtonBase
			className={cn(
				"inline-flex items-center gap-[0.45em] text-[1.18em] leading-none font-semibold text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsPanel({
	className,
	"data-orientation": dataOrientation,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	"data-orientation"?: "horizontal" | "vertical";
}) {
	return (
		<WithMeetsDivBase
			className={cn(
				dataOrientation === "vertical"
					? "absolute inset-x-[5%] bottom-[3%] h-[26%] overflow-hidden rounded-t-[1.35em] bg-ll-gray/58 text-ll-true-white shadow-[0_0_16px_color-mix(in_srgb,var(--color-ll-black)_45%,transparent)] backdrop-blur-[0.26em] transition-[background-color,box-shadow,backdrop-filter] duration-200"
					: "absolute top-[5.4%] right-[5%] bottom-[3.8%] w-[29%] overflow-hidden rounded-l-[1.35em] bg-ll-gray/58 text-ll-true-white shadow-[0_0_16px_color-mix(in_srgb,var(--color-ll-black)_45%,transparent)] backdrop-blur-[0.26em] transition-[background-color,box-shadow,backdrop-filter] duration-200",
				className,
			)}
			data-orientation={dataOrientation}
			{...props}
		/>
	);
}

export function WithMeetsPanelHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn(
				"grid h-[3.2em] grid-cols-[1fr_auto] items-center border-b border-ll-true-white/12 px-[1.2em]",
				className,
			)}
			{...props}
		/>
	);
}

export function WithMeetsPanelTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			className={cn("text-[1em] leading-none font-semibold", className)}
			{...props}
		/>
	);
}

export function WithMeetsPanelBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<WithMeetsDivBase
			className={cn("h-[calc(100%-3.2em)] min-h-0", className)}
			{...props}
		/>
	);
}

export function WithMeetsPillButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof WithMeetsButtonBase>) {
	return (
		<WithMeetsButtonBase
			className={cn(
				"rounded-full bg-ll-tab-active px-[0.7em] py-[0.35em] text-[0.7em] leading-none font-semibold text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
}
