import type { SVGProps } from "react";

export function AudioIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M13 18.4902L8 14.3564V9.63281L13 5.5V18.4902Z"
				fill="currentColor"
			/>
			<rect x="4" y="9.5" width="3" height="5" fill="currentColor" />
			<rect
				x="14"
				y="10.207"
				width="1"
				height="6"
				transform="rotate(-45 14 10.207)"
				fill="currentColor"
			/>
			<rect
				x="18.2427"
				y="9.5"
				width="1"
				height="6"
				transform="rotate(45 18.2427 9.5)"
				fill="currentColor"
			/>
		</svg>
	);
}
