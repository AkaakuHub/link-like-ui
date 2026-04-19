import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../../../utils";
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
						"flex h-[6.2rem] items-center justify-center text-[7.5rem] leading-none font-extralight text-ll-white",
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
				"grid w-[2.34rem] grid-cols-[0.55rem_0.55rem_0.4rem_0.55rem_0.55rem] items-center justify-items-center text-[1rem] leading-none font-normal text-ll-gray/82 tabular-nums",
				clockTextClassName(),
			)}
		>
			{timeParts.map((part) => {
				if (part.value === ":") {
					return (
						<span
							key={part.key}
							className="relative -top-[0.03rem] left-[0.06rem] w-[0.4rem] text-center tracking-0"
						>
							{part.value}
						</span>
					);
				}

				return (
					<span
						key={part.key}
						className="w-[0.55rem] text-center tracking-[-0.01em]"
					>
						{part.value}
					</span>
				);
			})}
		</div>
	);
}

interface HomeLayoutHeaderProps {
	battery: LayoutBatteryState;
	centerContent?: ReactNode;
	clock: LayoutClockState;
	rightContent?: ReactNode;
	showClock?: boolean;
}

export function HomeLayoutHeader({
	battery,
	centerContent,
	clock,
	rightContent,
	showClock = true,
}: HomeLayoutHeaderProps) {
	return (
		<>
			<LayoutHeader>
				<LayoutHeaderCluster className="relative z-10 h-[2.1rem] items-center gap-1.5">
					<LayoutHeaderMeta>
						<ClockTimeLabel hours={clock.hours} minutes={clock.minutes} />
					</LayoutHeaderMeta>
					<LayoutBatteryIndicator battery={battery} className="h-5 w-8" />
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
			{showClock ? (
				<LayoutClock>
					<div className="w-[9.7rem]">
						<ClockDigitRow value={clock.hours} />
						<div className="mt-2">
							<ClockDigitRow value={clock.minutes} />
						</div>
						<p
							className={cn(
								"mt-2 block w-full whitespace-nowrap text-center text-[1.44rem] leading-none font-normal tracking-widest text-ll-white/78",
								clockTextClassName(),
							)}
						>
							{clock.dateLabel}
						</p>
					</div>
				</LayoutClock>
			) : null}
		</>
	);
}
