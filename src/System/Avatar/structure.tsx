import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { AvatarPersonIcon } from "./content";
import { AvatarActionSlot, AvatarBody, AvatarRing } from "./primitives";

type AvatarSize = "sm" | "md" | "lg";

const avatarSizeVariants = tv({
	variants: {
		size: {
			sm: "h-8 w-8",
			md: "h-10 w-10",
			lg: "h-14 w-14",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export interface AvatarProps
	extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
	size?: AvatarSize;
	src?: string | undefined;
	alt?: string;
	action?: ReactNode;
}

export function Avatar({
	className,
	size = "md",
	src,
	alt = "",
	action,
	...props
}: AvatarProps) {
	return (
		<AvatarRing
			className={cn(avatarSizeVariants({ size }), className)}
			{...props}
		>
			<AvatarBody>
				{src ? (
					<img src={src} alt={alt} className="h-full w-full object-cover" />
				) : (
					<AvatarPersonIcon />
				)}
			</AvatarBody>
			{action ? <AvatarActionSlot>{action}</AvatarActionSlot> : null}
		</AvatarRing>
	);
}
