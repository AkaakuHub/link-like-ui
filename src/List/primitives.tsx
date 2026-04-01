import type { ComponentPropsWithoutRef } from "react";

export function ListRootBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function ListItemsBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function ListCardBase(props: ComponentPropsWithoutRef<"article">) {
	return <article {...props} />;
}
