import { createStore } from "zustand/vanilla";

type HomeLayoutPageId = "home" | string;
type HomeLayoutOverlay = { type: "menu" } | { tileId: string; type: "submenu" };

interface HomeLayoutState {
	overlayHistory: HomeLayoutOverlay[];
	pageHistory: HomeLayoutPageId[];
}

interface HomeLayoutActions {
	back: () => void;
	closeMenu: () => void;
	goToPage: (pageId: HomeLayoutPageId) => void;
	goToHome: () => void;
	openMenu: () => void;
	openSubmenu: (tileId: string) => void;
	setSubmenuModalOpen: (nextOpen: boolean) => void;
	toggleMenu: () => void;
}

type HomeLayoutStore = HomeLayoutState & HomeLayoutActions;

function createInitialHomeLayoutState(
	defaultMenuOpen: boolean,
): HomeLayoutState {
	return {
		overlayHistory: defaultMenuOpen ? [{ type: "menu" }] : [],
		pageHistory: ["home"],
	};
}

function selectCurrentPageIdInternal(state: HomeLayoutState): HomeLayoutPageId {
	const pageHistory = state.pageHistory ?? ["home"];

	return pageHistory[pageHistory.length - 1] ?? "home";
}

function selectCurrentOverlay(
	state: HomeLayoutState,
): HomeLayoutOverlay | null {
	const overlayHistory = state.overlayHistory ?? [];

	return overlayHistory[overlayHistory.length - 1] ?? null;
}

export function selectCanGoBack(state: HomeLayoutState): boolean {
	const overlayHistory = state.overlayHistory ?? [];
	const pageHistory = state.pageHistory ?? ["home"];

	return overlayHistory.length > 0 || pageHistory.length > 1;
}

export function selectCurrentPageId(state: HomeLayoutState): HomeLayoutPageId {
	return selectCurrentPageIdInternal(state);
}

export function selectIsMenuOpen(state: HomeLayoutState): boolean {
	return (state.overlayHistory ?? []).length > 0;
}

export function selectActiveSubmenuTileId(
	state: HomeLayoutState,
): string | null {
	const currentOverlay = selectCurrentOverlay(state);

	return currentOverlay?.type === "submenu" ? currentOverlay.tileId : null;
}

export function createHomeLayoutStore(defaultMenuOpen: boolean) {
	return createStore<HomeLayoutStore>()((set) => ({
		...createInitialHomeLayoutState(defaultMenuOpen),
		back: () => {
			set((state) => {
				if (state.overlayHistory.length > 0) {
					return {
						overlayHistory: state.overlayHistory.slice(0, -1),
					};
				}

				if (state.pageHistory.length <= 1) {
					return state;
				}

				return {
					pageHistory: state.pageHistory.slice(0, -1),
				};
			});
		},
		closeMenu: () => {
			set((state) => {
				if (state.overlayHistory.length === 0) {
					return state;
				}

				return {
					overlayHistory: [],
				};
			});
		},
		goToPage: (pageId) => {
			set((state) => {
				const currentPageId = selectCurrentPageIdInternal(state);

				if (currentPageId === pageId) {
					if (state.overlayHistory.length === 0) {
						return state;
					}

					return {
						overlayHistory: [],
					};
				}

				return {
					overlayHistory: [],
					pageHistory: [...state.pageHistory, pageId],
				};
			});
		},
		goToHome: () => {
			set((state) => {
				if (
					state.overlayHistory.length === 0 &&
					selectCurrentPageIdInternal(state) === "home" &&
					state.pageHistory.length === 1
				) {
					return state;
				}

				return {
					overlayHistory: [],
					pageHistory: ["home"],
				};
			});
		},
		openMenu: () => {
			set((state) => {
				if (state.overlayHistory.length > 0) {
					return state;
				}

				return {
					overlayHistory: [...state.overlayHistory, { type: "menu" }],
				};
			});
		},
		openSubmenu: (tileId) => {
			set((state) => {
				const currentOverlay = selectCurrentOverlay(state);

				if (
					currentOverlay?.type === "submenu" &&
					currentOverlay.tileId === tileId
				) {
					return state;
				}

				if (currentOverlay === null) {
					return {
						overlayHistory: [
							...state.overlayHistory,
							{ type: "menu" },
							{ tileId, type: "submenu" },
						],
					};
				}

				if (currentOverlay.type === "submenu") {
					return {
						overlayHistory: [
							...state.overlayHistory.slice(0, -1),
							{ tileId, type: "submenu" },
						],
					};
				}

				return {
					overlayHistory: [
						...state.overlayHistory,
						{ tileId, type: "submenu" },
					],
				};
			});
		},
		setSubmenuModalOpen: (nextOpen) => {
			set((state) => {
				if (nextOpen || selectCurrentOverlay(state)?.type !== "submenu") {
					return state;
				}

				return {
					overlayHistory: state.overlayHistory.slice(0, -1),
				};
			});
		},
		toggleMenu: () => {
			set((state) => {
				if (state.overlayHistory.length > 0) {
					return {
						overlayHistory: [],
					};
				}

				return {
					overlayHistory: [...state.overlayHistory, { type: "menu" }],
				};
			});
		},
	}));
}
