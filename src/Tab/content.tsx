import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";
import { TabTriggerPrimitive } from "./primitives";

export const TabTrigger = forwardRef<
	ElementRef<typeof TabTriggerPrimitive>,
	ComponentPropsWithoutRef<typeof TabTriggerPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<TabTriggerPrimitive
			ref={ref}
			className={cn(
				"relative inline-flex min-h-8 flex-1 items-center justify-center border-r border-ll-disabled px-2 text-[0.8rem] font-semibold text-ll-label transition-colors last:border-r-0 data-[state=active]:z-10 data-[state=active]:bg-ll-tab-active data-[state=active]:text-ll-white after:pointer-events-none after:absolute after:top-full after:left-1/2 after:z-10 after:hidden after:h-[0.3rem] after:w-[0.95rem] after:-translate-x-1/2 after:bg-ll-tab-active after:[clip-path:polygon(0_0,100%_0,50%_100%)] data-[state=active]:after:block",
				className,
			)}
			{...props}
		/>
	);
});

TabTrigger.displayName = "TabTrigger";
