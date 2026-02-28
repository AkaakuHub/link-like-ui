import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";
import {
	ModalTabListPrimitive,
	ModalTabPanelPrimitive,
	ModalTabRootPrimitive,
	ModalTabTriggerPrimitive,
} from "./primitives";

export const ModalTabRoot = forwardRef<
	ElementRef<typeof ModalTabRootPrimitive>,
	ComponentPropsWithoutRef<typeof ModalTabRootPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<ModalTabRootPrimitive ref={ref} className={cn("", className)} {...props} />
	);
});

ModalTabRoot.displayName = "ModalTabRoot";

export const ModalTabList = forwardRef<
	ElementRef<typeof ModalTabListPrimitive>,
	ComponentPropsWithoutRef<typeof ModalTabListPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<ModalTabListPrimitive
			ref={ref}
			className={cn("inline-flex w-full items-center bg-ll-white", className)}
			{...props}
		/>
	);
});

ModalTabList.displayName = "ModalTabList";

export const ModalTabTrigger = forwardRef<
	ElementRef<typeof ModalTabTriggerPrimitive>,
	ComponentPropsWithoutRef<typeof ModalTabTriggerPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<ModalTabTriggerPrimitive
			ref={ref}
			className={cn(
				"relative inline-flex min-h-11 flex-1 items-center justify-center px-3 text-[0.95rem] leading-none font-bold text-ll-disabled transition-colors data-[state=active]:text-ll-label after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[0.16rem] after:w-full after:bg-ll-modal-tab-gray data-[state=active]:after:bg-linear-to-r data-[state=active]:after:from-ll-system-left data-[state=active]:after:to-ll-system-right [&:not(:first-child)]:before:pointer-events-none [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:top-2 [&:not(:first-child)]:before:bottom-2 [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-ll-table [&:not(:first-child)]:before:content-['']",
				className,
			)}
			{...props}
		/>
	);
});

ModalTabTrigger.displayName = "ModalTabTrigger";

export const ModalTabPanel = forwardRef<
	ElementRef<typeof ModalTabPanelPrimitive>,
	ComponentPropsWithoutRef<typeof ModalTabPanelPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<ModalTabPanelPrimitive
			ref={ref}
			className={cn("data-[state=inactive]:hidden", className)}
			{...props}
		/>
	);
});

ModalTabPanel.displayName = "ModalTabPanel";
