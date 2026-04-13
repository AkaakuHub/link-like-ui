import type { ButtonHTMLAttributes } from "react";
import { PlusIcon } from "../../assets/icons";
import { LayoutBatteryIndicator } from "./battery";
import type { LayoutClockState } from "./helpers";
import {
	LayoutClock,
	LayoutGlassPanel,
	LayoutHeader,
	LayoutHeaderCluster,
	LayoutHeaderCounter,
	LayoutHeaderMeta,
	LayoutHeaderPrimary,
	LayoutRoundButton,
} from "./structure";
import type { LayoutBatteryState } from "./use-battery-state";

interface HomeLayoutHeaderProps {
	battery: LayoutBatteryState;
	clock: LayoutClockState;
	dayHeading: string;
	dayLabel: string;
	nameHeading: string;
	name: string;
	resourceCount: number;
	onAddClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export function HomeLayoutHeader({
	battery,
	clock,
	dayHeading,
	dayLabel,
	nameHeading,
	name,
	resourceCount,
	onAddClick,
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
				<LayoutGlassPanel className="pointer-events-auto absolute left-1/2 top-[0.55rem] flex h-[2.1rem] w-[9.65rem] -translate-x-1/2 items-center gap-[0.45rem] rounded-[0.7rem] px-[0.42rem] py-[0.18rem]">
					<div className="grid h-[1.45rem] w-[1.45rem] place-items-center rounded-[0.3rem] bg-linear-to-b from-ll-system-left to-ll-system-right text-ll-white">
						<div className="relative h-[0.78rem] w-[0.78rem]">
							<span className="absolute left-0 top-0 h-[0.78rem] w-[0.08rem] rounded-full bg-current/95" />
							<span className="absolute left-[0.24rem] top-[0.16rem] h-[0.46rem] w-[0.08rem] rounded-full bg-current/95" />
							<span className="absolute left-[0.48rem] top-[0.06rem] h-[0.64rem] w-[0.08rem] rounded-full bg-current/95" />
							<span className="absolute right-0 top-[0.2rem] h-[0.38rem] w-[0.08rem] rounded-full bg-current/95" />
						</div>
					</div>
					<div className="space-y-[0.02rem]">
						<LayoutHeaderMeta className="text-[0.35rem] leading-none tracking-[0.02em] text-ll-system-right/78">
							{dayHeading}
						</LayoutHeaderMeta>
						<LayoutHeaderPrimary className="text-[0.92rem] leading-none font-normal text-ll-gray/92">
							{dayLabel}
						</LayoutHeaderPrimary>
					</div>
					<div className="space-y-[0.02rem] pl-[0.16rem]">
						<LayoutHeaderMeta className="text-[0.35rem] leading-none tracking-[0.02em] text-ll-system-right/78">
							{nameHeading}
						</LayoutHeaderMeta>
						<LayoutHeaderPrimary className="text-[0.95rem] leading-none font-semibold text-ll-gray/92">
							{name}
						</LayoutHeaderPrimary>
					</div>
				</LayoutGlassPanel>
				<LayoutHeaderCluster className="relative z-10 items-start gap-[0.22rem] pt-[0.1rem]">
					<LayoutHeaderCounter className="min-w-0 border-none bg-transparent px-0 py-0 text-[0.92rem] shadow-none">
						{resourceCount}
					</LayoutHeaderCounter>
					<LayoutRoundButton
						aria-label="Add"
						className="h-[2rem] w-[2rem] rounded-full border border-ll-disabled/12 bg-ll-white text-[0.95rem] text-ll-system-right/74 shadow-[0_1px_4px_color-mix(in_srgb,var(--color-ll-gray)_7%,transparent)]"
						onClick={onAddClick}
					>
						<PlusIcon className="h-[0.82rem] w-[0.82rem]" />
					</LayoutRoundButton>
				</LayoutHeaderCluster>
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
