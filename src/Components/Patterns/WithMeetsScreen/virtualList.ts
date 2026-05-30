import { useMemo } from "react";

interface WithMeetsVirtualListOptions {
	itemCount: number;
	itemHeight: number;
	overscan: number;
	scrollTop: number;
	viewportHeight: number;
}

interface WithMeetsVirtualItem {
	index: number;
	offsetTop: number;
}

export function useWithMeetsVirtualList({
	itemCount,
	itemHeight,
	overscan,
	scrollTop,
	viewportHeight,
}: WithMeetsVirtualListOptions) {
	return useMemo(() => {
		const visibleStartIndex = Math.max(
			0,
			Math.floor(scrollTop / itemHeight) - overscan,
		);
		const visibleEndIndex = Math.min(
			itemCount,
			Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan,
		);
		const items: WithMeetsVirtualItem[] = [];

		for (let index = visibleStartIndex; index < visibleEndIndex; index += 1) {
			items.push({
				index,
				offsetTop: index * itemHeight,
			});
		}

		return {
			items,
			totalHeight: itemCount * itemHeight,
		};
	}, [itemCount, itemHeight, overscan, scrollTop, viewportHeight]);
}
