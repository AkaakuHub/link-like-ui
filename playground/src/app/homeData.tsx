import {
	LuBadgeCheck,
	LuCalendarDays,
	LuCircle,
	LuGift,
	LuLayoutGrid,
	LuNewspaper,
	LuShoppingCart,
	LuVolume2,
} from "react-icons/lu";
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
		icon: <GradientIcon icon={LuBadgeCheck} />,
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
		icon: <GradientIcon icon={LuLayoutGrid} />,
		rowSpan: 1,
	},
	{
		id: "tile-05",
		label: "Circle",
		colSpan: 1,
		icon: <GradientIcon icon={LuCircle} />,
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
		label: "Event",
		colSpan: 1,
		icon: <GradientIcon icon={LuCalendarDays} />,
		rowSpan: 1,
	},
	{
		id: "tile-08",
		label: "Sound",
		colSpan: 1,
		icon: <GradientIcon icon={LuVolume2} />,
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
