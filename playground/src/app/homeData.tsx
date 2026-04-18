import { FaAward } from "react-icons/fa";
import { LuGift } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { LuNotebook } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";

import type {
	LayoutBannerDefinition,
	LayoutTileDefinition,
} from "../../../src/Home/Layout";
import { GradientIcon } from "../../../src/System/Icon";
import homeBannerImage from "../../assets/images/600x150.png";

export const homeMenuTiles: LayoutTileDefinition[] = [
	{
		id: "tile-01",
		label: "Mission",
		colSpan: 1,
		icon: <GradientIcon icon={FaAward} />,
		rowSpan: 1,
	},
	{
		id: "tile-02",
		label: "Present",
		colSpan: 1,
		icon: <GradientIcon icon={LuGift} />,
		rowSpan: 1,
		badge: "7",
	},
	{
		id: "tile-03",
		label: "Shop",
		colSpan: 1,
		icon: <GradientIcon icon={LuShoppingCart} />,
		rowSpan: 1,
	},
	{
		id: "tile-04",
		label: "Collection",
		colSpan: 1,
		icon: <GradientIcon icon={LuNotebook} />,
		rowSpan: 1,
	},
	{
		id: "tile-05",
		label: "Circle",
		colSpan: 1,
		icon: <GradientIcon icon={MdPeopleAlt} />,
		rowSpan: 1,
	},
	{
		id: "tile-06",
		label: "News",
		colSpan: 1,
		icon: <GradientIcon icon={LuNewspaper} />,
		rowSpan: 1,
		badge: "1",
	},
	{
		id: "tile-07",
		label: "Friend",
		colSpan: 1,
		icon: <GradientIcon icon={FaHandshake} />,
		rowSpan: 1,
	},
	{
		id: "tile-08",
		label: "Settings",
		colSpan: 1,
		icon: <GradientIcon icon={LuSettings} />,
		rowSpan: 1,
	},
];

export const homeTopBanners: LayoutBannerDefinition[] = [
	{
		id: "banner-01",
		src: homeBannerImage,
		alt: "Banner sample 01",
		badge: "New",
	},
	{
		id: "banner-02",
		src: homeBannerImage,
		alt: "Banner sample 02",
	},
	{
		id: "banner-03",
		src: homeBannerImage,
		alt: "Banner sample 03",
		badge: "New",
	},
	{
		id: "banner-04",
		src: homeBannerImage,
		alt: "Banner sample 04",
	},
];
