import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
	type HTMLAttributes,
} from "react";
import SimpleBar from "simplebar-react";
import { tv } from "tailwind-variants";
import { cn } from "../../../utils";
import {
	SystemModalContentPrimitive,
	SystemModalDescriptionPrimitive,
	SystemModalOverlayPrimitive,
	SystemModalPortalPrimitive,
	SystemModalTitlePrimitive,
} from "./primitives";

type SystemModalBodyPadding = "default" | "compact" | "comfortable" | "none";

const bodyPaddingClassMap: Record<SystemModalBodyPadding, string> = {
	default: "p-[1rem_1.1rem_0.75rem]",
	compact: "px-3 pt-3",
	comfortable: "p-4",
	none: "p-0",
};

type SystemModalBodyTone = "default" | "surface";

const bodyToneClassMap: Record<SystemModalBodyTone, string> = {
	default: "",
	surface: "bg-ll-modal-content-gray",
};

const systemModalOverlayClassName = tv({
	base: "fixed inset-0 bg-black/67 transition-opacity duration-180 ease-out data-[state=closed]:duration-160 data-[state=closed]:ease-in data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
});

const systemModalContentClassName = tv({
	base: "fixed top-1/2 left-1/2 max-h-[84dvh] w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 origin-center overflow-hidden rounded-[16px] border-none data-[state=open]:animate-[ll-system-modal-open_100ms_cubic-bezier(.93,.23,.71,.94)_both] data-[state=closed]:animate-[ll-system-modal-close_100ms_cubic-bezier(.93,.23,.71,.94)_both] focus-visible:outline-3 focus-visible:outline-ll-label",
	variants: {
		width: {
			sm: "max-w-87",
			md: "max-w-[24rem]",
			lg: "max-w-104",
		},
	},
	defaultVariants: {
		width: "md",
	},
});

export const SystemModalOverlay = forwardRef<
	ElementRef<typeof SystemModalOverlayPrimitive>,
	ComponentPropsWithoutRef<typeof SystemModalOverlayPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<SystemModalOverlayPrimitive
			ref={ref}
			className={cn(systemModalOverlayClassName(), className)}
			{...props}
		/>
	);
});

SystemModalOverlay.displayName = "SystemModalOverlay";

export interface SystemModalContentProps
	extends ComponentPropsWithoutRef<typeof SystemModalContentPrimitive> {
	bodyClassName?: string;
	overlayClassName?: string;
	width?: "sm" | "md" | "lg";
}

export const SystemModalContent = forwardRef<
	ElementRef<typeof SystemModalContentPrimitive>,
	SystemModalContentProps
>(
	(
		{
			bodyClassName,
			children,
			className,
			overlayClassName,
			width = "md",
			...props
		},
		ref,
	) => {
		return (
			<SystemModalPortalPrimitive>
				<SystemModalOverlay className={overlayClassName} />
				<SystemModalContentPrimitive
					ref={ref}
					className={cn(systemModalContentClassName({ width }), className)}
					{...props}
				>
					<div className={cn("bg-ll-white", bodyClassName)}>{children}</div>
				</SystemModalContentPrimitive>
			</SystemModalPortalPrimitive>
		);
	},
);

SystemModalContent.displayName = "SystemModalContent";

export function SystemModalHeader({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"ll-bg-system-gradient relative flex h-[3.15rem] items-center justify-center px-4",
				className,
			)}
			{...props}
		>
			<div
				className="pointer-events-none absolute inset-0 overflow-hidden"
				aria-hidden="true"
			>
				<span className="absolute top-0 right-0 h-full w-25 [clip-path:polygon(0_0,50%_0,25%_50%)] bg-linear-to-r from-ll-prism-1 to-ll-prism-2" />
				<span className="absolute top-0 right-0 h-full w-25 [clip-path:polygon(0_100%,50%_100%,25%_50%)] bg-linear-to-r from-ll-prism-1 to-ll-prism-2" />
				<span className="absolute top-0 right-0 h-full w-25 [clip-path:polygon(50%_0,100%_0,75%_50%)] bg-linear-to-r from-ll-prism-2 to-ll-prism-3" />
				<span className="absolute top-0 right-0 h-full w-25 [clip-path:polygon(50%_100%,100%_100%,75%_50%)] bg-linear-to-r from-ll-prism-2 to-ll-prism-3" />
				<span className="absolute top-0 right-0 h-full w-25 [clip-path:polygon(50%_0,75%_50%,50%_100%,25%_50%)] bg-linear-to-r from-ll-prism-4 to-ll-prism-5" />
				<span className="absolute top-0 right-0 h-full w-25 [clip-path:polygon(100%_0,100%_100%,75%_50%)] bg-linear-to-r from-ll-prism-5 to-ll-prism-6" />
			</div>
			{children}
		</div>
	);
}

export function SystemModalBody({
	className,
	children,
	padding = "default",
	tone = "default",
	style,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	padding?: SystemModalBodyPadding;
	tone?: SystemModalBodyTone;
}) {
	return (
		<SimpleBar
			autoHide={false}
			className="ll-system-modal-scrollbar ll-font-ja text-[0.94rem] leading-[1.7] text-ll-gray"
			style={{ maxHeight: "min(58dvh, 33rem)", ...style }}
			{...props}
		>
			<div
				className={cn(
					bodyToneClassMap[tone],
					bodyPaddingClassMap[padding],
					className,
				)}
			>
				{children}
			</div>
		</SimpleBar>
	);
}

export function SystemModalFooter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("p-4", className)} {...props} />;
}

export const SystemModalTitle = forwardRef<
	ElementRef<typeof SystemModalTitlePrimitive>,
	ComponentPropsWithoutRef<typeof SystemModalTitlePrimitive>
>(({ className, ...props }, ref) => {
	return (
		<SystemModalTitlePrimitive
			ref={ref}
			className={cn(
				"ll-font-ja relative z-1 text-[1.32rem] leading-none tracking-[0.03em] text-ll-white",
				className,
			)}
			{...props}
		/>
	);
});

SystemModalTitle.displayName = "SystemModalTitle";

export const SystemModalDescription = forwardRef<
	ElementRef<typeof SystemModalDescriptionPrimitive>,
	ComponentPropsWithoutRef<typeof SystemModalDescriptionPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<SystemModalDescriptionPrimitive
			ref={ref}
			className={cn("text-inherit [font:inherit]", className)}
			{...props}
		/>
	);
});

SystemModalDescription.displayName = "SystemModalDescription";
