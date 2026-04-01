import type { ComponentPropsWithoutRef } from "react";

export function TableRootBase(props: ComponentPropsWithoutRef<"table">) {
	return <table {...props} />;
}

export function TableHeadBase(props: ComponentPropsWithoutRef<"thead">) {
	return <thead {...props} />;
}

export function TableBodyBase(props: ComponentPropsWithoutRef<"tbody">) {
	return <tbody {...props} />;
}

export function TableRowBase(props: ComponentPropsWithoutRef<"tr">) {
	return <tr {...props} />;
}

export function TableHeaderCellBase(props: ComponentPropsWithoutRef<"th">) {
	return <th {...props} />;
}

export function TableCellBase(props: ComponentPropsWithoutRef<"td">) {
	return <td {...props} />;
}
