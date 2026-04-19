import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
	type HTMLAttributes,
} from "react";
import { cn } from "../../../../utils";
import {
	AppShellSubmenuModal,
	AppShellSubmenuModalContentPrimitive,
	AppShellSubmenuModalOverlayPrimitive,
	AppShellSubmenuModalPortalPrimitive,
	AppShellSubmenuModalTitlePrimitive,
} from "./primitives";

export { AppShellSubmenuModal };

export const AppShellSubmenuModalOverlay = forwardRef<
	ElementRef<typeof AppShellSubmenuModalOverlayPrimitive>,
	ComponentPropsWithoutRef<typeof AppShellSubmenuModalOverlayPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<AppShellSubmenuModalOverlayPrimitive
			ref={ref}
			className={cn(
				"fixed inset-0 bg-black/67 transition-opacity duration-180 ease-out data-[state=closed]:duration-160 data-[state=closed]:ease-in data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
				className,
			)}
			{...props}
		/>
	);
});

AppShellSubmenuModalOverlay.displayName = "AppShellSubmenuModalOverlay";

export const AppShellSubmenuModalContent = forwardRef<
	ElementRef<typeof AppShellSubmenuModalContentPrimitive>,
	ComponentPropsWithoutRef<typeof AppShellSubmenuModalContentPrimitive>
>(({ children, className, ...props }, ref) => {
	return (
		<AppShellSubmenuModalPortalPrimitive>
			<AppShellSubmenuModalOverlay />
			<AppShellSubmenuModalContentPrimitive
				ref={ref}
				className={cn(
					"fixed top-1/2 left-1/2 w-[calc(100vw-1rem)] max-w-none -translate-x-1/2 -translate-y-1/2 origin-center overflow-hidden rounded-[32px] border-none data-[state=open]:animate-[ll-system-modal-open_100ms_cubic-bezier(.93,.23,.71,.94)_both] data-[state=closed]:animate-[ll-system-modal-close_100ms_cubic-bezier(.93,.23,.71,.94)_both] focus-visible:outline-3 focus-visible:outline-ll-label",
					className,
				)}
				{...props}
			>
				{children}
			</AppShellSubmenuModalContentPrimitive>
		</AppShellSubmenuModalPortalPrimitive>
	);
});

AppShellSubmenuModalContent.displayName = "AppShellSubmenuModalContent";

export function AppShellSubmenuModalBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("p-0", className)} {...props} />;
}

export const AppShellSubmenuModalTitle = forwardRef<
	ElementRef<typeof AppShellSubmenuModalTitlePrimitive>,
	ComponentPropsWithoutRef<typeof AppShellSubmenuModalTitlePrimitive>
>(({ className, ...props }, ref) => {
	return (
		<AppShellSubmenuModalTitlePrimitive
			ref={ref}
			className={cn(className)}
			{...props}
		/>
	);
});

AppShellSubmenuModalTitle.displayName = "AppShellSubmenuModalTitle";
