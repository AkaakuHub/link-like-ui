import type { HTMLAttributes, ReactElement, ReactNode, SVGProps } from "react";
import { useId } from "react";
import type { IconType } from "react-icons";
import { cn } from "../../utils";
import {
	applyGradientToSvgTree,
	type GradientIconPaint,
	type ResolvedGradientIconPaint,
} from "./primitives";
import { GradientIconRoot } from "./structure";

type IconBaseElementProps = {
	attr?: SVGProps<SVGSVGElement>;
	children?: ReactNode;
};

export interface GradientIconProps
	extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	icon: IconType;
	paint?: GradientIconPaint;
	size?: number | string;
	svgClassName?: string;
	title?: string;
}

function resolveGradientPaint(
	attr: SVGProps<SVGSVGElement> | undefined,
	paint: GradientIconPaint,
): ResolvedGradientIconPaint {
	if (paint !== "auto") {
		return paint;
	}

	const fill = attr?.fill;
	const stroke = attr?.stroke;
	const strokeWidth = attr?.strokeWidth;
	const isStrokeIcon = fill === "none" && stroke === "currentColor";
	const isFillIcon = strokeWidth === "0" || strokeWidth === 0;
	const isBothIcon =
		fill === "currentColor" && stroke === "currentColor" && !isFillIcon;

	if (isStrokeIcon) {
		return "stroke";
	}

	if (isFillIcon) {
		return "fill";
	}

	if (isBothIcon) {
		return "both";
	}

	if (stroke === "currentColor") {
		return "stroke";
	}

	return "fill";
}

export function GradientIcon({
	className,
	icon,
	paint = "auto",
	size = "100%",
	svgClassName,
	title,
	...props
}: GradientIconProps) {
	const gradientId = useId().replaceAll(":", "");
	const resolvedTitle = title ?? "Icon";
	const iconBaseElement = icon({}) as ReactElement<IconBaseElementProps> | null;

	if (iconBaseElement === null) {
		return null;
	}

	const resolvedPaint = resolveGradientPaint(iconBaseElement.props.attr, paint);
	const attr = iconBaseElement.props.attr;

	return (
		<GradientIconRoot
			aria-hidden={title ? undefined : true}
			className={className}
			{...props}
		>
			<svg
				{...attr}
				aria-hidden={title ? undefined : true}
				className={cn("h-full w-full", svgClassName)}
				fill={
					resolvedPaint === "stroke"
						? (attr?.fill ?? "none")
						: attr?.fill === "none"
							? "none"
							: `url(#${gradientId})`
				}
				focusable="false"
				height={size}
				stroke={
					resolvedPaint === "fill"
						? attr?.stroke
						: attr?.stroke === "none"
							? "none"
							: `url(#${gradientId})`
				}
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>{resolvedTitle}</title>
				<defs>
					<linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="100%">
						<stop offset="0%" stopColor="var(--color-ll-system-left)" />
						<stop offset="100%" stopColor="var(--color-ll-system-right)" />
					</linearGradient>
				</defs>
				{applyGradientToSvgTree(
					iconBaseElement.props.children,
					gradientId,
					resolvedPaint,
				)}
			</svg>
		</GradientIconRoot>
	);
}
