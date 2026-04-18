import type { SVGProps } from "react";
import AudioSvg from "./audio.svg";
import BackSvg from "./back.svg";
import HomeSvg from "./home.svg";

type SvgIconProps = SVGProps<SVGSVGElement>;

export const AudioIcon = (props: SvgIconProps) => (
	<AudioSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const BackIcon = (props: SvgIconProps) => (
	<BackSvg aria-hidden="true" height="24" width="24" {...props} />
);
export const HomeIcon = (props: SvgIconProps) => (
	<HomeSvg aria-hidden="true" height="24" width="24" {...props} />
);
