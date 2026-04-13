export interface LayoutClockState {
	dateLabel: string;
	hours: string;
	minutes: string;
	timeLabel: string;
}

export function formatLocalClock(now: Date): LayoutClockState {
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "2-digit",
		weekday: "short",
	});
	const timeFormatter = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
	const parts = timeFormatter.formatToParts(now);
	const hours = parts.find((part) => part.type === "hour")?.value ?? "00";
	const minutes = parts.find((part) => part.type === "minute")?.value ?? "00";

	return {
		dateLabel: dateFormatter.format(now).replace(",", "").toUpperCase(),
		hours,
		minutes,
		timeLabel: `${hours}:${minutes}`,
	};
}
