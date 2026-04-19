import { FaAward } from "react-icons/fa";
import { LuGift } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { LuNotebook } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";

import type {
	HomeScreenBannerInput,
	HomeScreenMenuItemInput,
} from "../../../src/Home/Layout";
import { GradientIcon } from "../../../src/System/Icon";

const homeBannerImageSrc = "/assets/images/600x150.png";

export const homeMenuItems: HomeScreenMenuItemInput[] = [
	{
		label: "Mission",
		icon: <GradientIcon icon={FaAward} />,
	},
	{
		label: "Present",
		icon: <GradientIcon icon={LuGift} />,
		badge: "7",
	},
	{
		label: "Shop",
		icon: <GradientIcon icon={LuShoppingCart} />,
	},
	{
		label: "Collection",
		icon: <GradientIcon icon={LuNotebook} />,
	},
	{
		label: "Circle",
		icon: <GradientIcon icon={MdPeopleAlt} />,
	},
	{
		label: "News",
		icon: <GradientIcon icon={LuNewspaper} />,
		badge: "1",
	},
	{
		label: "Friend",
		icon: <GradientIcon icon={FaHandshake} />,
	},
	{
		label: "Settings",
		icon: <GradientIcon icon={LuSettings} />,
	},
];

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
