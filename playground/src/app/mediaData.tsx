import type { LayoutPageDefinition } from "../../../src/Components/Patterns/AppShell";
import {
	MediaHeaderPointAction,
	MediaHeaderProfile,
} from "../../../src/Components/Patterns/MediaScreen";
import { MediaPagePreview } from "./MediaPagePreview";

export type MediaPrimaryTab = "archives" | "channelList" | "mypage";

export interface RecentMediaItem {
	availability: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	title: string;
}

export interface ArchiveMediaItem {
	duration: string;
	id: string;
	imageAlt: string;
	imageSrc: string;
	releasedAt: string;
	title: string;
}

export const recentMediaItems: readonly RecentMediaItem[] = [
	{
		availability: "Scheduled for 2024/02/10 21:00",
		id: "recent-01",
		imageAlt: "scheduled stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		title: "Scheduled Session One",
	},
	{
		availability: "Scheduled for 2024/02/12 20:00",
		id: "recent-02",
		imageAlt: "scheduled stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		title: "Scheduled Session Two",
	},
] as const;

export const archiveMediaItems: readonly ArchiveMediaItem[] = [
	{
		duration: "26:54",
		id: "archive-01",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.02.08",
		title: "Archived Stream One",
	},
	{
		duration: "25:00",
		id: "archive-02",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.02.05",
		title: "Archived Stream Two",
	},
	{
		duration: "24:00",
		id: "archive-03",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.02.03",
		title: "Archived Stream Three",
	},
	{
		duration: "52:14",
		id: "archive-04",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.31",
		title: "Archived Stream Four",
	},
	{
		duration: "16:00",
		id: "archive-05",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.29",
		title: "Archived Stream Five",
	},
	{
		duration: "19:00",
		id: "archive-06",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.27",
		title: "Archived Stream Six",
	},
	{
		duration: "21:00",
		id: "archive-07",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.24",
		title: "Archived Stream Seven",
	},
	{
		duration: "20:00",
		id: "archive-08",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.20",
		title: "Archived Stream Eight",
	},
	{
		duration: "19:00",
		id: "archive-09",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.18",
		title: "Archived Stream Nine",
	},
	{
		duration: "21:00",
		id: "archive-10",
		imageAlt: "archived stream placeholder",
		imageSrc: "https://placehold.jp/480x270.png",
		releasedAt: "2024.01.16",
		title: "Archived Stream Ten",
	},
] as const;

export const mediaPageDefinition: LayoutPageDefinition = {
	centerContent: <MediaHeaderProfile level="6" name="Sample User" />,
	content: <MediaPagePreview />,
	id: "media",
	rightContent: <MediaHeaderPointAction ariaLabel="Add" count="0" />,
	showClock: false,
};
