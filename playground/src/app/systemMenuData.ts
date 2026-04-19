import {
	LuBriefcaseBusiness,
	LuMenu,
	LuSettings2,
	LuVolume2,
} from "react-icons/lu";
import type {
	HomeScreenMenuItemInput,
	LayoutTileClusterItemDefinition,
	LayoutTileSubmenuDefinition,
	LayoutTileSubmenuItemDefinition,
} from "../../../src/Components/Patterns/AppShell";

type SystemMenuBaseItem = Readonly<{
	disabledState?: LayoutTileClusterItemDefinition["disabledState"];
	icon: {
		icon: typeof LuBriefcaseBusiness;
		title: "Item" | "Menu" | "Option" | "Sound";
	};
	id: string;
	label: string;
}>;

const baseSystemMenuItems = [
	{
		disabledState: "not-implemented",
		icon: { icon: LuBriefcaseBusiness, title: "Item" },
		id: "system-item",
		label: "Item",
	},
	{
		disabledState: undefined,
		icon: { icon: LuVolume2, title: "Sound" },
		id: "system-sound",
		label: "Sound",
	},
	{
		disabledState: "not-implemented",
		icon: { icon: LuSettings2, title: "Option" },
		id: "system-option",
		label: "Option",
	},
	{
		disabledState: "not-implemented",
		icon: { icon: LuMenu, title: "Menu" },
		id: "system-menu",
		label: "Menu",
	},
] as const satisfies readonly [
	SystemMenuBaseItem,
	SystemMenuBaseItem,
	SystemMenuBaseItem,
	SystemMenuBaseItem,
];

function toClusterItem(
	item: (typeof baseSystemMenuItems)[number],
): LayoutTileClusterItemDefinition {
	return {
		disabledState: item.disabledState,
		icon: item.icon.icon,
		title: item.icon.title,
	};
}

function toClusterItems(
	items: typeof baseSystemMenuItems,
): readonly [
	LayoutTileClusterItemDefinition,
	LayoutTileClusterItemDefinition,
	LayoutTileClusterItemDefinition,
	LayoutTileClusterItemDefinition,
] {
	return [
		toClusterItem(items[0]),
		toClusterItem(items[1]),
		toClusterItem(items[2]),
		toClusterItem(items[3]),
	];
}

function toSubmenuItem(
	item: (typeof baseSystemMenuItems)[number],
	onSoundOpen: () => void,
): LayoutTileSubmenuItemDefinition {
	return {
		disabledState: item.disabledState,
		icon: item.icon,
		id: item.id,
		label: item.label,
		onClick:
			item.id === "system-sound"
				? () => {
						onSoundOpen();
					}
				: undefined,
	};
}

export const systemTileIllustration = {
	items: toClusterItems(baseSystemMenuItems),
	kind: "cluster",
} as const satisfies NonNullable<HomeScreenMenuItemInput["illustration"]>;

interface SystemSubmenuDefinitionOptions {
	onSoundOpen: () => void;
}

export function systemSubmenuDefinition({
	onSoundOpen,
}: SystemSubmenuDefinitionOptions): LayoutTileSubmenuDefinition {
	return {
		items: baseSystemMenuItems.map((item) => toSubmenuItem(item, onSoundOpen)),
		title: "System",
	};
}
