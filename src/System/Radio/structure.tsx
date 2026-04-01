import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../utils";
import {
	RadioGroupIndicatorPrimitive,
	RadioGroupItemPrimitive,
	RadioGroupPrimitive,
} from "./primitives";

export const RadioGroup = forwardRef<
	ElementRef<typeof RadioGroupPrimitive>,
	ComponentPropsWithoutRef<typeof RadioGroupPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive
			ref={ref}
			className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}
			{...props}
		/>
	);
});

RadioGroup.displayName = "RadioGroup";

export const RadioItem = forwardRef<
	ElementRef<typeof RadioGroupItemPrimitive>,
	ComponentPropsWithoutRef<typeof RadioGroupItemPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupItemPrimitive
			ref={ref}
			className={cn(
				"inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ll-disabled bg-ll-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ll-label disabled:opacity-55",
				className,
			)}
			{...props}
		>
			<RadioGroupIndicatorPrimitive className="inline-flex h-[0.65rem] w-[0.65rem] rounded-full bg-linear-to-r from-ll-system-left to-ll-system-right" />
		</RadioGroupItemPrimitive>
	);
});

RadioItem.displayName = "RadioItem";
