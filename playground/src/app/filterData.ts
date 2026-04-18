export const filterTopOptions = [
	{ label: "Choice 01", value: "choice-01" },
	{ label: "Choice 02", value: "choice-02" },
	{ label: "Choice 03", value: "choice-03" },
];

export const filterAfterOptions = [
	{ label: "None", value: "none" },
	{ label: "Has", value: "has" },
	{ label: "No", value: "no" },
];

export const performerRows = [
	{ key: "row-01", label: "Item 01" },
	{ key: "row-02", label: "Item 02" },
	{ key: "row-03", label: "Item 03" },
	{ key: "row-04", label: "Item 04" },
	{ key: "row-05", label: "Item 05" },
	{ key: "row-06", label: "Item 06" },
	{ key: "row-07", label: "Item 07" },
	{ key: "row-08", label: "Item 08" },
	{ key: "row-09", label: "Item 09" },
	{ key: "row-10", label: "Item 10" },
	{ key: "row-11", label: "Item 11" },
	{ key: "row-12", label: "Item 12" },
];

export function createInitialPerformerFilters(): Record<string, string> {
	const initialMap: Record<string, string> = {};

	for (const performer of performerRows) {
		initialMap[performer.key] = "all";
	}

	return initialMap;
}
