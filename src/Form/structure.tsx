import type { HTMLAttributes } from "react";
import { cn } from "../utils";

type FormStackSpacing = "md" | "lg";

const formStackSpacingClassMap: Record<FormStackSpacing, string> = {
	md: "space-y-4",
	lg: "space-y-5",
};

export function FormStack({
	className,
	spacing = "lg",
	...props
}: HTMLAttributes<HTMLDivElement> & { spacing?: FormStackSpacing }) {
	return (
		<div
			className={cn(formStackSpacingClassMap[spacing], className)}
			{...props}
		/>
	);
}

export function FormField({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("space-y-2.5", className)} {...props} />;
}

export function FormFieldHeader({
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

export function FormFieldMeta({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex items-center gap-4", className)} {...props} />
	);
}

export function FormFieldLabelText({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'font-["Noto_Sans_JP","Segoe_UI",sans-serif] font-bold text-ll-gray',
				className,
			)}
			{...props}
		/>
	);
}

export function FormFieldRequiredText({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'font-["Noto_Sans_JP","Segoe_UI",sans-serif] text-ll-orange',
				className,
			)}
			{...props}
		/>
	);
}

export function FormFieldErrorText({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'font-["Noto_Sans_JP","Segoe_UI",sans-serif] text-right text-ll-red',
				className,
			)}
			{...props}
		/>
	);
}

export function FormSelectIndicator({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[0.95rem] leading-none text-ll-disabled",
				className,
			)}
			aria-hidden="true"
			{...props}
		>
			▼
		</span>
	);
}

export function FormNote({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn("text-ll-gray", className)} {...props} />;
}

export function FormSubmitActions({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex justify-center", className)} {...props} />;
}
