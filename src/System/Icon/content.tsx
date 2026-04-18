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
	fitToSquare?: boolean;
	icon: IconType;
	paint?: GradientIconPaint;
	size?: number | string;
	svgClassName?: string;
	title?: string;
}

function parseViewBox(viewBox: string | undefined): {
	minX: number;
	minY: number;
	width: number;
	height: number;
} | null {
	if (!viewBox) {
		return null;
	}

	const parts = viewBox.trim().split(/\s+/);

	if (parts.length !== 4) {
		return null;
	}

	const minX = Number(parts[0]);
	const minY = Number(parts[1]);
	const width = Number(parts[2]);
	const height = Number(parts[3]);

	if (
		Number.isNaN(minX) ||
		Number.isNaN(minY) ||
		Number.isNaN(width) ||
		Number.isNaN(height) ||
		width <= 0 ||
		height <= 0
	) {
		return null;
	}

	return { minX, minY, width, height };
}

function resolveFittedViewBox(
	viewBox: string | undefined,
	fitToSquare: boolean,
): string | undefined {
	if (!fitToSquare) {
		return viewBox;
	}

	const parsed = parseViewBox(viewBox);

	if (!parsed) {
		return viewBox;
	}

	const side = Math.max(parsed.width, parsed.height);

	if (parsed.width === parsed.height) {
		return viewBox;
	}

	const nextMinX = parsed.minX - (side - parsed.width) / 2;
	const nextMinY = parsed.minY - (side - parsed.height) / 2;

	return `${nextMinX} ${nextMinY} ${side} ${side}`;
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
	fitToSquare = true,
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
	const fittedViewBox = resolveFittedViewBox(attr?.viewBox, fitToSquare);

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
				preserveAspectRatio="xMidYMid meet"
				stroke={
					resolvedPaint === "fill"
						? attr?.stroke
						: attr?.stroke === "none"
							? "none"
							: `url(#${gradientId})`
				}
				viewBox={fittedViewBox}
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
