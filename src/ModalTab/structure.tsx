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
			className={cn(
				"inline-flex w-full items-center border-b border-ll-table bg-ll-white",
				className,
			)}
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
				"relative inline-flex min-h-11 flex-1 items-center justify-center border-r border-ll-table px-3 text-[0.95rem] leading-none font-bold text-ll-gray transition-colors last:border-r-0 data-[state=active]:text-ll-label after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-[0.17rem] after:w-full after:bg-linear-to-r after:from-ll-system-left after:to-ll-system-right data-[state=active]:after:block",
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
