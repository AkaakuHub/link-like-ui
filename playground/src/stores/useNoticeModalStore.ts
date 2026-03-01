import { create } from "zustand";

export const noticeTabValues = ["notice-01", "notice-02"] as const;
export type NoticeTabValue = (typeof noticeTabValues)[number];

export type NoticeViewState =
	| { tab: NoticeTabValue; type: "list" }
	| { itemId: string; tab: NoticeTabValue; type: "detail" };

const initialNoticeView: NoticeViewState = { tab: "notice-01", type: "list" };

interface NoticeModalStore {
	activeTab: NoticeTabValue;
	history: NoticeViewState[];
	isOpen: boolean;
	back: () => void;
	openDetail: (itemId: string) => void;
	setModalOpen: (nextOpen: boolean) => void;
	setTab: (tab: NoticeTabValue) => void;
}

export const useNoticeModalStore = create<NoticeModalStore>((set) => ({
	activeTab: initialNoticeView.tab,
	history: [initialNoticeView],
	isOpen: false,
	back: () => {
		set((state) => {
			if (state.history.length <= 1) {
				return state;
			}
			return { history: state.history.slice(0, -1) };
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
				return {
					activeTab: initialNoticeView.tab,
					history: [initialNoticeView],
					isOpen: false,
				};
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
