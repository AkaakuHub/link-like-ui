import * as Dialog from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
	type HTMLAttributes,
} from "react";
import SimpleBar from "simplebar-react";
import { cn } from "../utils";

type SystemModalBodyPadding = "default" | "compact" | "comfortable" | "none";

const bodyPaddingClassMap: Record<SystemModalBodyPadding, string> = {
	default: "p-[1rem_1.1rem_0.75rem]",
	compact: "p-3",
	comfortable: "p-4",
	none: "p-0",
};

type SystemModalBodyTone = "default" | "surface";

const bodyToneClassMap: Record<SystemModalBodyTone, string> = {
	default: "",
	surface: "bg-ll-modal-content-gray",
};

export function SystemModalHeader({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"relative flex h-[3.15rem] items-center justify-center bg-linear-to-r from-ll-system-left to-ll-system-right px-4",
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
			className='ll-system-modal-scrollbar font-["Noto_Sans_JP","Segoe_UI",sans-serif] text-[0.94rem] leading-[1.7] text-ll-gray'
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
	ElementRef<typeof Dialog.Title>,
	ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => {
	return (
		<Dialog.Title
			ref={ref}
			className={cn(
				'relative z-[1] font-["Noto_Sans_JP","Segoe_UI",sans-serif] text-[1.32rem] leading-none tracking-[0.03em] text-ll-white',
				className,
			)}
			{...props}
		/>
	);
});

SystemModalTitle.displayName = "SystemModalTitle";

export const SystemModalDescription = forwardRef<
	ElementRef<typeof Dialog.Description>,
	ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => {
	return (
		<Dialog.Description
			ref={ref}
			className={cn("text-inherit [font:inherit]", className)}
			{...props}
		/>
	);
});

SystemModalDescription.displayName = "SystemModalDescription";
