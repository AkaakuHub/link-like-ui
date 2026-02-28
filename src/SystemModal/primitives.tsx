import * as Dialog from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { tv } from "tailwind-variants";
import { cn } from "../utils";

export const SystemModal = Dialog.Root;
export const SystemModalTrigger = Dialog.Trigger;
export const SystemModalClose = Dialog.Close;

const systemModalOverlayClassName = tv({
	base: "fixed inset-0 bg-black/67 transition-opacity duration-[180ms] ease-out data-[state=closed]:duration-[160ms] data-[state=closed]:ease-in data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
});

const systemModalContentClassName = tv({
	base: "fixed top-1/2 left-1/2 max-h-[84dvh] w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 origin-center overflow-hidden rounded-[16px] border-none data-[state=open]:animate-[ll-system-modal-open_100ms_cubic-bezier(.93,.23,.71,.94)_both] data-[state=closed]:animate-[ll-system-modal-close_100ms_cubic-bezier(.93,.23,.71,.94)_both] focus-visible:outline-3 focus-visible:outline-ll-label",
	variants: {
		width: {
			sm: "max-w-[21.75rem]",
			md: "max-w-[24rem]",
			lg: "max-w-[26rem]",
		},
	},
	defaultVariants: {
		width: "md",
	},
});

export const SystemModalOverlay = forwardRef<
	ElementRef<typeof Dialog.Overlay>,
	ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => {
	return (
		<Dialog.Overlay
			ref={ref}
			className={cn(systemModalOverlayClassName(), className)}
			{...props}
		/>
	);
});

SystemModalOverlay.displayName = "SystemModalOverlay";

export interface SystemModalContentProps
	extends ComponentPropsWithoutRef<typeof Dialog.Content> {
	bodyClassName?: string;
	width?: "sm" | "md" | "lg";
}

export const SystemModalContent = forwardRef<
	ElementRef<typeof Dialog.Content>,
	SystemModalContentProps
>(({ bodyClassName, children, className, width = "md", ...props }, ref) => {
	return (
		<Dialog.Portal>
			<SystemModalOverlay />
			<Dialog.Content
				ref={ref}
				className={cn(systemModalContentClassName({ width }), className)}
				{...props}
			>
				<div className={cn("bg-ll-white", bodyClassName)}>{children}</div>
			</Dialog.Content>
		</Dialog.Portal>
	);
});

SystemModalContent.displayName = "SystemModalContent";
