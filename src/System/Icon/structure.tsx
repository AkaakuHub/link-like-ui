import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils";

interface GradientIconRootProps extends ComponentPropsWithoutRef<"span"> {}

export function GradientIconRoot({
	className,
	...props
}: GradientIconRootProps) {
	return (
		<span
			className={cn(
				"inline-grid h-full w-full shrink-0 place-items-center leading-none",
				className,
			)}
			{...props}
		/>
	);
}
