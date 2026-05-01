import { useState } from "react";
import { AudioIcon } from "../../../src/assets/icons";
import { TabList, TabPanel, TabRoot, TabTrigger } from "../../../src/Components/System/Tab";
import {
	ScreenPageBody,
	ScreenPageContent,
	ScreenPageRoot,
} from "../../../src/Components/Patterns/ScreenPage";
import { ScreenTitleBar } from "../../../src/Components/Patterns/ScreenTitleBar";
import { cn } from "../../../src/utils";
import { MediaFilterModal } from "./MediaFilterModal";
import { MediaSortModal } from "./MediaSortModal";
import {
	archiveMediaItems,
	mediaPrimaryTabs,
	recentMediaItems,
	type ArchiveMediaItem,
	type MediaPrimaryTab,
	type RecentMediaItem,
} from "./mediaData";

function MediaThumbnail({
	badge,
	className,
	duration,
	releasedAt,
	toneClassName,
}: {
	badge?: string;
	className?: string;
	duration?: string;
	releasedAt?: string;
	toneClassName: string;
}) {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-[0.2rem] bg-linear-to-br",
				toneClassName,
				className,
			)}
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--color-ll-white)_0%,transparent_32%),radial-gradient(circle_at_86%_22%,var(--color-ll-white)_0%,transparent_28%),linear-gradient(135deg,transparent_0%,color-mix(in_srgb,var(--color-ll-gray)_8%,transparent)_100%)] opacity-85" />
			<div className="absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-t from-ll-gray/65 via-ll-gray/22 to-transparent" />
			<div className="absolute top-[0.2rem] left-[0.2rem] rounded-[0.16rem] bg-ll-system-left/92 px-[0.22rem] py-[0.08rem] text-[0.42rem] leading-none font-semibold text-ll-white">
				{badge ?? "AFTER"}
			</div>
			{duration ? (
				<div className="absolute top-[0.2rem] right-[0.2rem] rounded-[0.16rem] bg-ll-gray/92 px-[0.22rem] py-[0.08rem] text-[0.42rem] leading-none font-semibold text-ll-white">
					{duration}
				</div>
			) : null}
			{releasedAt ? (
				<div className="absolute bottom-[0.22rem] left-[0.28rem] text-[0.8rem] leading-none font-semibold text-ll-white">
					{releasedAt}
				</div>
			) : null}
		</div>
	);
}

function RecentCard({ item }: { item: RecentMediaItem }) {
	return (
		<article className="space-y-2">
			<div className="flex items-center justify-between text-ll-gray">
				<div className="inline-flex items-center gap-1.5">
					<AudioIcon className="h-4 w-4 text-ll-label" />
					<h2 className="text-[1.6rem] leading-none font-semibold">Recent</h2>
				</div>
				<p className="text-[0.92rem] leading-none font-semibold">
					{item.availability}
				</p>
			</div>
			<MediaThumbnail
				badge={item.badge}
				className="aspect-[1.72/1] border border-ll-system-left/40"
				toneClassName={item.toneClassName}
			/>
			<div className="space-y-0.5">
				<p className="text-[0.86rem] leading-none font-semibold text-ll-label/82">
					{item.subtitle}
				</p>
				<p className="text-[1rem] leading-tight font-medium text-ll-gray">
					{item.title}
				</p>
			</div>
		</article>
	);
}

function ArchiveCard({ item }: { item: ArchiveMediaItem }) {
	return (
		<article className="space-y-[0.22rem]">
			<MediaThumbnail
				className="aspect-[1.45/1]"
				duration={item.duration}
				releasedAt={item.releasedAt}
				toneClassName={item.toneClassName}
			/>
			<p className="line-clamp-2 text-[0.92rem] leading-[1.18] font-medium text-ll-gray">
				{item.title}
			</p>
		</article>
	);
}

function MediaTabBar({
	activeTab,
	onValueChange,
}: {
	activeTab: MediaPrimaryTab;
	onValueChange: (value: string) => void;
}) {
	return (
		<TabRoot
			className="mt-0 grid h-full grid-rows-[auto_1fr]"
			value={activeTab}
			onValueChange={onValueChange}
		>
			<TabList className="grid grid-cols-5 border-b border-ll-disabled/60">
				{mediaPrimaryTabs.map((tabItem) => (
					<TabTrigger
						key={tabItem.id}
						className="min-h-[3.35rem] flex-col gap-[0.18rem] border-r border-ll-disabled/60 px-1 py-[0.34rem] text-[0.58rem] leading-[1.05] font-medium tracking-[0.01em]"
						value={tabItem.id}
					>
						<AudioIcon className="h-[1.05rem] w-[1.05rem]" />
						<span>{tabItem.label}</span>
					</TabTrigger>
				))}
			</TabList>
			<TabPanel
				className="min-h-0 overflow-y-auto pt-0 pb-[calc(var(--ll-home-dock-height)+0.85rem)]"
				value="upcoming"
			>
				<div className="space-y-6 px-[0.36rem] py-2">
					{recentMediaItems.map((item) => (
						<RecentCard key={item.id} item={item} />
					))}
				</div>
			</TabPanel>
			<TabPanel
				className="min-h-0 overflow-y-auto pt-0 pb-[calc(var(--ll-home-dock-height)+0.85rem)]"
				value="archives"
			>
				<ArchivePanel />
			</TabPanel>
			{(["with-station", "music-video", "ranking"] as const).map((tabId) => (
				<TabPanel
					key={tabId}
					className="min-h-0 overflow-y-auto pt-0 pb-[calc(var(--ll-home-dock-height)+0.85rem)]"
					value={tabId}
				>
					<div className="grid min-h-72 place-items-center px-6 text-center text-[1rem] leading-normal font-medium text-ll-gray/70">
						Content will be added here.
					</div>
				</TabPanel>
			))}
		</TabRoot>
	);
}

function ArchivePanel() {
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

	return (
		<>
			<div className="space-y-3 px-2 py-[0.55rem]">
				<div className="flex items-center justify-between gap-3">
					<div className="inline-flex items-center gap-1.5 text-ll-gray">
						<AudioIcon className="h-4 w-4 text-ll-label" />
						<h2 className="text-[1.7rem] leading-none font-semibold">Archive</h2>
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							aria-label="Open filter"
							className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-r from-ll-system-left to-ll-system-right text-ll-white shadow-[0_4px_10px_color-mix(in_srgb,var(--color-ll-gray)_12%,transparent)]"
							onClick={() => {
								setIsFilterOpen(true);
							}}
						>
							<AudioIcon className="h-4 w-4" />
						</button>
						<button
							type="button"
							className="inline-flex h-9 min-w-[7.2rem] items-center justify-center rounded-full bg-ll-white px-4 text-[0.92rem] font-semibold text-ll-gray shadow-[0_4px_10px_color-mix(in_srgb,var(--color-ll-gray)_10%,transparent)]"
							onClick={() => {
								setIsSortOpen(true);
							}}
						>
							Date
						</button>
						<button
							type="button"
							aria-label="View options"
							className="grid h-9 w-9 place-items-center rounded-[0.78rem] ll-bg-system-gradient text-ll-white shadow-[0_4px_10px_color-mix(in_srgb,var(--color-ll-gray)_12%,transparent)]"
						>
							<AudioIcon className="h-4 w-4" />
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-2.5 gap-y-3">
					{archiveMediaItems.map((item) => (
						<ArchiveCard key={item.id} item={item} />
					))}
				</div>
			</div>
			<MediaFilterModal onOpenChange={setIsFilterOpen} open={isFilterOpen} />
			<MediaSortModal onOpenChange={setIsSortOpen} open={isSortOpen} />
		</>
	);
}

export function MediaPagePreview() {
	const [activeTab, setActiveTab] = useState<MediaPrimaryTab>("upcoming");

	function handleTabChange(value: string) {
		setActiveTab(value as MediaPrimaryTab);
	}

	return (
		<ScreenPageRoot>
			<ScreenTitleBar>Media Connect</ScreenTitleBar>
			<ScreenPageBody bandHeight="5.45rem">
				<ScreenPageContent className="grid-rows-[1fr]">
					<MediaTabBar activeTab={activeTab} onValueChange={handleTabChange} />
				</ScreenPageContent>
			</ScreenPageBody>
		</ScreenPageRoot>
	);
}
