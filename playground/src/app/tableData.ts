export const detailTabValues = ["detail-01", "detail-02"] as const;
export type DetailTabValue = (typeof detailTabValues)[number];

export const detailTabs: Array<{ label: string; value: DetailTabValue }> = [
	{ label: "Tab A", value: "detail-01" },
	{ label: "Tab B", value: "detail-02" },
];

export const rarityRateRows: Array<{ rarity: string; ratio: string }> = [
	{ rarity: "VR", ratio: "3.00%" },
	{ rarity: "UR", ratio: "18.00%" },
	{ rarity: "R", ratio: "79.00%" },
];

export const cardRateRowsByTab: Record<
	DetailTabValue,
	Array<{ rarity: string; name: string; ratio: string }>
> = {
	"detail-01": [
		{ rarity: "VR", name: "Entry 01", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 02", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 03", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 04", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 05", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 06", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 07", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 08", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 09", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 10", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 11", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 12", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 13", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 14", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 15", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 16", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 17", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 18", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 19", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 20", ratio: "0.04%" },
	],
	"detail-02": [
		{ rarity: "VR", name: "Alt 01", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 02", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 03", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 04", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 05", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 06", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 07", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 08", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 09", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 10", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 11", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 12", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 13", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 14", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 15", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 16", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 17", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 18", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 19", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 20", ratio: "0.08%" },
	],
};

export function isDetailTabValue(value: string): value is DetailTabValue {
	return detailTabValues.some((tabValue) => tabValue === value);
}
