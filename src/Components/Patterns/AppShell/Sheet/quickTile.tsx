import { LockIconIcon } from "../../../../assets/icons";
import { cn } from "../../../../utils";
import { GradientIcon } from "../../../System/Icon";
import { LayoutTileBadge } from "../Badge";
import type {
	LayoutTileClusterItemDefinition,
	LayoutTileIllustrationDefinition,
} from "../content";
import type { LayoutTileDisabledState } from "./structure";
import { LayoutTile, type LayoutTileProps } from "./structure";

export interface LayoutQuickTileProps
	extends Omit<LayoutTileProps, "children"> {
	badge?: string;
	clusterClassName?: string;
	clusterIconClassName?: string;
	clusterItemClassName?: string;
	contentClassName?: string;
	disabledState?: LayoutTileDisabledState;
	hideLabel?: boolean;
	illustrationFrameClassName?: string;
	illustration?: LayoutTileIllustrationDefinition;
	label: string;
}

function DisabledOverlay({
	className,
	disabledState,
	size,
}: {
	className?: string;
	disabledState: LayoutTileDisabledState;
	size: "cluster" | "default";
}) {
	if (disabledState === "none") {
		return null;
	}

	const isCluster = size === "cluster";

	return (
		<>
			{disabledState === "not-available" ? (
				<div
					className={cn(
						"pointer-events-none absolute inset-0 z-10 grid place-items-center",
						className,
					)}
				>
					<LockIconIcon
						className={isCluster ? "h-[0.525rem] w-[0.525rem]" : "h-6 w-6"}
					/>
				</div>
			) : null}
			{disabledState === "not-implemented" ? (
				<div
					className={cn(
						"pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 bg-ll-tab-active/88",
						isCluster ? "px-[0.063rem] py-[0.0875rem]" : "px-[0.18rem] py-1",
						className,
					)}
				>
					<p
						className={cn(
							"text-center leading-none font-semibold text-ll-white",
							isCluster ? "text-[0.28rem]" : "text-[0.8rem]",
						)}
					>
						{isCluster ? (
							<>
								Coming
								<br />
								Soon
							</>
						) : (
							"Coming Soon"
						)}
					</p>
				</div>
			) : null}
			<div
				className={cn(
					"pointer-events-none absolute inset-0 rounded-[inherit] bg-ll-gray/60",
					className,
				)}
			/>
		</>
	);
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
		<span
			className={cn(
				"grid h-full w-full grid-cols-2 grid-rows-2 place-items-center gap-[8%] p-[4%]",
				clusterClassName,
			)}
		>
			{illustration.items.map((item) => (
				<ClusterTileItem
					key={item.title}
					clusterIconClassName={clusterIconClassName}
					clusterItemClassName={clusterItemClassName}
					item={item}
				/>
			))}
		</span>
	);
}

function ClusterTileItem({
	clusterIconClassName,
	clusterItemClassName,
	item,
}: {
	clusterIconClassName?: string | undefined;
	clusterItemClassName?: string | undefined;
	item: LayoutTileClusterItemDefinition;
}) {
	return (
		<span
			className={cn(
				"ll-shadow-icon-tile relative grid aspect-square h-auto w-full max-w-full place-items-center self-center rounded-[26%] bg-ll-white",
				clusterItemClassName,
			)}
		>
			<GradientIcon
				className={cn("h-[56%] w-[56%]", clusterIconClassName)}
				icon={item.icon}
				title={item.title}
				{...(item.fitToSquare !== undefined
					? { fitToSquare: item.fitToSquare }
					: {})}
				{...(item.paint !== undefined ? { paint: item.paint } : {})}
			/>
			<DisabledOverlay
				disabledState={item.disabledState ?? "none"}
				size="cluster"
			/>
		</span>
	);
}

export function LayoutQuickTile({
	badge,
	className,
	clusterClassName,
	clusterIconClassName,
	clusterItemClassName,
	contentClassName,
	disabledState = "none",
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
			disabledState={disabledState}
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
						<p className="block overflow-visible text-center whitespace-nowrap text-[0.86rem] leading-[1.18] font-medium text-ll-label text-ellipsis max-[420px]:text-[0.78rem] max-[380px]:text-[0.7rem] max-[360px]:text-[0.63rem]">
							<span className="inline-block max-w-full overflow-hidden align-top text-ellipsis whitespace-nowrap pb-[0.08rem]">
								{label}
							</span>
						</p>
					</div>
				)}
			</div>
			<DisabledOverlay disabledState={disabledState} size="default" />
		</LayoutTile>
	);
}
