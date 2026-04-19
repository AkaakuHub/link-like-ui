import type { HTMLAttributes } from "react";
import { cn } from "../../../utils";

export function LayoutTileBadge({
	children,
	className,
	variant = "pill",
	...props
}: HTMLAttributes<HTMLSpanElement> & {
	variant?: "pill" | "circle";
}) {
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-ll-badge-orange to-ll-badge-red text-center leading-none font-semibold tabular-nums text-ll-white",
				variant === "circle" ? "h-6 w-6 p-0" : "px-1.5 py-1",
				className,
			)}
			{...props}
		>
			<span>{children}</span>
		</span>
	);
}
