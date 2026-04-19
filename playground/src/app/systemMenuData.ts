import { LuBriefcaseBusiness, LuMenu, LuSettings2, LuVolume2 } from "react-icons/lu";
import type { HomeScreenMenuItemInput } from "../../../src/Components/Patterns/AppShell";
import type { GradientIconClusterItems } from "../../../src/Components/System/Icon";

interface SystemSubmenuDefinition {
	items: readonly {
		icon: (typeof systemMenuIcons)[number];
		id: string;
		label: string;
	}[];
	title: string;
}

const systemMenuIcons = [
	{ icon: LuBriefcaseBusiness, title: "Item" },
	{ icon: LuVolume2, title: "Sound" },
	{ icon: LuSettings2, title: "Option" },
	{ icon: LuMenu, title: "Menu" },
] as const satisfies GradientIconClusterItems;

export const systemTileIllustration = {
	items: systemMenuIcons,
	kind: "cluster",
} as const satisfies NonNullable<HomeScreenMenuItemInput["illustration"]>;

export const systemSubmenuDefinition = {
	items: [
		{ icon: systemMenuIcons[0], id: "system-item", label: "Item" },
		{ icon: systemMenuIcons[1], id: "system-sound", label: "Sound" },
		{ icon: systemMenuIcons[2], id: "system-option", label: "Option" },
		{ icon: systemMenuIcons[3], id: "system-menu", label: "Menu" },
	],
	title: "System",
} as const satisfies SystemSubmenuDefinition;
