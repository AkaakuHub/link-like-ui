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
	const dateParts = dateFormatter.formatToParts(now);
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const month = dateParts.find((part) => part.type === "month")?.value ?? "00";
	const day = dateParts.find((part) => part.type === "day")?.value ?? "00";
	const weekday =
		dateParts.find((part) => part.type === "weekday")?.value.toUpperCase() ??
		"---";

	return {
		dateLabel: `${month}/${day} ${weekday}`,
		hours,
		minutes,
		timeLabel: `${hours}:${minutes}`,
	};
}
