import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
	type HTMLAttributes,
} from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../../utils";
import { FormInputBase, FormSelectBase, FormTextareaBase } from "./primitives";

const formControlVariants = tv({
	base: "ll-font-ja w-full rounded-[0.7rem] border border-ll-label bg-ll-white px-3 text-ll-gray outline-none placeholder:text-ll-disabled",
	variants: {
		kind: {
			input: "h-[2.9rem] leading-none",
			textarea: "min-h-42 resize-none py-3",
			select: "h-[2.9rem] appearance-none pr-10 leading-none",
		},
	},
});

export const FormInputPrimitive = forwardRef<
	ElementRef<typeof FormInputBase>,
	ComponentPropsWithoutRef<typeof FormInputBase>
>(({ className, ...props }, ref) => {
	return (
		<FormInputBase
			ref={ref}
			className={cn(formControlVariants({ kind: "input" }), className)}
			{...props}
		/>
	);
});

FormInputPrimitive.displayName = "FormInputPrimitive";

export const FormTextareaPrimitive = forwardRef<
	ElementRef<typeof FormTextareaBase>,
	ComponentPropsWithoutRef<typeof FormTextareaBase>
>(({ className, ...props }, ref) => {
	return (
		<FormTextareaBase
			ref={ref}
			className={cn(formControlVariants({ kind: "textarea" }), className)}
			{...props}
		/>
	);
});

FormTextareaPrimitive.displayName = "FormTextareaPrimitive";

export const FormSelectPrimitive = forwardRef<
	ElementRef<typeof FormSelectBase>,
	ComponentPropsWithoutRef<typeof FormSelectBase>
>(({ className, ...props }, ref) => {
	return (
		<FormSelectBase
			ref={ref}
			className={cn(formControlVariants({ kind: "select" }), className)}
			{...props}
		/>
	);
});

FormSelectPrimitive.displayName = "FormSelectPrimitive";

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
	return <div className={cn("ll-stack-field", className)} {...props} />;
}

export function FormFieldHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("ll-split-row", className)} {...props} />;
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
			className={cn("ll-font-ja font-bold text-ll-gray", className)}
			{...props}
		/>
	);
}

export function FormFieldRequiredText({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span className={cn("ll-font-ja text-ll-orange", className)} {...props} />
	);
}

export function FormFieldErrorText({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("ll-font-ja text-right text-ll-red", className)}
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
