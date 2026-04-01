import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../utils";
import {
	SliderPrimitive,
	SliderRangePrimitive,
	SliderThumbPrimitive,
	SliderTrackPrimitive,
} from "./primitives";

interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive> {
	thumbClassName?: string;
}

export const Slider = forwardRef<
	ElementRef<typeof SliderPrimitive>,
	SliderProps
>(({ className, thumbClassName, ...props }, ref) => {
	return (
		<SliderPrimitive
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className,
			)}
			{...props}
		>
			<SliderTrackPrimitive className="relative h-[0.34rem] grow overflow-hidden rounded-full bg-ll-slider-bg">
				<SliderRangePrimitive className="absolute h-full bg-linear-to-r from-ll-system-left to-ll-system-right" />
			</SliderTrackPrimitive>
			<SliderThumbPrimitive
				className={cn(
					"block h-[1.35rem] w-[1.35rem] rounded-full border-none bg-ll-white shadow-[0_0_8px_color-mix(in_srgb,var(--color-ll-gray)_35%,transparent)] transition-colors hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ll-label",
					thumbClassName,
				)}
			/>
		</SliderPrimitive>
	);
});

Slider.displayName = "Slider";
