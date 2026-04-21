import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../utils";

export function AvatarRing({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"relative inline-flex shrink-0 rounded-full p-[2px] ll-bg-system-gradient",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function AvatarBody({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-ll-modal-content-gray",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function AvatarActionSlot({ children }: { children: ReactNode }) {
	return (
		<span className="absolute right-0 bottom-0 inline-flex h-6 w-6 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full bg-ll-white shadow-md">
			{children}
		</span>
	);
}
