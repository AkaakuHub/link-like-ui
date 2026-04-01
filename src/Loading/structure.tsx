import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";
import { LoadingContentBase, LoadingRootBase } from "./primitives";

const loadingTextOutlineWidthPx = 6;
const loadingTextOutlineColorVar = "--color-ll-loading-border";

export function LoadingRoot({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LoadingRootBase>) {
	return (
		<LoadingRootBase
			className={cn(
				"pointer-events-none fixed inset-0 z-[2147483647] grid place-items-center",
				className,
			)}
			{...props}
		/>
	);
}

export function LoadingContent({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LoadingContentBase>) {
	return (
		<LoadingContentBase
			className={cn("grid place-items-center gap-10", className)}
			{...props}
		/>
	);
}

export function LoadingText({
	className,
	style,
	...props
}: ComponentPropsWithoutRef<"p">) {
	return (
		<svg
			aria-label={props.children as string}
			role="img"
			className={cn("block h-[2.2rem] w-[15rem] overflow-visible", className)}
			style={style}
		>
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="central"
				fill="var(--color-ll-white)"
				stroke={`var(${loadingTextOutlineColorVar})`}
				strokeWidth={loadingTextOutlineWidthPx}
				strokeLinejoin="round"
				paintOrder="stroke fill"
				fontFamily="Poppins, Segoe UI, sans-serif"
				fontWeight="400"
				fontSize="32"
			>
				{props.children}
			</text>
		</svg>
	);
}

export function LoadingSpinner({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	const dotPositions = [
		{ x: 0, y: -2.2 },
		{ x: 1.56, y: -1.56 },
		{ x: 2.2, y: 0 },
		{ x: 1.56, y: 1.56 },
		{ x: 0, y: 2.2 },
		{ x: -1.56, y: 1.56 },
		{ x: -2.2, y: 0 },
		{ x: -1.56, y: -1.56 },
	] as const;

	return (
		<div className={cn("relative h-20 w-20", className)} {...props}>
			<svg
				viewBox="0 0 26 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				className="absolute top-1/2 left-1/2 h-[1.7rem] w-[1.7rem] -translate-x-1/2 -translate-y-1/2"
			>
				<path
					d="M12.0249 1.55713C12.3918 0.814409 13.4509 0.814405 13.8179 1.55713L16.2612 6.5083C16.6982 7.39363 17.543 8.00782 18.52 8.1499L23.9839 8.94385C24.804 9.06301 25.1317 10.0703 24.5386 10.6489L20.5845 14.5034C19.8776 15.1926 19.5553 16.1857 19.7222 17.1587L20.6558 22.6001C20.7958 23.4168 19.9381 24.0401 19.2046 23.6548L14.3179 21.0854C13.4439 20.626 12.3989 20.626 11.5249 21.0854L6.63818 23.6548C5.90465 24.0401 5.04695 23.4169 5.18701 22.6001L6.12061 17.1587C6.28749 16.1857 5.96513 15.1926 5.2583 14.5034L1.3042 10.6489C0.71104 10.0704 1.03878 9.06302 1.85889 8.94385L7.32275 8.1499C8.29974 8.00782 9.14461 7.39363 9.58154 6.5083L12.0249 1.55713Z"
					fill={`var(--color-ll-white)`}
					stroke={`var(${loadingTextOutlineColorVar})`}
					strokeWidth="2"
				/>
			</svg>
			{dotPositions.map((position, index) => (
				<span
					key={`loading-dot-${position.x}-${position.y}`}
					className="absolute top-1/2 left-1/2 h-4 w-4 rounded-full border-2 border-ll-loading-border bg-ll-white animate-[ll-loading-dot_1.2s_linear_infinite]"
					style={{
						animationDelay: `${index * 0.15}s`,
						transform: `translate(calc(-50% + ${position.x}rem), calc(-50% + ${position.y}rem))`,
					}}
				/>
			))}
		</div>
	);
}
