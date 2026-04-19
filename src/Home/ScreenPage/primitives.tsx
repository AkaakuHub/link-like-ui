import type { ComponentPropsWithoutRef } from "react";

export function ScreenPageRootBase(props: ComponentPropsWithoutRef<"section">) {
	return <section {...props} />;
}

export function ScreenPageLayerBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}
