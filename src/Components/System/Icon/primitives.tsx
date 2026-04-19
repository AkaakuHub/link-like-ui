import type { ReactElement, ReactNode, SVGProps } from "react";
import { Children, cloneElement, isValidElement } from "react";

type SvgElementProps = SVGProps<SVGElement> & {
	children?: ReactNode;
};

export type GradientIconPaint = "auto" | "fill" | "stroke";
export type ResolvedGradientIconPaint = "fill" | "stroke" | "both";

function isSvgElement(node: ReactNode): node is ReactElement<SvgElementProps> {
	return isValidElement<SvgElementProps>(node);
}

function resolveFill(
	value: string | undefined,
	gradientId: string,
	paint: ResolvedGradientIconPaint,
): string | undefined {
	if (paint === "both") {
		return value === "none" ? "none" : `url(#${gradientId})`;
	}

	if (paint === "fill") {
		return value === "none" ? "none" : `url(#${gradientId})`;
	}

	return value ?? "none";
}

function resolveStroke(
	value: string | undefined,
	gradientId: string,
	paint: ResolvedGradientIconPaint,
): string | undefined {
	if (paint === "both") {
		return value === "none" ? "none" : `url(#${gradientId})`;
	}

	if (paint === "fill") {
		return value;
	}

	return value === "none" ? "none" : `url(#${gradientId})`;
}

export function applyGradientToSvgTree(
	node: ReactNode,
	gradientId: string,
	paint: ResolvedGradientIconPaint,
): ReactNode {
	if (!isSvgElement(node)) {
		return node;
	}

	const nextChildren = Children.map(node.props.children, (child) =>
		applyGradientToSvgTree(child, gradientId, paint),
	);

	return cloneElement(node, {
		children: nextChildren,
		fill: resolveFill(node.props.fill, gradientId, paint),
		stroke: resolveStroke(node.props.stroke, gradientId, paint),
	});
}
