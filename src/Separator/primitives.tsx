import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";

export const SeparatorBase = forwardRef<
	ElementRef<"div">,
	ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => <div ref={ref} {...props} />);

SeparatorBase.displayName = "SeparatorBase";
