import type { ComponentPropsWithoutRef } from "react";

export function TapEffectRootBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function TapEffectLayerBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function TapEffectRingBase(props: ComponentPropsWithoutRef<"span">) {
	return <span {...props} />;
}
