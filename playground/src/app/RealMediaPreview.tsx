import { useCallback, useEffect, useRef, useState } from "react";
import { LuArchive, LuFilter, LuHouse, LuList, LuListFilter } from "react-icons/lu";
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
import { LoadingOverlay } from "../../../src/Components/System/Loading";
import { RadioField, RadioFieldRow } from "../../../src/Components/System/Radio";
import {
	SystemModal,
	SystemModalActionGrid,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalHeading,
	SystemModalPanel,
	SystemModalTitle,
} from "../../../src/Components/System/SystemModal";
import { Button } from "../../../src/Components/System/Button";
import { FormInputField } from "../../../src/Components/System/Form";
import {
	fetchRealMediaItems,
	type RealMediaFilters,
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

const performerRows = [
	"セラス",
	"泉",
	"吟子",
	"小鈴",
	"姫芽",
	"花帆",
	"さやか",
	"瑠璃乃",
	"梢",
	"綴理",
	"慈",
] as const;

function createInitialCharacterFilters() {
	return Object.fromEntries(
		performerRows.map((performer) => [performer, "all"]),
	) as Record<string, "all" | "show" | "hide">;
}

function createInitialFilters(): RealMediaFilters {
	return {
		afterMode: "all",
		characterFilters: createInitialCharacterFilters(),
		keyword: "",
		liveType: "all",
		sortBy: "date",
	};
}

export function RealMediaPreview() {
	const [activeTab, setActiveTab] = useState<RealMediaPrimaryTab>("archives");
	const [items, setItems] = useState<readonly RealMediaItem[]>([]);
	const [filters, setFilters] = useState<RealMediaFilters>(createInitialFilters);
	const [nextOffset, setNextOffset] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSortOpen, setSortOpen] = useState<boolean>(false);
	const [keywordInput, setKeywordInput] = useState<string>("");
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const loadMediaPage = useCallback(
		async (offset: number, mode: "append" | "replace") => {
			setIsLoading(true);
			try {
				const page = await fetchRealMediaItems(offset, 40, filters);
				setItems((currentItems) =>
					mode === "append" ? [...currentItems, ...page.items] : page.items,
				);
				setNextOffset(page.nextOffset);
				setHasMore(page.hasMore);
			} finally {
				setIsLoading(false);
			}
		},
		[filters],
	);

	useEffect(() => {
		void loadMediaPage(0, "replace");
	}, [loadMediaPage]);

	const loadNextPage = useCallback(() => {
		if (!hasMore || isLoading) return;
		void loadMediaPage(nextOffset, "append");
	}, [hasMore, isLoading, loadMediaPage, nextOffset]);

	useEffect(() => {
		const loadMoreElement = loadMoreRef.current;
		if (!loadMoreElement) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					loadNextPage();
				}
			},
			{
				root: scrollContainerRef.current,
				rootMargin: "360px 0px",
			},
		);

		observer.observe(loadMoreElement);
		return () => {
			observer.disconnect();
		};
	}, [loadNextPage]);

	function applyKeywordSearch() {
		setFilters((currentFilters) => ({
			...currentFilters,
			keyword: keywordInput.trim(),
		}));
	}

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
		<>
			<ScreenPageRoot className="bottom-(--ll-home-dock-height)">
				<ScreenTitleBar>Real Media</ScreenTitleBar>
				<ScreenPageBody bandHeight="2.35rem" className="min-h-0">
					<ScreenPageContent className="min-h-0 grid-rows-[auto_minmax(0,1fr)]">
						<MediaTopTabs
							activeTab={activeTab}
							onTabChange={setActiveTab}
							tabs={realMediaTabs}
						/>
						<div
							ref={scrollContainerRef}
							className="min-h-0 overflow-y-auto bg-ll-white pb-4"
						>
							{activeTab === "mypage" || activeTab === "archives" ? (
								<>
									<MediaArchiveList
										items={items}
										onItemSelect={openWithMeets}
										headerAction={
											<div className="flex flex-wrap items-end justify-end gap-3">
												<form
													className="flex w-full max-w-[24rem] items-end gap-2 sm:w-auto"
													onSubmit={(event) => {
														event.preventDefault();
														applyKeywordSearch();
													}}
												>
													<FormInputField
														className="h-11"
														label="フリーワード"
														value={keywordInput}
														onChange={(event) => {
															setKeywordInput(event.currentTarget.value);
														}}
													/>
													<Button className="h-11 shrink-0" size="sm" type="submit">
														検索
													</Button>
												</form>
												<button
													aria-label="Filter"
													className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-r from-ll-system-left to-ll-system-right text-ll-true-white shadow-[0_0.25rem_0.8rem_color-mix(in_srgb,var(--color-ll-gray)_18%,transparent)]"
													type="button"
													onClick={() => {
														setFilterOpen(true);
													}}
												>
													<LuFilter className="h-6 w-6" />
												</button>
												<button
													className="inline-flex h-11 items-center overflow-hidden rounded-full bg-ll-table text-sm font-semibold text-ll-gray shadow-[0_0.25rem_0.8rem_color-mix(in_srgb,var(--color-ll-gray)_12%,transparent)]"
													type="button"
													onClick={() => {
														setSortOpen(true);
													}}
												>
													<span className="px-5">
														{filters.sortBy === "date" ? "日付順" : "With Starの数"}
													</span>
													<span className="grid h-11 w-11 place-items-center bg-ll-label text-ll-true-white">
														<LuListFilter className="h-6 w-6" />
													</span>
												</button>
											</div>
										}
									/>
									{hasMore ? (
										<div className="grid px-3 py-4">
											<button
												type="button"
												className="mx-auto rounded-full bg-ll-label px-5 py-2 text-sm font-semibold text-ll-true-white"
												onClick={() => {
													loadNextPage();
												}}
											>
												More
											</button>
										</div>
									) : null}
									<div ref={loadMoreRef} className="h-10" />
								</>
							) : null}
							{activeTab === "channelList" ? (
								<MediaChannelListEmptyPanel />
							) : null}
						</div>
					</ScreenPageContent>
				</ScreenPageBody>
			</ScreenPageRoot>
			<RealMediaFilterModal
				filters={filters}
				onFiltersChange={setFilters}
				onOpenChange={setFilterOpen}
				open={isFilterOpen}
			/>
			<RealMediaSortModal
				filters={filters}
				onFiltersChange={setFilters}
				onOpenChange={setSortOpen}
				open={isSortOpen}
			/>
			{isLoading ? <LoadingOverlay text="Loading..." /> : null}
		</>
	);
}

function RealMediaFilterModal({
	filters,
	onFiltersChange,
	onOpenChange,
	open,
}: {
	filters: RealMediaFilters;
	onFiltersChange: (filters: RealMediaFilters) => void;
	onOpenChange: (nextOpen: boolean) => void;
	open: boolean;
}) {
	const [draftFilters, setDraftFilters] = useState<RealMediaFilters>(filters);

	useEffect(() => {
		if (open) setDraftFilters(filters);
	}, [filters, open]);

	function resetFilters() {
		setDraftFilters({ ...createInitialFilters(), sortBy: filters.sortBy });
	}

	return (
		<SystemModal open={open} onOpenChange={onOpenChange}>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>フィルター</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SystemModalPanel>
						<SystemModalHeading size="compact" tone="label" withoutTopMargin>
							スクコネ
						</SystemModalHeading>
						<RadioField
							label="LIVE種類"
							groupProps={{
								onValueChange: (value) => {
									setDraftFilters((current) => ({
										...current,
										liveType: value as RealMediaFilters["liveType"],
									}));
								},
								value: draftFilters.liveType,
							}}
							options={[
								{ label: "指定なし", value: "all" },
								{ label: "With×MEETS", value: "withMeets" },
								{ label: "Fes×LIVE", value: "fesLive" },
							]}
						/>
						<RadioField
							label="With×MEETS AFTER"
							groupProps={{
								onValueChange: (value) => {
									setDraftFilters((current) => ({
										...current,
										afterMode: value as RealMediaFilters["afterMode"],
									}));
								},
								value: draftFilters.afterMode,
							}}
							options={[
								{ label: "指定なし", value: "all" },
								{ label: "あり", value: "has" },
								{ label: "なし", value: "none" },
							]}
						/>
						<SystemModalHeading size="compact" tone="label">
							出演者
						</SystemModalHeading>
						<div className="max-h-84 space-y-4 overflow-y-auto pr-1">
							{performerRows.map((performer) => (
								<RadioFieldRow
									key={performer}
									label={performer}
									groupProps={{
										onValueChange: (value) => {
											setDraftFilters((current) => ({
												...current,
												characterFilters: {
													...current.characterFilters,
													[performer]: value as "all" | "show" | "hide",
												},
											}));
										},
										value: draftFilters.characterFilters[performer] ?? "all",
									}}
									options={[
										{ label: "指定なし", value: "all" },
										{ label: "出演", value: "show" },
										{ label: "未出演", value: "hide" },
									]}
								/>
							))}
						</div>
					</SystemModalPanel>
				</SystemModalBody>
				<SystemModalFooter>
					<SystemModalActionGrid>
						<SystemModalClose asChild>
							<Button radius="dialog" size="modal" variant="secondary">
								キャンセル
							</Button>
						</SystemModalClose>
						<Button radius="dialog" size="modal" variant="secondary" onClick={resetFilters}>
							リセット
						</Button>
						<SystemModalClose asChild>
							<Button
								radius="dialog"
								size="modal"
								onClick={() => {
									onFiltersChange(draftFilters);
								}}
							>
								OK
							</Button>
						</SystemModalClose>
					</SystemModalActionGrid>
				</SystemModalFooter>
			</SystemModalContent>
		</SystemModal>
	);
}

function RealMediaSortModal({
	filters,
	onFiltersChange,
	onOpenChange,
	open,
}: {
	filters: RealMediaFilters;
	onFiltersChange: (filters: RealMediaFilters) => void;
	onOpenChange: (nextOpen: boolean) => void;
	open: boolean;
}) {
	const [sortBy, setSortBy] = useState<RealMediaFilters["sortBy"]>(filters.sortBy);

	useEffect(() => {
		if (open) setSortBy(filters.sortBy);
	}, [filters.sortBy, open]);

	return (
		<SystemModal open={open} onOpenChange={onOpenChange}>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>ソート</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SystemModalPanel>
						<RadioField
							groupProps={{
								onValueChange: (value) => {
									setSortBy(value as RealMediaFilters["sortBy"]);
								},
								value: sortBy,
							}}
							options={[
								{ label: "日付順", value: "date" },
								{ label: "With Starの数", value: "withStar" },
							]}
						/>
					</SystemModalPanel>
				</SystemModalBody>
				<SystemModalFooter>
					<SystemModalActionGrid>
						<SystemModalClose asChild>
							<Button radius="dialog" size="modal" variant="secondary">
								キャンセル
							</Button>
						</SystemModalClose>
						<Button
							radius="dialog"
							size="modal"
							variant="secondary"
							onClick={() => {
								setSortBy("date");
							}}
						>
							リセット
						</Button>
						<SystemModalClose asChild>
							<Button
								radius="dialog"
								size="modal"
								onClick={() => {
									onFiltersChange({ ...filters, sortBy });
								}}
							>
								OK
							</Button>
						</SystemModalClose>
					</SystemModalActionGrid>
				</SystemModalFooter>
			</SystemModalContent>
		</SystemModal>
	);
}
