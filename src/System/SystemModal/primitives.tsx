import * as Dialog from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";

export const SystemModal = Dialog.Root;
export const SystemModalTrigger = Dialog.Trigger;
export const SystemModalClose = Dialog.Close;
export const SystemModalPortalPrimitive = Dialog.Portal;

export const SystemModalOverlayPrimitive = forwardRef<
	ElementRef<typeof Dialog.Overlay>,
	ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ ...props }, ref) => <Dialog.Overlay ref={ref} {...props} />);

SystemModalOverlayPrimitive.displayName = "SystemModalOverlayPrimitive";

export const SystemModalContentPrimitive = forwardRef<
	ElementRef<typeof Dialog.Content>,
	ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ ...props }, ref) => <Dialog.Content ref={ref} {...props} />);

SystemModalContentPrimitive.displayName = "SystemModalContentPrimitive";

export const SystemModalTitlePrimitive = Dialog.Title;
export const SystemModalDescriptionPrimitive = Dialog.Description;
