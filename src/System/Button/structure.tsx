import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { ButtonBase } from "./primitives";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "modal";
type ButtonRadius = "default" | "dialog";
type ButtonWidth = "auto" | "dialog";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-[0.4rem] border border-none font-semibold leading-none tracking-[0.01em] transition-[filter,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ll-label disabled:cursor-not-allowed disabled:bg-ll-disabled hover:brightness-80 disabled:hover:brightness-100",
	variants: {
		variant: {
			primary: "ll-bg-system-gradient text-ll-white disabled:bg-none",
			secondary: "ll-shadow-control bg-white text-ll-gray",
			danger:
				"bg-linear-to-r from-ll-unfollow-left to-ll-unfollow-right text-ll-white disabled:bg-none",
		},
		size: {
			sm: "h-8 px-3 text-[0.85rem]",
			md: "h-10 px-4 text-[0.95rem]",
			lg: "h-12 px-5 text-[1rem]",
			modal: "h-11 px-4 text-[1rem]",
		},
		radius: {
			default: "rounded-xl",
			dialog: "rounded-[13px]",
		},
		width: {
			auto: "",
			dialog: "w-[72%]",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		radius: "default",
		width: "auto",
	},
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	radius?: ButtonRadius;
	width?: ButtonWidth;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			radius = "default",
			size = "md",
			variant = "primary",
			width = "auto",
			...props
		},
		ref,
	) => {
		return (
			<ButtonBase
				ref={ref}
				className={cn(
					buttonVariants({ radius, size, variant, width }),
					className,
				)}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";
