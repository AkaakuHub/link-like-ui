import type { IconType } from "react-icons";
import { LuMusic2, LuPlus, LuRadio, LuUserRound } from "react-icons/lu";
import {
	ModalTabList,
	ModalTabRoot,
	ModalTabTrigger,
} from "../../System/ModalTab";
import {
	MediaArchiveCardRoot,
	MediaArchiveDate,
	MediaArchiveDuration,
	MediaArchiveGrid as MediaArchiveGridFrame,
	MediaArchiveHeading,
	MediaArchiveImage,
	MediaArchiveRoot,
	MediaArchiveThumbnail,
	MediaArchiveTitle,
	MediaChannelListShortcut,
	MediaEmptyPanel,
	MediaHeaderPointActionRoot,
	MediaHeaderPointButton,
	MediaHeaderPointCount,
	MediaHeaderProfileIconSlot,
	MediaHeaderProfileLabel,
	MediaHeaderProfileLevel,
	MediaHeaderProfileLevelSlot,
	MediaHeaderProfileName,
	MediaHeaderProfileNameSlot,
	MediaHeaderProfileRoot,
	MediaSectionHeadingMeta,
	MediaSectionHeadingRoot,
	MediaSectionHeadingText,
	MediaSectionHeadingTitle,
	MediaUpcomingArticle,
	MediaUpcomingImage,
	MediaUpcomingTitle,
} from "./structure";

export interface MediaHeaderProfileProps {
	level: string;
	levelLabel?: string;
	name: string;
	nameLabel?: string;
}

export interface MediaHeaderPointActionProps {
	ariaLabel: string;
	count: string;
	onClick?: () => void;
}

export interface MediaTabItemInput<TValue extends string> {
	icon: IconType;
	id: TValue;
	label: string;
}

export interface MediaUpcomingItemInput {
	availability: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	title: string;
}

export interface MediaArchiveItemInput {
	duration: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	releasedAt: string;
	title: string;
}

export function MediaHeaderProfile({
	level,
	levelLabel = "Fan Lv.",
	name,
	nameLabel = "NAME",
}: MediaHeaderProfileProps) {
	return (
		<MediaHeaderProfileRoot>
			<MediaHeaderProfileIconSlot>
				<LuUserRound className="h-5 w-5" />
			</MediaHeaderProfileIconSlot>
			<MediaHeaderProfileLevelSlot>
				<MediaHeaderProfileLabel>{levelLabel}</MediaHeaderProfileLabel>
				<MediaHeaderProfileLevel>{level}</MediaHeaderProfileLevel>
			</MediaHeaderProfileLevelSlot>
			<MediaHeaderProfileNameSlot>
				<MediaHeaderProfileLabel>{nameLabel}</MediaHeaderProfileLabel>
				<MediaHeaderProfileName>{name}</MediaHeaderProfileName>
			</MediaHeaderProfileNameSlot>
		</MediaHeaderProfileRoot>
	);
}

export function MediaHeaderPointAction({
	ariaLabel,
	count,
	onClick,
}: MediaHeaderPointActionProps) {
	return (
		<MediaHeaderPointActionRoot>
			<MediaHeaderPointCount>{count}</MediaHeaderPointCount>
			<MediaHeaderPointButton
				type="button"
				aria-label={ariaLabel}
				onClick={onClick}
			>
				<LuPlus className="h-5 w-5" />
			</MediaHeaderPointButton>
		</MediaHeaderPointActionRoot>
	);
}

export function MediaTopTabs<TValue extends string>({
	activeTab,
	channelListLabel = "CHANNEL LIST",
	onTabChange,
	tabs,
}: {
	activeTab: TValue;
	channelListLabel?: string;
	onTabChange: (tab: TValue) => void;
	tabs: readonly MediaTabItemInput<TValue>[];
}) {
	function handleValueChange(value: string) {
		const nextTab = tabs.find((tab) => tab.id === value);

		if (nextTab) {
			onTabChange(nextTab.id);
		}
	}

	return (
		<ModalTabRoot value={activeTab} onValueChange={handleValueChange}>
			<ModalTabList variant="media">
				{tabs.map((tab) => {
					const Icon = tab.icon;

					return (
						<ModalTabTrigger key={tab.id} value={tab.id} variant="media">
							<span className="grid justify-items-center gap-1">
								<Icon className="h-6 w-6 stroke-[1.6]" />
								<span className="text-xs leading-none font-semibold tracking-[0.08em]">
									{tab.label}
								</span>
							</span>
						</ModalTabTrigger>
					);
				})}
				<div className="relative border-r border-ll-disabled/18">
					<MediaChannelListShortcut type="button">
						<span>
							{channelListLabel.split(" ").map((text) => (
								<span key={text} className="block">
									{text}
								</span>
							))}
							<span className="block">⌄</span>
						</span>
					</MediaChannelListShortcut>
				</div>
			</ModalTabList>
		</ModalTabRoot>
	);
}

export function MediaSectionHeading({
	children,
	rightText,
	variant = "upcoming",
}: {
	children: string;
	rightText?: string;
	variant?: "archive" | "upcoming";
}) {
	const Icon = variant === "archive" ? LuMusic2 : LuRadio;

	return (
		<MediaSectionHeadingRoot>
			<MediaSectionHeadingTitle>
				<Icon className="h-5 w-5 stroke-2" />
				<MediaSectionHeadingText>{children}</MediaSectionHeadingText>
			</MediaSectionHeadingTitle>
			{rightText ? (
				<MediaSectionHeadingMeta>{rightText}</MediaSectionHeadingMeta>
			) : null}
		</MediaSectionHeadingRoot>
	);
}

export function MediaUpcomingList({
	items,
}: {
	items: readonly MediaUpcomingItemInput[];
}) {
	return (
		<div>
			{items.map((item) => (
				<MediaUpcomingArticle key={item.id}>
					<MediaSectionHeading rightText={item.availability}>
						Upcoming
					</MediaSectionHeading>
					<MediaUpcomingImage
						alt={item.imageAlt}
						height={270}
						src={item.imageSrc}
						width={480}
					/>
					<MediaUpcomingTitle>{item.title}</MediaUpcomingTitle>
				</MediaUpcomingArticle>
			))}
		</div>
	);
}

export function MediaArchiveList({
	items,
	title = "Archive",
}: {
	items: readonly MediaArchiveItemInput[];
	title?: string;
}) {
	return (
		<MediaArchiveRoot>
			<MediaArchiveHeading>
				<LuMusic2 className="h-6 w-6 stroke-2" />
				<MediaSectionHeadingText>{title}</MediaSectionHeadingText>
			</MediaArchiveHeading>
			<MediaArchiveGridFrame>
				{items.map((item) => (
					<MediaArchiveCardRoot key={item.id}>
						<MediaArchiveThumbnail>
							<MediaArchiveImage
								alt={item.imageAlt}
								height={270}
								src={item.imageSrc}
								width={480}
							/>
							<MediaArchiveDuration>{item.duration}</MediaArchiveDuration>
							<MediaArchiveDate>{item.releasedAt}</MediaArchiveDate>
						</MediaArchiveThumbnail>
						<MediaArchiveTitle>{item.title}</MediaArchiveTitle>
					</MediaArchiveCardRoot>
				))}
			</MediaArchiveGridFrame>
		</MediaArchiveRoot>
	);
}

export function MediaChannelListEmptyPanel({
	children = "Content will be added here.",
}: {
	children?: string;
}) {
	return <MediaEmptyPanel>{children}</MediaEmptyPanel>;
}
