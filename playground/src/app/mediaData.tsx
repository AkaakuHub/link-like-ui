import type { LayoutPageDefinition } from "../../../src/Components/Patterns/AppShell";
import { MediaPagePreview } from "./MediaPagePreview";

export type MediaPrimaryTab =
	| "archives"
	| "music-video"
	| "ranking"
	| "upcoming"
	| "with-station";

export interface RecentMediaItem {
	availability: string;
	badge: string;
	id: string;
	subtitle: string;
	title: string;
	toneClassName: string;
}

export interface ArchiveMediaItem {
	duration: string;
	id: string;
	releasedAt: string;
	title: string;
	toneClassName: string;
}

export const mediaPrimaryTabs: readonly {
	id: MediaPrimaryTab;
	label: string;
}[] = [
	{ id: "upcoming", label: "UPCOMING" },
	{ id: "archives", label: "ARCHIVES" },
	{ id: "with-station", label: "WITH×STATION" },
	{ id: "music-video", label: "MUSIC VIDEO" },
	{ id: "ranking", label: "RANKING" },
] as const;

export const recentMediaItems: readonly RecentMediaItem[] = [
	{
		availability: "2026/04/16 21:00 Available",
		badge: "Time-Limited",
		id: "recent-01",
		subtitle: "Feature Clip 01",
		title: "Quiz Clip: What kind of trick is this?",
		toneClassName:
			"from-ll-system-left via-ll-system-right/90 to-ll-pink/85",
	},
	{
		availability: "2026/04/13 20:30 Available",
		badge: "Featured",
		id: "recent-02",
		subtitle: "Feature Clip 02",
		title: "Reading Session: A quiet line with a neon finish",
		toneClassName: "from-ll-orange/88 via-ll-system-left/82 to-ll-white/75",
	},
] as const;

export const archiveMediaItems: readonly ArchiveMediaItem[] = [
	{
		duration: "01:15:00",
		id: "archive-01",
		releasedAt: "2026.03.30",
		title: "Live Stage Digest 01",
		toneClassName: "from-ll-system-left via-ll-white/65 to-ll-pink/80",
	},
	{
		duration: "40:00",
		id: "archive-02",
		releasedAt: "2026.03.28",
		title: "After Talk Digest 02",
		toneClassName: "from-ll-orange/86 via-ll-pink/75 to-ll-system-right/82",
	},
	{
		duration: "36:00",
		id: "archive-03",
		releasedAt: "2026.03.26",
		title: "Story Segment 03",
		toneClassName: "from-ll-system-right/82 via-ll-white/72 to-ll-system-left",
	},
	{
		duration: "31:00",
		id: "archive-04",
		releasedAt: "2026.03.23",
		title: "Theme Digest 04",
		toneClassName: "from-ll-pink/82 via-ll-orange/75 to-ll-white/72",
	},
	{
		duration: "34:00",
		id: "archive-05",
		releasedAt: "2026.03.21",
		title: "Closing Note 05",
		toneClassName: "from-ll-white/70 via-ll-system-left/80 to-ll-pink/88",
	},
	{
		duration: "34:00",
		id: "archive-06",
		releasedAt: "2026.03.19",
		title: "Dream Scene 06",
		toneClassName: "from-ll-system-left/82 via-ll-orange/82 to-ll-system-right",
	},
] as const;

export const mediaPageDefinition: LayoutPageDefinition = {
	content: <MediaPagePreview />,
	id: "media",
	showClock: false,
};
