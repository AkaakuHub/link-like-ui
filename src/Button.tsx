import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-[0.4rem] rounded-xl border border-none font-semibold leading-none tracking-[0.01em] transition-[filter,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ll-label disabled:cursor-not-allowed disabled:bg-ll-disabled hover:brightness-80 disabled:hover:brightness-100",
	variants: {
		variant: {
			primary:
				"bg-linear-to-r from-ll-system-left to-ll-system-right text-ll-white disabled:bg-none",
			secondary:
				"bg-white text-ll-gray shadow-[0_0_8px_color-mix(in_srgb,var(--color-ll-gray)_35%,transparent)]",
		},
		size: {
			sm: "h-8 px-3 text-[0.85rem]",
			md: "h-10 px-4 text-[0.95rem]",
			lg: "h-12 px-5 text-[1rem]",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, size = "md", type, variant = "primary", ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ size, variant }), className)}
				type={type ?? "button"}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";
