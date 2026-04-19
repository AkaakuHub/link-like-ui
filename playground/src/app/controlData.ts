export const tabValues = ["tab-01", "tab-02", "tab-03", "tab-04", "tab-05"] as const;
export type ControlTabValue = (typeof tabValues)[number];

export const accountItems = ["Action 01", "Action 02", "Action 03", "Action 04"];
export const supportItems = [
	"Option 01",
	"Option 02",
	"Option 03",
	"Option 04",
	"Option 05",
	"Option 06",
];

export const tabLabels: Array<{ label: string; value: ControlTabValue }> = [
	{ label: "Tab 01", value: "tab-01" },
	{ label: "Tab 02", value: "tab-02" },
	{ label: "Tab 03", value: "tab-03" },
	{ label: "Tab 04", value: "tab-04" },
	{ label: "Tab 05", value: "tab-05" },
];

export const rowsByTab: Record<
	ControlTabValue,
	Array<{ id: string; label: string }>
> = {
	"tab-01": [
		{ id: "tab-01-row-01", label: "Row 01" },
		{ id: "tab-01-row-02", label: "Row 02" },
		{ id: "tab-01-row-03", label: "Row 03" },
		{ id: "tab-01-row-04", label: "Row 04" },
	],
	"tab-02": [
		{ id: "tab-02-row-01", label: "Row 01" },
		{ id: "tab-02-row-02", label: "Row 02" },
		{ id: "tab-02-row-03", label: "Row 03" },
		{ id: "tab-02-row-04", label: "Row 04" },
	],
	"tab-03": [
		{ id: "tab-03-row-01", label: "Row 01" },
		{ id: "tab-03-row-02", label: "Row 02" },
		{ id: "tab-03-row-03", label: "Row 03" },
		{ id: "tab-03-row-04", label: "Row 04" },
	],
	"tab-04": [
		{ id: "tab-04-row-01", label: "Row 01" },
		{ id: "tab-04-row-02", label: "Row 02" },
		{ id: "tab-04-row-03", label: "Row 03" },
		{ id: "tab-04-row-04", label: "Row 04" },
	],
	"tab-05": [
		{ id: "tab-05-row-01", label: "Row 01" },
		{ id: "tab-05-row-02", label: "Row 02" },
		{ id: "tab-05-row-03", label: "Row 03" },
		{ id: "tab-05-row-04", label: "Row 04" },
	],
};

export function isControlTabValue(value: string): value is ControlTabValue {
	return tabValues.some((tabValue) => tabValue === value);
}

export function createInitialMap(
	initialValue: number,
): Record<string, number> {
	const initialMap: Record<string, number> = { master: initialValue };

	for (const rowGroup of Object.values(rowsByTab)) {
		for (const row of rowGroup) {
			initialMap[row.id] = initialValue;
		}
	}

	return initialMap;
}

export function createInitialToggleMap(): Record<string, boolean> {
	const initialMap: Record<string, boolean> = { master: false };

	for (const rowGroup of Object.values(rowsByTab)) {
		for (const row of rowGroup) {
			initialMap[row.id] = false;
		}
	}

	return initialMap;
}
