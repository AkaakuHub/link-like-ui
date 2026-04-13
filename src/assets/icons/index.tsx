import type { SVGProps } from "react";
import AudioSvg from "./audio.svg";
import BackSvg from "./back.svg";
import BatterySvg from "./battery.svg";
import HomeSvg from "./home.svg";
import HomeMenuCircleSvg from "./homeMenu/circle.svg";
import HomeMenuCollectionSvg from "./homeMenu/collection.svg";
import HomeMenuEventSvg from "./homeMenu/event.svg";
import HomeMenuMissionSvg from "./homeMenu/mission.svg";
import HomeMenuNewsSvg from "./homeMenu/news.svg";
import HomeMenuPresentSvg from "./homeMenu/present.svg";
import HomeMenuShopSvg from "./homeMenu/shop.svg";
import HomeMenuSoundSvg from "./homeMenu/sound.svg";
import MenuCloseSvg from "./menu-close.svg";
import MenuOpenSvg from "./menu-open.svg";
import PlusSvg from "./plus.svg";

type SvgIconProps = SVGProps<SVGSVGElement>;

export const AudioIcon = (props: SvgIconProps) => (
	<AudioSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const BackIcon = (props: SvgIconProps) => (
	<BackSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const BatteryIcon = (props: SvgIconProps) => (
	<BatterySvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeIcon = (props: SvgIconProps) => (
	<HomeSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuCircleIcon = (props: SvgIconProps) => (
	<HomeMenuCircleSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuCollectionIcon = (props: SvgIconProps) => (
	<HomeMenuCollectionSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuEventIcon = (props: SvgIconProps) => (
	<HomeMenuEventSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuMissionIcon = (props: SvgIconProps) => (
	<HomeMenuMissionSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuNewsIcon = (props: SvgIconProps) => (
	<HomeMenuNewsSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuPresentIcon = (props: SvgIconProps) => (
	<HomeMenuPresentSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuShopIcon = (props: SvgIconProps) => (
	<HomeMenuShopSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeMenuSoundIcon = (props: SvgIconProps) => (
	<HomeMenuSoundSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const MenuCloseIcon = (props: SvgIconProps) => (
	<MenuCloseSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const MenuOpenIcon = (props: SvgIconProps) => (
	<MenuOpenSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const PlusIcon = (props: SvgIconProps) => (
	<PlusSvg aria-hidden="true" height="24" width="24" {...props} />
);
