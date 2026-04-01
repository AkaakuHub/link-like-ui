import type { HTMLAttributes } from "react";
import { cn } from "../../utils";

type SystemModalHeadingSize = "default" | "compact";
type SystemModalHeadingTone = "gradient" | "label";
type SystemModalHeadingLayout = "chip" | "bar";

const headingSizeClassMap: Record<SystemModalHeadingSize, string> = {
	default: "h-7 min-w-50 px-5 text-[1rem]",
	compact: "h-[1.4rem] min-w-38 px-5 text-[0.95rem]",
};

const headingToneClassMap: Record<SystemModalHeadingTone, string> = {
	gradient:
		"bg-linear-to-r from-ll-system-left to-ll-system-right text-ll-white",
	label: "bg-ll-label text-ll-white",
};

const headingLayoutClassMap: Record<SystemModalHeadingLayout, string> = {
	chip: "rounded-full",
	bar: "w-full rounded-[0.6rem]",
};

export function SystemModalHeading({
	className,
	layout = "chip",
	size = "default",
	tone = "gradient",
	withoutTopMargin = false,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	layout?: SystemModalHeadingLayout;
	size?: SystemModalHeadingSize;
	tone?: SystemModalHeadingTone;
	withoutTopMargin?: boolean;
}) {
	return (
		<div
			className={cn(
				"inline-flex items-center justify-center font-bold",
				withoutTopMargin ? "" : "mt-4",
				headingLayoutClassMap[layout],
				headingSizeClassMap[size],
				headingToneClassMap[tone],
				className,
			)}
			{...props}
		/>
	);
}

export function SystemModalPanel({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"space-y-4 rounded-[0.65rem] bg-ll-modal-content-gray p-3",
				className,
			)}
			{...props}
		/>
	);
}

type SystemModalActionsSpacing = "default" | "compact" | "none";

const actionsSpacingClassMap: Record<SystemModalActionsSpacing, string> = {
	default: "mt-6",
	compact: "mt-5",
	none: "",
};

export function SystemModalActions({
	children,
	className,
	spacing = "default",
	...props
}: HTMLAttributes<HTMLDivElement> & { spacing?: SystemModalActionsSpacing }) {
	return (
		<div
			className={cn(
				actionsSpacingClassMap[spacing],
				"flex justify-center",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function SystemModalActionGrid({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("grid grid-cols-3 gap-2.5", className)} {...props} />
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
				"mt-3 text-center text-[0.78rem] leading-[1.5] font-semibold text-ll-red",
				className,
			)}
			{...props}
		/>
	);
}

type SystemModalStackSpacing = "sm" | "md" | "lg";

const stackSpacingClassMap: Record<SystemModalStackSpacing, string> = {
	sm: "space-y-2",
	md: "space-y-4",
	lg: "space-y-5",
};

export function SystemModalStack({
	className,
	spacing = "md",
	...props
}: HTMLAttributes<HTMLDivElement> & { spacing?: SystemModalStackSpacing }) {
	return (
		<div className={cn(stackSpacingClassMap[spacing], className)} {...props} />
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
	padding = "none",
	withoutTopMargin = false,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	padding?: "none" | "md";
	withoutTopMargin?: boolean;
}) {
	return (
		<div
			className={cn(
				"text-[0.9rem] leading-[1.8] text-ll-gray [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-2 [&_li+li]:mt-1",
				withoutTopMargin ? "mt-0" : "mt-3",
				padding === "md" ? "p-4" : "",
				className,
			)}
			{...props}
		/>
	);
}
