import type { ComponentPropsWithoutRef } from "react";

export function PresentPageRootBase(
	props: ComponentPropsWithoutRef<"section">,
) {
	return <section {...props} />;
}

export function PresentPageLayerBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}
