import type { ComponentPropsWithoutRef } from "react";

export function WithMeetsDivBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function WithMeetsButtonBase(props: ComponentPropsWithoutRef<"button">) {
	return <button {...props} />;
}

export function WithMeetsImageBase({
	alt,
	...props
}: ComponentPropsWithoutRef<"img"> & {
	alt: string;
}) {
	return <img alt={alt} {...props} />;
}
