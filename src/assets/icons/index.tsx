import type { SVGProps } from "react";
import AudioSvg from "./audio.svg";
import BackSvg from "./back.svg";
import BatterySvg from "./battery.svg";
import HomeSvg from "./home.svg";
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
export const MenuCloseIcon = (props: SvgIconProps) => (
	<MenuCloseSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const MenuOpenIcon = (props: SvgIconProps) => (
	<MenuOpenSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const PlusIcon = (props: SvgIconProps) => (
	<PlusSvg aria-hidden="true" height="24" width="24" {...props} />
);
