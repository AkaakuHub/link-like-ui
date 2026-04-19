import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";

export function LayoutRootBase(props: ComponentPropsWithoutRef<"section">) {
	return <section {...props} />;
}

export function LayoutLayerBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function LayoutPanelBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function LayoutGridBase(props: HTMLAttributes<HTMLDivElement>) {
	return <div {...props} />;
}

export function LayoutButtonBase(
	props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
	return <button type={props.type ?? "button"} {...props} />;
}
