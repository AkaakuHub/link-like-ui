import { useEffect, useState } from "react";
import { LuArchive, LuHouse, LuList } from "react-icons/lu";
import {
	MediaArchiveList,
	MediaChannelListEmptyPanel,
	MediaTopTabs,
	type MediaArchiveItemInput,
	type MediaTabItemInput,
} from "../../../src/Components/Patterns/MediaScreen";
import {
	ScreenPageBody,
	ScreenPageContent,
	ScreenPageRoot,
} from "../../../src/Components/Patterns/ScreenPage";
import { ScreenTitleBar } from "../../../src/Components/Patterns/ScreenTitleBar";
import {
	fetchRealMediaItems,
	type RealMediaItem,
} from "./realData";

type RealMediaPrimaryTab = "archives" | "channelList" | "mypage";

const realMediaTabs: readonly MediaTabItemInput<RealMediaPrimaryTab>[] = [
	{
		icon: LuHouse,
		id: "mypage",
		label: "MYPAGE",
	},
	{
		icon: LuArchive,
		id: "archives",
		label: "ARCHIVES",
	},
	{
		icon: LuList,
		id: "channelList",
		label: "CHANNEL LIST",
	},
] as const;

export function RealMediaPreview() {
	const [activeTab, setActiveTab] = useState<RealMediaPrimaryTab>("archives");
	const [items, setItems] = useState<readonly RealMediaItem[]>([]);

	useEffect(() => {
		void fetchRealMediaItems().then(setItems);
	}, []);

	function openWithMeets(item: MediaArchiveItemInput) {
		const realItem = items.find((candidate) => candidate.id === item.id);

		if (!realItem) return;

		const params = new URLSearchParams({
			hls: realItem.hlsPath,
			id: realItem.id,
			poster: realItem.imageSrc,
			title: realItem.title,
		});
		globalThis.location.assign(`/real-with-meets?${params.toString()}`);
	}

	return (
		<ScreenPageRoot className="bottom-(--ll-home-dock-height)">
			<ScreenTitleBar>Real Media</ScreenTitleBar>
			<ScreenPageBody bandHeight="2.35rem" className="min-h-0">
				<ScreenPageContent className="min-h-0 grid-rows-[auto_minmax(0,1fr)]">
					<MediaTopTabs
						activeTab={activeTab}
						onTabChange={setActiveTab}
						tabs={realMediaTabs}
					/>
					<div className="min-h-0 overflow-y-auto bg-ll-white pb-4">
						{activeTab === "mypage" || activeTab === "archives" ? (
							<MediaArchiveList items={items} onItemSelect={openWithMeets} />
						) : null}
						{activeTab === "channelList" ? <MediaChannelListEmptyPanel /> : null}
					</div>
				</ScreenPageContent>
			</ScreenPageBody>
		</ScreenPageRoot>
	);
}
