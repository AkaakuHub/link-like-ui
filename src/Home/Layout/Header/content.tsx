import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../../utils";
import { LayoutBatteryIndicator } from "./battery";
import type { LayoutClockState } from "./helpers";
import {
	LayoutClock,
	LayoutHeader,
	LayoutHeaderCluster,
	LayoutHeaderMeta,
} from "./structure";
import type { LayoutBatteryState } from "./useBatteryState";

interface ClockDigitRowProps {
	value: string;
}

const clockTextClassName = tv({
	base: '[font-family:"Poppins","Segoe_UI",sans-serif] [text-shadow:0_0_6px_color-mix(in_srgb,var(--color-ll-gray)_40%,transparent)]',
});

function ClockDigitRow({ value }: ClockDigitRowProps) {
	const digitEntries = [
		{ key: "tens", value: value[0] ?? "" },
		{ key: "ones", value: value[1] ?? "" },
	];

	return (
		<div className="grid w-full grid-cols-2 gap-[0.08rem]">
			{digitEntries.map((digitEntry) => (
				<span
					key={digitEntry.key}
					className={cn(
						"flex h-[6.2rem] items-center justify-center text-[7.5rem] leading-[1] font-extralight text-ll-white",
						clockTextClassName(),
					)}
				>
					{digitEntry.value}
				</span>
			))}
		</div>
	);
}

function ClockTimeLabel({
	hours,
	minutes,
}: Pick<LayoutClockState, "hours" | "minutes">) {
	const timeParts = [
		{ key: "hourTens", value: hours[0] ?? "" },
		{ key: "hourOnes", value: hours[1] ?? "" },
		{ key: "separator", value: ":" },
		{ key: "minuteTens", value: minutes[0] ?? "" },
		{ key: "minuteOnes", value: minutes[1] ?? "" },
	];

	return (
		<div
			className={cn(
				"grid w-[2.55rem] grid-cols-[1fr_1fr_auto_1fr_1fr] items-center justify-items-center text-[1rem] leading-none font-normal text-ll-gray/82",
				clockTextClassName(),
			)}
		>
			{timeParts.map((part) => (
				<span
					key={part.key}
					className={part.value === ":" ? "w-[0.24rem]" : "w-[0.52rem]"}
				>
					{part.value}
				</span>
			))}
		</div>
	);
}

interface HomeLayoutHeaderProps {
	battery: LayoutBatteryState;
	centerContent?: ReactNode;
	clock: LayoutClockState;
	rightContent?: ReactNode;
}

export function HomeLayoutHeader({
	battery,
	centerContent,
	clock,
	rightContent,
}: HomeLayoutHeaderProps) {
	return (
		<>
			<LayoutHeader>
				<LayoutHeaderCluster className="relative z-10 h-[2.1rem] items-center gap-1.5">
					<LayoutHeaderMeta>
						<ClockTimeLabel hours={clock.hours} minutes={clock.minutes} />
					</LayoutHeaderMeta>
					<LayoutBatteryIndicator
						battery={battery}
						className="h-[1.25rem] w-[2rem]"
					/>
				</LayoutHeaderCluster>
				{centerContent ? (
					<div className="pointer-events-auto absolute left-1/2 top-[0.55rem] -translate-x-1/2">
						{centerContent}
					</div>
				) : null}
				{rightContent ? (
					<div className="pointer-events-auto relative z-10">
						{rightContent}
					</div>
				) : null}
			</LayoutHeader>
			<LayoutClock>
				<div className="w-[9rem]">
					<ClockDigitRow value={clock.hours} />
					<div className="mt-[0.5rem]">
						<ClockDigitRow value={clock.minutes} />
					</div>
					<p
						className={cn(
							"mt-[0.5rem] block w-full text-center text-[1.44rem] leading-none font-normal tracking-[0.12em] text-ll-white/78",
							clockTextClassName(),
						)}
					>
						{clock.dateLabel}
					</p>
				</div>
			</LayoutClock>
		</>
	);
}
