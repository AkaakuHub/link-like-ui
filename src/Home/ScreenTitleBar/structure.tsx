import type { HTMLAttributes } from "react";
import { cn } from "../../utils";
import { ScreenTitleBarBase } from "./primitives";

export function ScreenTitleBar({
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<ScreenTitleBarBase
			className={cn(
				"ll-bg-system-gradient relative flex h-[2.35rem] items-center justify-start px-[0.72rem]",
				className,
			)}
			{...props}
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(0_0,50%_0,25%_50%)] bg-linear-to-r from-ll-prism-1 to-ll-prism-2" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(0_100%,50%_100%,25%_50%)] bg-linear-to-r from-ll-prism-1 to-ll-prism-2" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(50%_0,100%_0,75%_50%)] bg-linear-to-r from-ll-prism-2 to-ll-prism-3" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(50%_100%,100%_100%,75%_50%)] bg-linear-to-r from-ll-prism-2 to-ll-prism-3" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(50%_0,75%_50%,50%_100%,25%_50%)] bg-linear-to-r from-ll-prism-4 to-ll-prism-5" />
				<span className="absolute top-0 right-0 h-full w-[4.7rem] [clip-path:polygon(100%_0,100%_100%,75%_50%)] bg-linear-to-r from-ll-prism-5 to-ll-prism-6" />
			</div>
			<div className="ll-font-ja relative z-1 text-[1rem] leading-none tracking-[0.01em] text-ll-white">
				{children}
			</div>
		</ScreenTitleBarBase>
	);
}
