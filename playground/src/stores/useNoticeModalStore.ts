import { create } from "zustand";

export const noticeTabValues = ["notice-01", "notice-02"] as const;
export type NoticeTabValue = (typeof noticeTabValues)[number];

export type NoticeViewState =
	| { tab: NoticeTabValue; type: "list" }
	| { itemId: string; tab: NoticeTabValue; type: "detail" };

export interface NoticeModalState {
	activeTab: NoticeTabValue;
	history: NoticeViewState[];
	isOpen: boolean;
}

export function createInitialNoticeView(): NoticeViewState {
	return { tab: "notice-01", type: "list" };
}

export function createInitialNoticeModalState(): NoticeModalState {
	const initialNoticeView = createInitialNoticeView();

	return {
		activeTab: initialNoticeView.tab,
		history: [initialNoticeView],
		isOpen: false,
	};
}

export function selectCurrentNoticeView(state: NoticeModalState): NoticeViewState {
	return state.history[state.history.length - 1] ?? createInitialNoticeView();
}

interface NoticeModalActions {
	back: () => void;
	openDetail: (itemId: string) => void;
	setModalOpen: (nextOpen: boolean) => void;
	setTab: (tab: NoticeTabValue) => void;
}

type NoticeModalStore = NoticeModalState & NoticeModalActions;

export const useNoticeModalStore = create<NoticeModalStore>((set) => ({
	...createInitialNoticeModalState(),
	back: () => {
		set((state) => {
			if (state.history.length <= 1) {
				return state;
			}

			const nextHistory = state.history.slice(0, -1);
			const currentNoticeView = nextHistory[nextHistory.length - 1];

			return {
				activeTab: currentNoticeView?.tab ?? state.activeTab,
				history: nextHistory,
			};
		});
	},
	openDetail: (itemId: string) => {
		set((state) => ({
			history: [...state.history, { itemId, tab: state.activeTab, type: "detail" }],
		}));
	},
	setModalOpen: (nextOpen: boolean) => {
		set(() => {
			if (!nextOpen) {
				return createInitialNoticeModalState();
			}
			return { isOpen: true };
		});
	},
	setTab: (tab) => {
		set((state) => {
			const currentView = state.history[state.history.length - 1];
			if (!currentView || currentView.type !== "list") {
				return { activeTab: tab };
			}
			if (currentView.tab === tab) {
				return { activeTab: tab };
			}
			const nextHistory = [...state.history];
			nextHistory[nextHistory.length - 1] = { tab, type: "list" };
			return {
				activeTab: tab,
				history: nextHistory,
			};
		});
	},
}));
