import type { ComponentPropsWithoutRef } from "react";

export function ScreenCardListBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function ScreenCardListItemBase(
	props: ComponentPropsWithoutRef<"article">,
) {
	return <article {...props} />;
}
