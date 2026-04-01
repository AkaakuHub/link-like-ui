import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils";
import { AudioIcon, Toggle } from "../Toggle";
import { Slider } from "./structure";

export interface SliderRowProps extends HTMLAttributes<HTMLDivElement> {
	label: string;
	value: number;
	onValueChange: (value: number) => void;
	leading?: ReactNode;
	min?: number;
	max?: number;
	step?: number;
	sliderThumbClassName?: string;
	sliderDisabled?: boolean;
}

export function SliderRow({
	className,
	label,
	value,
	onValueChange,
	leading,
	max = 100,
	min = 0,
	sliderDisabled = false,
	sliderThumbClassName,
	step = 1,
}: SliderRowProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-[4.5rem_2rem_1fr_2.25rem] items-center gap-3",
				className,
			)}
		>
			<p className="text-left text-[1rem] leading-none text-ll-gray">{label}</p>
			<div className="flex items-center justify-center">{leading}</div>
			<Slider
				value={[value]}
				onValueChange={(next) => {
					const [currentValue] = next;
					if (currentValue !== undefined) {
						onValueChange(currentValue);
					}
				}}
				max={max}
				min={min}
				step={step}
				disabled={sliderDisabled}
				aria-label={label}
				{...(sliderThumbClassName
					? { thumbClassName: sliderThumbClassName }
					: {})}
			/>
			<p className="text-left text-[1rem] leading-none text-ll-label">
				{value}
			</p>
		</div>
	);
}

export interface SliderToggleRowProps
	extends Omit<SliderRowProps, "leading" | "sliderThumbClassName"> {
	pressed: boolean;
	onPressedChange: (pressed: boolean) => void;
	toggleAriaLabel: string;
	icon?: ReactNode;
}

export function SliderToggleRow({
	icon,
	onPressedChange,
	pressed,
	toggleAriaLabel,
	...props
}: SliderToggleRowProps) {
	return (
		<SliderRow
			{...props}
			sliderDisabled={pressed}
			{...(pressed ? { sliderThumbClassName: "opacity-50" } : {})}
			leading={
				<Toggle
					pressed={pressed}
					onPressedChange={onPressedChange}
					aria-label={toggleAriaLabel}
				>
					{icon ?? <AudioIcon />}
				</Toggle>
			}
		/>
	);
}
