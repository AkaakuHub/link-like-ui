import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../utils";
import {
	SliderPrimitive,
	SliderRangePrimitive,
	SliderThumbPrimitive,
	SliderTrackPrimitive,
} from "./primitives";

interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive> {
	trackClassName?: string;
	thumbClassName?: string;
}

export const Slider = forwardRef<
	ElementRef<typeof SliderPrimitive>,
	SliderProps
>(({ className, thumbClassName, trackClassName, ...props }, ref) => {
	return (
		<SliderPrimitive
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className,
			)}
			{...props}
		>
			<SliderTrackPrimitive
				className={cn(
					"relative h-[0.34rem] grow overflow-hidden rounded-full bg-ll-slider-bg",
					trackClassName,
				)}
			>
				<SliderRangePrimitive className="ll-bg-system-gradient absolute h-full" />
			</SliderTrackPrimitive>
			<SliderThumbPrimitive
				className={cn(
					"ll-shadow-control block h-[1.35rem] w-[1.35rem] rounded-full border-none bg-ll-white transition-colors hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ll-label",
					thumbClassName,
				)}
			/>
		</SliderPrimitive>
	);
});

Slider.displayName = "Slider";
