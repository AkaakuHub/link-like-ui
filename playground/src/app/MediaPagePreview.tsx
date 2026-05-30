import { useState } from "react";
import { LuArchive, LuHouse, LuList } from "react-icons/lu";
import {
	MediaArchiveList,
	MediaChannelListEmptyPanel,
	MediaTopTabs,
	MediaUpcomingList,
	type MediaTabItemInput,
} from "../../../src/Components/Patterns/MediaScreen";
import {
	ScreenPageBody,
	ScreenPageContent,
	ScreenPageRoot,
} from "../../../src/Components/Patterns/ScreenPage";
import { ScreenTitleBar } from "../../../src/Components/Patterns/ScreenTitleBar";
import {
	archiveMediaItems,
	recentMediaItems,
	type MediaPrimaryTab,
} from "./mediaData";

const mediaTabs: readonly MediaTabItemInput<MediaPrimaryTab>[] = [
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

export function MediaPagePreview() {
	const [activeTab, setActiveTab] = useState<MediaPrimaryTab>("mypage");
	function openWithMeets() {
		globalThis.location.assign("/with-meets");
	}

	return (
		<ScreenPageRoot className="bottom-(--ll-home-dock-height)">
			<ScreenTitleBar>Media Dashboard</ScreenTitleBar>
			<ScreenPageBody bandHeight="2.35rem" className="min-h-0">
				<ScreenPageContent className="min-h-0 grid-rows-[auto_minmax(0,1fr)]">
					<MediaTopTabs
						activeTab={activeTab}
						onTabChange={setActiveTab}
						tabs={mediaTabs}
					/>
					<div className="min-h-0 overflow-y-auto bg-ll-white pb-4">
						{activeTab === "mypage" ? (
							<MediaUpcomingList
								items={recentMediaItems}
								onItemSelect={openWithMeets}
							/>
						) : null}
						{activeTab === "archives" ? (
							<MediaArchiveList
								items={archiveMediaItems}
								onItemSelect={openWithMeets}
							/>
						) : null}
						{activeTab === "channelList" ? <MediaChannelListEmptyPanel /> : null}
					</div>
				</ScreenPageContent>
			</ScreenPageBody>
		</ScreenPageRoot>
	);
}
