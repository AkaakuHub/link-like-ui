import { type ButtonHTMLAttributes, type ElementRef, forwardRef } from "react";

export const ButtonBase = forwardRef<
	ElementRef<"button">,
	ButtonHTMLAttributes<HTMLButtonElement>
>(({ type = "button", ...props }, ref) => (
	<button ref={ref} type={type} {...props} />
));

ButtonBase.displayName = "ButtonBase";
