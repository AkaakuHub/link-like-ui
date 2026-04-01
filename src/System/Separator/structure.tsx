import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../utils";
import { SeparatorBase } from "./primitives";

export const SeparatorPrimitive = forwardRef<
	ElementRef<typeof SeparatorBase>,
	ComponentPropsWithoutRef<typeof SeparatorBase>
>(({ className, ...props }, ref) => {
	return (
		<SeparatorBase
			ref={ref}
			className={cn("h-px w-full bg-ll-modal-tab-gray", className)}
			{...props}
		/>
	);
});

SeparatorPrimitive.displayName = "SeparatorPrimitive";

export { SeparatorPrimitive as Separator };
