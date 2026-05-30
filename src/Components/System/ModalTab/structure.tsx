import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../utils";
import {
	ModalTabListPrimitive,
	ModalTabPanelPrimitive,
	ModalTabRootPrimitive,
	ModalTabTriggerPrimitive,
} from "./primitives";

type ModalTabListVariant = "media" | "modal";
type ModalTabTriggerVariant = "media" | "modal";

const modalTabListVariantClassMap: Record<ModalTabListVariant, string> = {
	media:
		"grid h-16 grid-cols-[6.5rem_6.5rem_6rem_1fr] border-b border-ll-disabled/35 bg-ll-white shadow-[0_2px_4px_color-mix(in_srgb,var(--color-ll-gray)_18%,transparent)]",
	modal: "inline-flex w-full items-center bg-ll-white",
};

const modalTabTriggerVariantClassMap: Record<ModalTabTriggerVariant, string> = {
	media:
		"relative grid place-items-center border-r border-ll-disabled/18 py-2 text-ll-gray/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ll-label focus-visible:ring-inset data-[state=active]:text-ll-label after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[0.16rem] after:w-full after:bg-ll-modal-tab-gray data-[state=active]:after:bg-linear-to-r data-[state=active]:after:from-ll-system-left data-[state=active]:after:to-ll-system-right",
	modal:
		"relative inline-flex min-h-11 flex-1 items-center justify-center px-3 text-[0.95rem] leading-none font-bold text-ll-disabled transition-colors data-[state=active]:text-ll-label after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[0.16rem] after:w-full after:bg-ll-modal-tab-gray data-[state=active]:after:bg-linear-to-r data-[state=active]:after:from-ll-system-left data-[state=active]:after:to-ll-system-right not-first:before:pointer-events-none not-first:before:absolute not-first:before:top-2 not-first:before:bottom-2 not-first:before:left-0 not-first:before:w-[0.05rem] not-first:before:bg-ll-table not-first:before:content-['']",
};

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
	ComponentPropsWithoutRef<typeof ModalTabListPrimitive> & {
		variant?: ModalTabListVariant;
	}
>(({ className, variant = "modal", ...props }, ref) => {
	return (
		<ModalTabListPrimitive
			ref={ref}
			className={cn(modalTabListVariantClassMap[variant], className)}
			{...props}
		/>
	);
});

ModalTabList.displayName = "ModalTabList";

export const ModalTabTrigger = forwardRef<
	ElementRef<typeof ModalTabTriggerPrimitive>,
	ComponentPropsWithoutRef<typeof ModalTabTriggerPrimitive> & {
		variant?: ModalTabTriggerVariant;
	}
>(({ className, variant = "modal", ...props }, ref) => {
	return (
		<ModalTabTriggerPrimitive
			ref={ref}
			className={cn(modalTabTriggerVariantClassMap[variant], className)}
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
