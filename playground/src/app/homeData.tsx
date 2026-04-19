import { FaAward } from "react-icons/fa";
import { LuGift } from "react-icons/lu";
import { LuNotebook } from "react-icons/lu";
import { LuNewspaper } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import type { IconType } from "react-icons";

import type {
	HomeScreenBannerInput,
	HomeScreenMenuItemInput,
} from "../../../src/Components/Patterns/AppShell";
import { systemSubmenuDefinition, systemTileIllustration } from "./systemMenuData";

const homeBannerImageSrc = "/assets/images/600x150.png";

function createSingleIllustration(
	icon: IconType,
	title: string,
): NonNullable<HomeScreenMenuItemInput["illustration"]> {
	return {
		icon: {
			icon,
			title,
		},
		kind: "single",
	};
}

interface HomeMenuItemsOptions {
	onSoundOpen: () => void;
}

export function homeMenuItems({
	onSoundOpen,
}: HomeMenuItemsOptions): HomeScreenMenuItemInput[] {
	return [
		{
			label: "Mission",
			illustration: createSingleIllustration(FaAward, "Mission"),
		},
		{
			label: "Present",
			illustration: createSingleIllustration(LuGift, "Present"),
			badge: "7",
			pageId: "present",
		},
		{
			label: "Shop",
			illustration: createSingleIllustration(LuShoppingCart, "Shop"),
		},
		{
			label: "Collection",
			illustration: createSingleIllustration(LuNotebook, "Collection"),
		},
		{
			label: "Circle",
			illustration: createSingleIllustration(MdPeopleAlt, "Circle"),
		},
		{
			label: "News",
			illustration: createSingleIllustration(LuNewspaper, "News"),
			badge: "1",
		},
		{
			label: "Friend",
			illustration: createSingleIllustration(FaHandshake, "Friend"),
		},
		{
			illustration: systemTileIllustration,
			label: "System",
			submenu: systemSubmenuDefinition({
				onSoundOpen,
			}),
		},
	];
}

export const homeTopBanners: HomeScreenBannerInput[] = [
	{
		src: homeBannerImageSrc,
		alt: "Banner sample 01",
		badge: "New",
	},
	{
		src: homeBannerImageSrc,
		alt: "Banner sample 02",
	},
	{
		src: homeBannerImageSrc,
		alt: "Banner sample 03",
		badge: "New",
	},
	{
		src: homeBannerImageSrc,
		alt: "Banner sample 04",
	},
];
