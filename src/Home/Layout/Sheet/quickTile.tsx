import { GradientIcon, GradientIconCluster } from "../../../System/Icon";
import { cn } from "../../../utils";
import { LayoutTileBadge } from "../Badge";
import type { LayoutTileIllustrationDefinition } from "../content";
import { LayoutTile, type LayoutTileProps } from "./structure";

export interface LayoutQuickTileProps
	extends Omit<LayoutTileProps, "children"> {
	badge?: string;
	clusterClassName?: string;
	clusterIconClassName?: string;
	clusterItemClassName?: string;
	contentClassName?: string;
	hideLabel?: boolean;
	illustrationFrameClassName?: string;
	illustration?: LayoutTileIllustrationDefinition;
	label: string;
}

function TileIllustration({
	clusterClassName,
	clusterIconClassName,
	clusterItemClassName,
	illustration,
}: {
	clusterClassName?: string;
	clusterIconClassName?: string;
	clusterItemClassName?: string;
	illustration: LayoutTileIllustrationDefinition;
}) {
	if (illustration.kind === "single") {
		return (
			<GradientIcon
				className="h-full w-full"
				icon={illustration.icon.icon}
				title={illustration.icon.title}
				{...(illustration.icon.fitToSquare !== undefined
					? { fitToSquare: illustration.icon.fitToSquare }
					: {})}
				{...(illustration.icon.paint !== undefined
					? { paint: illustration.icon.paint }
					: {})}
			/>
		);
	}

	return (
		<GradientIconCluster
			items={illustration.items}
			{...(clusterClassName ? { className: clusterClassName } : {})}
			{...(clusterIconClassName ? { iconClassName: clusterIconClassName } : {})}
			{...(clusterItemClassName ? { itemClassName: clusterItemClassName } : {})}
		/>
	);
}

export function LayoutQuickTile({
	badge,
	className,
	clusterClassName,
	clusterIconClassName,
	clusterItemClassName,
	contentClassName,
	hideLabel = false,
	illustrationFrameClassName,
	illustration,
	label,
	...props
}: LayoutQuickTileProps) {
	return (
		<LayoutTile
			className={cn(
				"aspect-square min-h-0 w-[calc(100%-0.08rem)] justify-self-center self-center p-1 text-center",
				className,
			)}
			{...props}
		>
			{badge ? (
				<LayoutTileBadge
					className="absolute -top-1 -right-1 z-10"
					variant="circle"
				>
					{badge}
				</LayoutTileBadge>
			) : null}
			<div
				className={cn(
					"flex h-full min-h-0 w-full flex-col items-center justify-center gap-(--ll-home-tile-stack-gap)",
					contentClassName,
				)}
			>
				{illustration ? (
					<div className="grid min-h-0 place-items-center text-ll-label">
						<div
							className={cn(
								"grid h-(--ll-home-tile-icon-size) w-(--ll-home-tile-icon-size) place-items-center",
								illustrationFrameClassName,
							)}
						>
							<TileIllustration
								illustration={illustration}
								{...(clusterClassName ? { clusterClassName } : {})}
								{...(clusterIconClassName ? { clusterIconClassName } : {})}
								{...(clusterItemClassName ? { clusterItemClassName } : {})}
							/>
						</div>
					</div>
				) : null}
				{hideLabel ? null : (
					<div className="mt-[0.08rem] w-full min-w-0 overflow-x-hidden overflow-y-visible px-[0.01rem] pb-[0.02rem]">
						<p className="block overflow-visible text-center whitespace-nowrap bg-linear-to-r from-ll-system-left to-ll-system-right bg-clip-text text-[0.86rem] leading-[1.18] font-medium text-transparent text-ellipsis max-[420px]:text-[0.78rem] max-[380px]:text-[0.7rem] max-[360px]:text-[0.63rem]">
							<span className="inline-block max-w-full overflow-hidden align-top text-ellipsis whitespace-nowrap pb-[0.08rem]">
								{label}
							</span>
						</p>
					</div>
				)}
			</div>
		</LayoutTile>
	);
}
