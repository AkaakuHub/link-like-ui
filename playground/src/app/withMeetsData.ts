import type {
	WithMeetsCommentInput,
	WithMeetsGiftInput,
} from "../../../src/Components/Patterns/WithMeetsScreen";

export const withMeetsPoster = {
	alt: "mock streaming stage",
	src: "https://placehold.jp/1920x1080.png",
} as const;

export const withMeetsComments: readonly WithMeetsCommentInput[] = Array.from(
	{ length: 240 },
	(_, index) => ({
		id: `comment-${index + 1}`,
		message: `Sample message ${index + 1}`,
		userName: `Viewer ${String(index + 1).padStart(3, "0")}`,
	}),
);

export const withMeetsGifts: readonly WithMeetsGiftInput[] = Array.from(
	{ length: 120 },
	(_, index) => ({
		amount: `${(index % 5) + 1},000 pt`,
		id: `gift-${index + 1}`,
		label: `Support gift ${index + 1}`,
		userName: `Viewer ${String(index + 1).padStart(3, "0")}`,
	}),
);
