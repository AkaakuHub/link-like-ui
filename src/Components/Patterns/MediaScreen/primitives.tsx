import type { ComponentPropsWithoutRef } from "react";

export function MediaScreenDivBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function MediaScreenButtonBase(
	props: ComponentPropsWithoutRef<"button">,
) {
	return <button {...props} />;
}

export function MediaScreenArticleBase(
	props: ComponentPropsWithoutRef<"article">,
) {
	return <article {...props} />;
}

export function MediaScreenImageBase({
	alt,
	...props
}: ComponentPropsWithoutRef<"img"> & {
	alt: string;
}) {
	return <img alt={alt} {...props} />;
}
