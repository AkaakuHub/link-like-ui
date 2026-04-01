import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
export const FormInputBase = forwardRef<
	ElementRef<"input">,
	ComponentPropsWithoutRef<"input">
>(({ type = "text", ...props }, ref) => (
	<input ref={ref} type={type} {...props} />
));

FormInputBase.displayName = "FormInputBase";

export const FormTextareaBase = forwardRef<
	ElementRef<"textarea">,
	ComponentPropsWithoutRef<"textarea">
>(({ ...props }, ref) => <textarea ref={ref} {...props} />);

FormTextareaBase.displayName = "FormTextareaBase";

export const FormSelectBase = forwardRef<
	ElementRef<"select">,
	ComponentPropsWithoutRef<"select">
>(({ ...props }, ref) => <select ref={ref} {...props} />);

FormSelectBase.displayName = "FormSelectBase";
