import { createStore } from "zustand/vanilla";

type HomeLayoutOverlay = { type: "menu" } | { tileId: string; type: "submenu" };

interface HomeLayoutState {
	overlayHistory: HomeLayoutOverlay[];
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

function createInitialHomeLayoutState(
	defaultMenuOpen: boolean,
): HomeLayoutState {
	return {
		overlayHistory: defaultMenuOpen ? [{ type: "menu" }] : [],
	};
}

function selectCurrentOverlay(
	state: HomeLayoutState,
): HomeLayoutOverlay | null {
	const overlayHistory = state.overlayHistory ?? [];

	return overlayHistory[overlayHistory.length - 1] ?? null;
}

export function selectCanGoBack(state: HomeLayoutState): boolean {
	return (state.overlayHistory ?? []).length > 0;
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
				return state;
			});
		},
		closeMenu: () => {
			set((state) =>
				state.overlayHistory.length === 0 ? state : { overlayHistory: [] },
			);
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
