import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";

type TableCellAlign = "left" | "center" | "right";

const tableCellAlignClassMap: Record<TableCellAlign, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

export function TableRoot({
	className,
	...props
}: ComponentPropsWithoutRef<"table">) {
	return (
		<table
			className={cn("w-full border-collapse border border-ll-table", className)}
			{...props}
		/>
	);
}

export function TableHead({
	className,
	...props
}: ComponentPropsWithoutRef<"thead">) {
	return <thead className={cn("bg-ll-table", className)} {...props} />;
}

export function TableBody({
	className,
	...props
}: ComponentPropsWithoutRef<"tbody">) {
	return <tbody className={cn("", className)} {...props} />;
}

export function TableRow({
	className,
	...props
}: ComponentPropsWithoutRef<"tr">) {
	return <tr className={cn("", className)} {...props} />;
}

export function TableHeaderCell({
	className,
	align = "center",
	columnWidth,
	...props
}: ComponentPropsWithoutRef<"th"> & {
	align?: TableCellAlign;
	columnWidth?: string;
}) {
	return (
		<th
			className={cn(
				"relative border border-ll-table px-2 py-1 text-[0.76rem] leading-tight font-bold text-ll-white [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:top-1 [&:not(:first-child)]:before:bottom-1 [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-ll-white [&:not(:first-child)]:before:content-['']",
				tableCellAlignClassMap[align],
				className,
			)}
			style={columnWidth ? { width: columnWidth } : undefined}
			{...props}
		/>
	);
}

export function TableCell({
	className,
	align = "left",
	...props
}: ComponentPropsWithoutRef<"td"> & { align?: TableCellAlign }) {
	return (
		<td
			className={cn(
				"border border-ll-table px-2 py-[0.33rem] text-[0.72rem] leading-tight font-semibold text-ll-gray",
				tableCellAlignClassMap[align],
				className,
			)}
			{...props}
		/>
	);
}
