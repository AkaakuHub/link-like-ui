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
	const sizeClassName =
		variant === "circle" ? "h-[1.5rem] w-[1.5rem] p-0" : "px-1.5 py-1";

	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-ll-badge-orange to-ll-badge-red text-center leading-none font-semibold tabular-nums text-ll-white",
				sizeClassName,
				className,
			)}
			{...props}
		>
			<span>{children}</span>
		</span>
	);
}
