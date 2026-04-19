import { useId } from "react";
import type { LayoutBatteryState } from "./useBatteryState";

interface LayoutBatteryIndicatorProps {
	battery: LayoutBatteryState;
	className?: string;
}

const layoutBatterySegments = [
	{ x: 22, y: 24, width: 16, height: 32 },
	{ x: 42, y: 24, width: 16, height: 32 },
	{ x: 62, y: 24, width: 16, height: 32 },
	{ x: 82, y: 24, width: 16, height: 32 },
] as const;

function getBatterySegmentCount(level: number): number {
	return Math.min(
		Math.max(Math.ceil(level * layoutBatterySegments.length), 0),
		layoutBatterySegments.length,
	);
}

export function LayoutBatteryIndicator({
	battery,
	className,
}: LayoutBatteryIndicatorProps) {
	const gradientId = useId();
	const segmentCount = getBatterySegmentCount(battery.level);

	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			viewBox="0 0 128 80"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					id={gradientId}
					x1="22"
					x2="100"
					y1="40"
					y2="40"
				>
					<stop offset="0" stopColor="var(--color-ll-system-left)" />
					<stop offset="1" stopColor="var(--color-ll-system-right)" />
				</linearGradient>
			</defs>
			<rect
				fill="none"
				height="56"
				rx="14"
				stroke="var(--color-ll-disabled)"
				strokeWidth="4"
				width="100"
				x="12"
				y="12"
			/>
			<path
				d="M112 29C117.5 31 120 35.2 120 40C120 44.8 117.5 49 112 51V29Z"
				fill="var(--color-ll-disabled)"
			/>
			{battery.charging
				? null
				: layoutBatterySegments.map((segment, index) => (
						<rect
							fill={
								index < segmentCount
									? `url(#${gradientId})`
									: "var(--color-ll-tab-gray)"
							}
							height={segment.height}
							key={segment.x}
							rx="2"
							width={segment.width}
							x={segment.x}
							y={segment.y}
						/>
					))}
			{battery.charging ? (
				<>
					<path
						clipRule="evenodd"
						d="M7.7327 6.48215L9.259 4.89999H4.84259L4.84426 4.8971L4.83344 4.89955L6.58302 0.00388336L6.57927 0L2.2209 4.51786H2.21664L0.699997 6.09H5.10754L5.10587 6.09289L5.11669 6.09044L3.3643 10.994L3.37006 11L7.72843 6.48215H7.7327Z"
						fill="var(--color-ll-disabled)"
						fillRule="evenodd"
						stroke="var(--color-ll-white)"
						strokeLinejoin="round"
						strokeWidth="1.45"
						transform="translate(36 12) scale(5.5)"
					/>
					<path
						clipRule="evenodd"
						d="M7.7327 6.48215L9.259 4.89999H4.84259L4.84426 4.8971L4.83344 4.89955L6.58302 0.00388336L6.57927 0L2.2209 4.51786H2.21664L0.699997 6.09H5.10754L5.10587 6.09289L5.11669 6.09044L3.3643 10.994L3.37006 11L7.72843 6.48215H7.7327Z"
						fill="var(--color-ll-disabled)"
						fillRule="evenodd"
						transform="translate(36 12) scale(5.5)"
					/>
				</>
			) : null}
		</svg>
	);
}
