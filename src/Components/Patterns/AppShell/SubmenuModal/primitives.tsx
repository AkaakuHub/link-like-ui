import * as Dialog from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";

export const AppShellSubmenuModal = Dialog.Root;

export const AppShellSubmenuModalOverlayPrimitive = forwardRef<
	ElementRef<typeof Dialog.Overlay>,
	ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ ...props }, ref) => <Dialog.Overlay ref={ref} {...props} />);

AppShellSubmenuModalOverlayPrimitive.displayName =
	"AppShellSubmenuModalOverlayPrimitive";

export const AppShellSubmenuModalPortalPrimitive = Dialog.Portal;

export const AppShellSubmenuModalContentPrimitive = forwardRef<
	ElementRef<typeof Dialog.Content>,
	ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ ...props }, ref) => <Dialog.Content ref={ref} {...props} />);

AppShellSubmenuModalContentPrimitive.displayName =
	"AppShellSubmenuModalContentPrimitive";

export const AppShellSubmenuModalTitlePrimitive = Dialog.Title;
