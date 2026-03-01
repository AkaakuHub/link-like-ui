import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";

const formControlBaseClassName =
	'w-full rounded-[0.7rem] border border-ll-label bg-ll-white px-3 text-ll-gray outline-none font-["Noto_Sans_JP","Segoe_UI",sans-serif] placeholder:text-ll-disabled';

export const FormInputPrimitive = forwardRef<
	ElementRef<"input">,
	ComponentPropsWithoutRef<"input">
>(({ className, type = "text", ...props }, ref) => {
	return (
		<input
			ref={ref}
			type={type}
			className={cn(
				formControlBaseClassName,
				"h-[2.9rem] leading-none",
				className,
			)}
			{...props}
		/>
	);
});

FormInputPrimitive.displayName = "FormInputPrimitive";

export const FormTextareaPrimitive = forwardRef<
	ElementRef<"textarea">,
	ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			ref={ref}
			className={cn(
				formControlBaseClassName,
				"min-h-[10.5rem] py-3 resize-none",
				className,
			)}
			{...props}
		/>
	);
});

FormTextareaPrimitive.displayName = "FormTextareaPrimitive";

export const FormSelectPrimitive = forwardRef<
	ElementRef<"select">,
	ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => {
	return (
		<select
			ref={ref}
			className={cn(
				formControlBaseClassName,
				"h-[2.9rem] appearance-none pr-10 leading-none",
				className,
			)}
			{...props}
		/>
	);
});

FormSelectPrimitive.displayName = "FormSelectPrimitive";
