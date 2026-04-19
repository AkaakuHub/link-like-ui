import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils";
import {
	TableBodyBase,
	TableCellBase,
	TableHeadBase,
	TableHeaderCellBase,
	TableRootBase,
	TableRowBase,
} from "./primitives";

type TableCellAlign = "left" | "center" | "right";

const tableCellAlignClassMap: Record<TableCellAlign, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

export function TableRoot({
	className,
	...props
}: ComponentPropsWithoutRef<typeof TableRootBase>) {
	return (
		<TableRootBase
			className={cn("w-full border-collapse border border-ll-table", className)}
			{...props}
		/>
	);
}

export function TableHead({
	className,
	...props
}: ComponentPropsWithoutRef<typeof TableHeadBase>) {
	return <TableHeadBase className={cn("bg-ll-table", className)} {...props} />;
}

export function TableBody({
	className,
	...props
}: ComponentPropsWithoutRef<typeof TableBodyBase>) {
	return <TableBodyBase className={className} {...props} />;
}

export function TableRow({
	className,
	...props
}: ComponentPropsWithoutRef<typeof TableRowBase>) {
	return <TableRowBase className={className} {...props} />;
}

export function TableHeaderCell({
	className,
	align = "center",
	columnWidth,
	...props
}: ComponentPropsWithoutRef<typeof TableHeaderCellBase> & {
	align?: TableCellAlign;
	columnWidth?: string;
}) {
	return (
		<TableHeaderCellBase
			className={cn(
				"relative border border-ll-table px-2 py-1 text-[0.76rem] leading-tight font-bold text-ll-white not-first:before:absolute not-first:before:top-1 not-first:before:bottom-1 not-first:before:left-0 not-first:before:w-px not-first:before:bg-ll-white not-first:before:content-['']",
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
}: ComponentPropsWithoutRef<typeof TableCellBase> & {
	align?: TableCellAlign;
}) {
	return (
		<TableCellBase
			className={cn(
				"border border-ll-table px-2 py-[0.33rem] text-[0.72rem] leading-tight font-semibold text-ll-gray",
				tableCellAlignClassMap[align],
				className,
			)}
			{...props}
		/>
	);
}
