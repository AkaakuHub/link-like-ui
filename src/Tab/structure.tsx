import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";
import { TabListPrimitive, TabPanelPrimitive } from "./primitives";

export const TabList = forwardRef<
	ElementRef<typeof TabListPrimitive>,
	ComponentPropsWithoutRef<typeof TabListPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<TabListPrimitive
			ref={ref}
			className={cn(
				"inline-flex w-full items-center border-b border-ll-disabled bg-ll-white",
				className,
			)}
			{...props}
		/>
	);
});

TabList.displayName = "TabList";

export const TabPanel = forwardRef<
	ElementRef<typeof TabPanelPrimitive>,
	ComponentPropsWithoutRef<typeof TabPanelPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<TabPanelPrimitive
			ref={ref}
			className={cn("pt-3 data-[state=inactive]:hidden", className)}
			{...props}
		/>
	);
});

TabPanel.displayName = "TabPanel";
