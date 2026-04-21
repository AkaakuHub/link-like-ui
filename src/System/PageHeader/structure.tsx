import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils";
import { PageHeaderBase } from "./primitives";

export function PageHeader({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof PageHeaderBase>) {
	return (
		<PageHeaderBase
			className={cn(
				"relative flex w-full items-center bg-linear-to-r from-ll-system-left to-ll-system-right px-4 py-2.5",
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
		</PageHeaderBase>
	);
}

export function PageHeaderTitle({
	className,
	...props
}: ComponentPropsWithoutRef<"h1">) {
	return (
		<h1
			className={cn(
				"relative z-1 text-[1rem] font-bold tracking-[0.08em] text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}
