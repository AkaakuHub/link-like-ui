import type { ReactNode } from "react";
import { LayoutBatteryIndicator } from "./battery";
import type { LayoutClockState } from "./helpers";
import {
	LayoutClock,
	LayoutHeader,
	LayoutHeaderCluster,
	LayoutHeaderMeta,
} from "./structure";
import type { LayoutBatteryState } from "./useBatteryState";

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
					<LayoutHeaderMeta className="w-[2.55rem] text-[1rem] leading-none font-normal text-ll-gray/82 tabular-nums">
						{clock.timeLabel}
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
				<p className="text-[4.9rem] leading-[0.8] font-light tracking-[-0.1em]">
					{clock.hours}
				</p>
				<p className="mt-[-0.42rem] text-[4.9rem] leading-[0.8] font-light tracking-[-0.1em]">
					{clock.minutes}
				</p>
				<p className="mt-[0.1rem] pr-[0.15rem] text-[0.72rem] leading-none tracking-[0.18em] text-ll-white/72">
					{clock.dateLabel}
				</p>
			</LayoutClock>
		</>
	);
}
