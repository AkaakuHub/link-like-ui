import { createStore } from "zustand/vanilla";

type HomeLayoutView =
	| { type: "root" }
	| { type: "menu" }
	| { tileId: string; type: "submenu" };

interface HomeLayoutState {
	history: HomeLayoutView[];
}

interface HomeLayoutActions {
	back: () => void;
	closeMenu: () => void;
	openMenu: () => void;
	openSubmenu: (tileId: string) => void;
	setSubmenuModalOpen: (nextOpen: boolean) => void;
	toggleMenu: () => void;
}

type HomeLayoutStore = HomeLayoutState & HomeLayoutActions;

const homeRootView: HomeLayoutView = { type: "root" };
const homeMenuView: HomeLayoutView = { type: "menu" };

function createInitialHomeLayoutState(
	defaultMenuOpen: boolean,
): HomeLayoutState {
	return {
		history: defaultMenuOpen ? [homeRootView, homeMenuView] : [homeRootView],
	};
}

function selectCurrentHomeLayoutView(state: HomeLayoutState): HomeLayoutView {
	return state.history[state.history.length - 1] ?? homeRootView;
}

export function selectCanGoBack(state: HomeLayoutState): boolean {
	return state.history.length > 1;
}

export function selectIsMenuOpen(state: HomeLayoutState): boolean {
	return selectCurrentHomeLayoutView(state).type !== "root";
}

export function selectActiveSubmenuTileId(
	state: HomeLayoutState,
): string | null {
	const currentView = selectCurrentHomeLayoutView(state);

	return currentView.type === "submenu" ? currentView.tileId : null;
}

export function createHomeLayoutStore(defaultMenuOpen: boolean) {
	return createStore<HomeLayoutStore>()((set) => ({
		...createInitialHomeLayoutState(defaultMenuOpen),
		back: () => {
			set((state) => {
				if (state.history.length <= 1) {
					return state;
				}

				return {
					history: state.history.slice(0, -1),
				};
			});
		},
		closeMenu: () => {
			set((state) => {
				if (!selectIsMenuOpen(state)) {
					return state;
				}

				return createInitialHomeLayoutState(false);
			});
		},
		openMenu: () => {
			set((state) => {
				if (selectIsMenuOpen(state)) {
					return state;
				}

				return {
					history: [...state.history, homeMenuView],
				};
			});
		},
		openSubmenu: (tileId) => {
			set((state) => {
				const currentView = selectCurrentHomeLayoutView(state);

				if (currentView.type === "submenu" && currentView.tileId === tileId) {
					return state;
				}

				if (currentView.type === "root") {
					return {
						history: [
							...state.history,
							homeMenuView,
							{ tileId, type: "submenu" },
						],
					};
				}

				if (currentView.type === "submenu") {
					return {
						history: [
							...state.history.slice(0, -1),
							{ tileId, type: "submenu" },
						],
					};
				}

				return {
					history: [...state.history, { tileId, type: "submenu" }],
				};
			});
		},
		setSubmenuModalOpen: (nextOpen) => {
			set((state) => {
				if (nextOpen || selectCurrentHomeLayoutView(state).type !== "submenu") {
					return state;
				}

				return {
					history: state.history.slice(0, -1),
				};
			});
		},
		toggleMenu: () => {
			set((state) => {
				if (selectIsMenuOpen(state)) {
					return createInitialHomeLayoutState(false);
				}

				return {
					history: [...state.history, homeMenuView],
				};
			});
		},
	}));
}
