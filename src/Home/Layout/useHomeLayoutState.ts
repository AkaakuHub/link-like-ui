import { useEffect, useRef } from "react";
import { useStore } from "zustand";
import {
	createHomeLayoutStore,
	selectActiveSubmenuTileId,
	selectCanGoBack,
	selectIsMenuOpen,
} from "./store";

export function useHomeLayoutState(defaultMenuOpen: boolean) {
	const homeLayoutStoreRef = useRef<ReturnType<
		typeof createHomeLayoutStore
	> | null>(null);

	if (homeLayoutStoreRef.current === null) {
		homeLayoutStoreRef.current = createHomeLayoutStore(defaultMenuOpen);
	}

	const homeLayoutStore = homeLayoutStoreRef.current;
	const canGoBack = useStore(homeLayoutStore, selectCanGoBack);
	const isMenuOpen = useStore(homeLayoutStore, selectIsMenuOpen);
	const activeSubmenuTileId = useStore(
		homeLayoutStore,
		selectActiveSubmenuTileId,
	);

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				homeLayoutStore.getState().back();
			}
		};

		globalThis.addEventListener("keydown", handleKeyDown);

		return () => {
			globalThis.removeEventListener("keydown", handleKeyDown);
		};
	}, [homeLayoutStore, isMenuOpen]);

	return {
		activeSubmenuTileId,
		back: () => {
			homeLayoutStore.getState().back();
		},
		canGoBack,
		closeMenu: () => {
			homeLayoutStore.getState().closeMenu();
		},
		isMenuOpen,
		isSubmenuModalOpen: activeSubmenuTileId !== null,
		openSubmenu: (tileId: string) => {
			homeLayoutStore.getState().openSubmenu(tileId);
		},
		setSubmenuModalOpen: (nextOpen: boolean) => {
			homeLayoutStore.getState().setSubmenuModalOpen(nextOpen);
		},
		toggleMenu: () => {
			homeLayoutStore.getState().toggleMenu();
		},
	};
}
