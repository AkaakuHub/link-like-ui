import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";

export const SeparatorPrimitive = forwardRef<
	ElementRef<"div">,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn("h-px w-full bg-ll-modal-tab-gray", className)}
			{...props}
		/>
	);
});

SeparatorPrimitive.displayName = "SeparatorPrimitive";
