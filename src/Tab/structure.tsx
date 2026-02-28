import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";
import {
	TabListPrimitive,
	TabPanelPrimitive,
	TabRootPrimitive,
} from "./primitives";

type TabPanelTone = "plain" | "surface";

const tabPanelToneClassMap: Record<TabPanelTone, string> = {
	plain: "pt-3",
	surface: "space-y-[0.65rem] bg-ll-modal-content-gray p-2 pt-3",
};

export const TabRoot = forwardRef<
	ElementRef<typeof TabRootPrimitive>,
	ComponentPropsWithoutRef<typeof TabRootPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<TabRootPrimitive ref={ref} className={cn("mt-4", className)} {...props} />
	);
});

TabRoot.displayName = "TabRoot";

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
	ComponentPropsWithoutRef<typeof TabPanelPrimitive> & {
		tone?: TabPanelTone;
	}
>(({ className, tone = "plain", ...props }, ref) => {
	return (
		<TabPanelPrimitive
			ref={ref}
			className={cn(
				tabPanelToneClassMap[tone],
				"data-[state=inactive]:hidden",
				className,
			)}
			{...props}
		/>
	);
});

TabPanel.displayName = "TabPanel";
