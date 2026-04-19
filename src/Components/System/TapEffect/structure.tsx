import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "../../../utils";
import {
	TapEffectLayerBase,
	TapEffectRingBase,
	TapEffectRootBase,
} from "./primitives";

export function TapEffectRoot({
	className,
	...props
}: ComponentPropsWithoutRef<typeof TapEffectRootBase>) {
	return (
		<TapEffectRootBase
			className={cn("relative h-full w-full overflow-visible", className)}
			{...props}
		/>
	);
}

export function TapEffectLayer({
	className,
	...props
}: ComponentPropsWithoutRef<typeof TapEffectLayerBase>) {
	return (
		<TapEffectLayerBase
			className={cn(
				"pointer-events-none fixed inset-0 z-2147483646 overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

export function TapEffectRing({
	className,
	size,
	style,
	...props
}: ComponentPropsWithoutRef<typeof TapEffectRingBase> & { size: number }) {
	const tapEffectStyle = {
		"--ll-tap-effect-size": `${size}px`,
		...style,
	} as CSSProperties;

	return (
		<TapEffectRingBase
			className={cn(
				"absolute block h-(--ll-tap-effect-size) w-(--ll-tap-effect-size) rounded-full",
				className,
			)}
			style={tapEffectStyle}
			{...props}
		/>
	);
}
