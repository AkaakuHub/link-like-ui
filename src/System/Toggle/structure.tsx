import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../utils";
import { TogglePrimitive } from "./primitives";

export const Toggle = forwardRef<
	ElementRef<typeof TogglePrimitive>,
	ComponentPropsWithoutRef<typeof TogglePrimitive>
>(({ className, ...props }, ref) => {
	return (
		<TogglePrimitive
			ref={ref}
			className={cn(
				"ll-bg-system-gradient inline-flex h-8 w-8 shrink-0 aspect-square cursor-pointer items-center justify-center rounded-full text-ll-white hover:brightness-95 data-[state=off]:bg-none! data-[state=off]:bg-ll-toggle-off",
				className,
			)}
			{...props}
		/>
	);
});

Toggle.displayName = "Toggle";
