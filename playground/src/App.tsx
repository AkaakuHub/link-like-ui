import { useState } from "react";
import {
	noticeTabValues,
	type NoticeTabValue,
	useNoticeModalStore,
} from "./stores/useNoticeModalStore";
import { Button } from "../../src/System/Button";
import {
	FormInputField,
	FormNote,
	FormSelectField,
	FormStack,
	FormSubmitActions,
	FormTextareaField,
} from "../../src/System/Form";
import {
	ListActionButton,
	ListCard,
	ListCardHeader,
	ListCardHeading,
	ListCardLead,
	ListCardMeta,
	ListCardText,
	ListDetailActions,
	ListDetailBody,
	ListDetailImage,
	ListItems,
	ListNoticeCard,
	ListRoot,
} from "../../src/System/List";
import { LoadingOverlay } from "../../src/System/Loading";
import { Layout } from "../../src/Home/Layout";
import {
	HomeMenuCircleIcon,
	HomeMenuCollectionIcon,
	HomeMenuEventIcon,
	HomeMenuMissionIcon,
	HomeMenuNewsIcon,
	HomeMenuPresentIcon,
	HomeMenuShopIcon,
	HomeMenuSoundIcon,
} from "../../src/assets/icons";
import {
	ModalTabList,
	ModalTabPanel,
	ModalTabRoot,
	ModalTabTrigger,
} from "../../src/System/ModalTab";
import { RadioField, RadioFieldRow } from "../../src/System/Radio";
import { Separator } from "../../src/System/Separator";
import { SliderToggleRow } from "../../src/System/Slider";
import {
	SystemModal,
	SystemModalActionGrid,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalHeading,
	SystemModalHeadingContent,
	SystemModalHeadingGrid,
	SystemModalMessage,
	SystemModalPanel,
	SystemModalSection,
	SystemModalSectionBody,
	SystemModalSectionTitle,
	SystemModalStack,
	SystemModalTitle,
	SystemModalTrigger,
	SystemModalWarning,
} from "../../src/System/SystemModal";
import { TabList, TabPanel, TabRoot, TabTrigger } from "../../src/System/Tab";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
} from "../../src/System/Table";
import type { LayoutTileDefinition } from "../../src/Home/Layout";

const tabValues = ["tab-01", "tab-02", "tab-03", "tab-04", "tab-05"] as const;
type ControlTabValue = (typeof tabValues)[number];
const accountItems = ["Action 01", "Action 02", "Action 03", "Action 04"];
const supportItems = [
	"Option 01",
	"Option 02",
	"Option 03",
	"Option 04",
	"Option 05",
	"Option 06",
];
const filterTopOptions = [
	{ label: "Choice 01", value: "choice-01" },
	{ label: "Choice 02", value: "choice-02" },
	{ label: "Choice 03", value: "choice-03" },
];
const filterAfterOptions = [
	{ label: "None", value: "none" },
	{ label: "Has", value: "has" },
	{ label: "No", value: "no" },
];
const performerRows = [
	{ key: "row-01", label: "Item 01" },
	{ key: "row-02", label: "Item 02" },
	{ key: "row-03", label: "Item 03" },
	{ key: "row-04", label: "Item 04" },
	{ key: "row-05", label: "Item 05" },
	{ key: "row-06", label: "Item 06" },
	{ key: "row-07", label: "Item 07" },
	{ key: "row-08", label: "Item 08" },
	{ key: "row-09", label: "Item 09" },
	{ key: "row-10", label: "Item 10" },
	{ key: "row-11", label: "Item 11" },
	{ key: "row-12", label: "Item 12" },
];

const tabLabels: Array<{ label: string; value: ControlTabValue }> = [
	{ label: "Tab 01", value: "tab-01" },
	{ label: "Tab 02", value: "tab-02" },
	{ label: "Tab 03", value: "tab-03" },
	{ label: "Tab 04", value: "tab-04" },
	{ label: "Tab 05", value: "tab-05" },
];

const detailTabValues = ["detail-01", "detail-02"] as const;
type DetailTabValue = (typeof detailTabValues)[number];
const detailTabs: Array<{ label: string; value: DetailTabValue }> = [
	{ label: "Tab A", value: "detail-01" },
	{ label: "Tab B", value: "detail-02" },
];

const rarityRateRows: Array<{ rarity: string; ratio: string }> = [
	{ rarity: "VR", ratio: "3.00%" },
	{ rarity: "UR", ratio: "18.00%" },
	{ rarity: "R", ratio: "79.00%" },
];

const homeMenuTiles: LayoutTileDefinition[] = [
	{
		id: "tile-01",
		label: "Mission",
		colSpan: 1,
		icon: <HomeMenuMissionIcon className="h-full w-full" />,
		rowSpan: 1,
	},
	{
		id: "tile-02",
		label: "Present",
		colSpan: 1,
		icon: <HomeMenuPresentIcon className="h-full w-full" />,
		rowSpan: 1,
		badge: "7",
	},
	{
		id: "tile-03",
		label: "Shop",
		colSpan: 1,
		icon: <HomeMenuShopIcon className="h-full w-full" />,
		rowSpan: 1,
	},
	{
		id: "tile-04",
		label: "Collection",
		colSpan: 1,
		icon: <HomeMenuCollectionIcon className="h-full w-full" />,
		rowSpan: 1,
	},
	{
		id: "tile-05",
		label: "Circle",
		colSpan: 1,
		icon: <HomeMenuCircleIcon className="h-full w-full" />,
		rowSpan: 1,
	},
	{
		id: "tile-06",
		label: "News",
		colSpan: 1,
		icon: <HomeMenuNewsIcon className="h-full w-full" />,
		rowSpan: 1,
		badge: "1",
	},
	{
		id: "tile-07",
		label: "Event",
		colSpan: 1,
		icon: <HomeMenuEventIcon className="h-full w-full" />,
		rowSpan: 1,
	},
	{
		id: "tile-08",
		label: "Sound",
		colSpan: 1,
		icon: <HomeMenuSoundIcon className="h-full w-full" />,
		rowSpan: 1,
	},
];

const cardRateRowsByTab: Record<
	DetailTabValue,
	Array<{ rarity: string; name: string; ratio: string }>
> = {
	"detail-01": [
		{ rarity: "VR", name: "Entry 01", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 02", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 03", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 04", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 05", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 06", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 07", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 08", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 09", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 10", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 11", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 12", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 13", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 14", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 15", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 16", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 17", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 18", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 19", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 20", ratio: "0.04%" },
	],
	"detail-02": [
		{ rarity: "VR", name: "Alt 01", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 02", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 03", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 04", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 05", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 06", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 07", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 08", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 09", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 10", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 11", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 12", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 13", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 14", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 15", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 16", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 17", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 18", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 19", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 20", ratio: "0.08%" },
	],
};

function isDetailTabValue(value: string): value is DetailTabValue {
	return detailTabValues.some((tabValue) => tabValue === value);
}

const noticeTabs: Array<{ label: string; value: NoticeTabValue }> = [
	{ label: "お知らせ", value: "notice-01" },
	{ label: "不具合情報", value: "notice-02" },
];

function isNoticeTabValue(value: string): value is NoticeTabValue {
	return noticeTabValues.some((tabValue) => tabValue === value);
}

const noticeRowsByTab: Record<
	NoticeTabValue,
	Array<{ id: string; heading: string; meta: string; text: string; detail: string[] }>
> = {
	"notice-01": [
		{
			id: "notice-01-01",
			heading: "お知らせ",
			meta: "2024/02/10 10:00",
			text: "サンプル告知テキストです。",
			detail: [
				"詳細表示のレイアウトを確認するためのテキストです。",
				"画像の代わりにプレースホルダーを表示しています。",
				"この文章は実データを含まないテスト用の内容です。",
			],
		},
		{
			id: "notice-01-02",
			heading: "お知らせ",
			meta: "2024/02/10 09:00",
			text: "表示確認用の文言です。",
			detail: [
				"この項目は詳細画面遷移の確認用です。",
				"戻る操作で一覧タブに復帰できます。",
				"履歴スタックで画面状態を管理しています。",
			],
		},
		{
			id: "notice-01-03",
			heading: "お知らせ",
			meta: "2024/02/09 18:00",
			text: "汎用的な案内文です。",
			detail: [
				"内容はダミー文字列で構成されています。",
				"スクロール量の確認用として段落を追加しています。",
				"モーダル下部のボタンは固定表示です。",
			],
		},
		{
			id: "notice-01-04",
			heading: "お知らせ",
			meta: "2024/02/09 12:00",
			text: "内容はダミーの説明です。",
			detail: [
				"カードの自由編集に対応するため、本文は children で差し替えできます。",
				"セパレータは独立したコンポーネントです。",
				"再利用しやすい構成に分割しています。",
			],
		},
		{
			id: "notice-01-05",
			heading: "お知らせ",
			meta: "2024/02/08 20:00",
			text: "カード表示の検証用テキストです。",
			detail: [
				"見出し、メタ情報、本文の位置合わせを検証します。",
				"この段落は余白バランス確認用です。",
				"一覧と詳細で同じ配色テーマを使用します。",
			],
		},
		{
			id: "notice-01-06",
			heading: "お知らせ",
			meta: "2024/02/08 10:00",
			text: "更新情報のテスト表示です。",
			detail: [
				"表示文言は当たり障りのない内容のみを使用しています。",
				"固有名詞や実在情報は含めていません。",
				"この行は詳細画面の行間確認用です。",
			],
		},
		{
			id: "notice-01-07",
			heading: "お知らせ",
			meta: "2024/02/07 15:00",
			text: "通知一覧の見た目調整用です。",
			detail: [
				"履歴機能により、戻る操作で直前画面へ戻れます。",
				"モーダルを閉じると初期画面へリセットされます。",
				"追加モーダルが増えても影響しない実装です。",
			],
		},
	],
	"notice-02": [
		{
			id: "notice-02-01",
			heading: "お知らせ",
			meta: "2024/02/06 11:00",
			text: "動作報告のテスト文です。",
			detail: [
				"二つ目タブ側の詳細表示確認用です。",
				"タブ状態は履歴遷移後も維持されます。",
				"この段落はサンプル文です。",
			],
		},
		{
			id: "notice-02-02",
			heading: "お知らせ",
			meta: "2024/02/05 16:00",
			text: "確認用の簡易メッセージです。",
			detail: [
				"戻るボタンはグラデーションの小ボタンです。",
				"押下で一覧画面に戻ります。",
				"この文は無害な確認用の文章です。",
			],
		},
		{
			id: "notice-02-03",
			heading: "お知らせ",
			meta: "2024/02/04 13:00",
			text: "表示の安定性チェック用です。",
			detail: [
				"詳細画面の本文は複数段落を許可しています。",
				"画像領域はプレースホルダーです。",
				"必要に応じて実画像に差し替え可能です。",
			],
		},
		{
			id: "notice-02-04",
			heading: "お知らせ",
			meta: "2024/02/03 09:00",
			text: "一覧タブの検証文です。",
			detail: [
				"この項目も同じ部品で描画されています。",
				"再利用性を優先した構成です。",
				"シンプルな依存関係で管理します。",
			],
		},
		{
			id: "notice-02-05",
			heading: "お知らせ",
			meta: "2024/02/02 22:00",
			text: "テーブル外カードの比較用です。",
			detail: [
				"一覧カードは children 差し替えで自由に編集できます。",
				"セパレータも個別利用できます。",
				"この説明はデモ用途です。",
			],
		},
	],
};

function findNoticeItemById(id: string) {
	for (const tabItems of Object.values(noticeRowsByTab)) {
		const foundItem = tabItems.find((item) => item.id === id);
		if (foundItem) {
			return foundItem;
		}
	}
	return null;
}

const destinationOptions = [
	{ label: "Option 01", value: "option-01" },
	{ label: "Option 02", value: "option-02" },
	{ label: "Option 03", value: "option-03" },
];

const rowsByTab: Record<ControlTabValue, Array<{ id: string; label: string }>> = {
	"tab-01": [
		{ id: "tab-01-row-01", label: "Row 01" },
		{ id: "tab-01-row-02", label: "Row 02" },
		{ id: "tab-01-row-03", label: "Row 03" },
		{ id: "tab-01-row-04", label: "Row 04" },
	],
	"tab-02": [
		{ id: "tab-02-row-01", label: "Row 01" },
		{ id: "tab-02-row-02", label: "Row 02" },
		{ id: "tab-02-row-03", label: "Row 03" },
		{ id: "tab-02-row-04", label: "Row 04" },
	],
	"tab-03": [
		{ id: "tab-03-row-01", label: "Row 01" },
		{ id: "tab-03-row-02", label: "Row 02" },
		{ id: "tab-03-row-03", label: "Row 03" },
		{ id: "tab-03-row-04", label: "Row 04" },
	],
	"tab-04": [
		{ id: "tab-04-row-01", label: "Row 01" },
		{ id: "tab-04-row-02", label: "Row 02" },
		{ id: "tab-04-row-03", label: "Row 03" },
		{ id: "tab-04-row-04", label: "Row 04" },
	],
	"tab-05": [
		{ id: "tab-05-row-01", label: "Row 01" },
		{ id: "tab-05-row-02", label: "Row 02" },
		{ id: "tab-05-row-03", label: "Row 03" },
		{ id: "tab-05-row-04", label: "Row 04" },
	],
};

function isControlTabValue(value: string): value is ControlTabValue {
	return tabValues.some((tabValue) => tabValue === value);
}

function createInitialMap(initialValue: number): Record<string, number> {
	const initialMap: Record<string, number> = { master: initialValue };

	for (const rowGroup of Object.values(rowsByTab)) {
		for (const row of rowGroup) {
			initialMap[row.id] = initialValue;
		}
	}

	return initialMap;
}

function createInitialToggleMap(): Record<string, boolean> {
	const initialMap: Record<string, boolean> = { master: false };

	for (const rowGroup of Object.values(rowsByTab)) {
		for (const row of rowGroup) {
			initialMap[row.id] = false;
		}
	}

	return initialMap;
}

function createInitialPerformerFilters(): Record<string, string> {
	const initialMap: Record<string, string> = {};
	for (const performer of performerRows) {
		initialMap[performer.key] = "all";
	}
	return initialMap;
}

export function App() {
	const [isLoadingVisible, setIsLoadingVisible] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<ControlTabValue>("tab-01");
	const [activeDetailTab, setActiveDetailTab] =
		useState<DetailTabValue>("detail-01");
	const activeNoticeTab = useNoticeModalStore((state) => state.activeTab);
	const noticeHistory = useNoticeModalStore((state) => state.history);
	const isListModalOpen = useNoticeModalStore((state) => state.isOpen);
	const setNoticeTab = useNoticeModalStore((state) => state.setTab);
	const openNoticeDetail = useNoticeModalStore((state) => state.openDetail);
	const backNoticeView = useNoticeModalStore((state) => state.back);
	const setListModalOpen = useNoticeModalStore((state) => state.setModalOpen);
	const [destination, setDestination] = useState<string>("");
	const [nickname, setNickname] = useState<string>("");
	const [formMessage, setFormMessage] = useState<string>("");
	const [values, setValues] = useState<Record<string, number>>(
		createInitialMap(70),
	);
	const [toggles, setToggles] = useState<Record<string, boolean>>(
		createInitialToggleMap(),
	);
	const [topFilter, setTopFilter] = useState<string>("choice-01");
	const [afterFilter, setAfterFilter] = useState<string>("none");
	const [performerFilters, setPerformerFilters] = useState<Record<string, string>>(
		createInitialPerformerFilters(),
	);

	function handleTabChange(value: string) {
		if (isControlTabValue(value)) {
			setActiveTab(value);
		}
	}

	function handleDetailTabChange(value: string) {
		if (isDetailTabValue(value)) {
			setActiveDetailTab(value);
		}
	}

	function handleNoticeTabChange(value: string) {
		if (isNoticeTabValue(value)) {
			setNoticeTab(value);
		}
	}

	function handleListModalOpenChange(nextOpen: boolean) {
		setListModalOpen(nextOpen);
	}

	function updateValue(id: string, nextValue: number) {
		setValues((prevValues) => ({
			...prevValues,
			[id]: nextValue,
		}));
	}

	function updateToggle(id: string, pressed: boolean) {
		setToggles((prevToggles) => ({
			...prevToggles,
			[id]: pressed,
		}));
	}

	function updatePerformerFilter(rowKey: string, value: string) {
		setPerformerFilters((prevFilters) => ({
			...prevFilters,
			[rowKey]: value,
		}));
	}

	const currentNoticeView = noticeHistory[noticeHistory.length - 1];
	const currentNoticeDetailItem =
		currentNoticeView?.type === "detail"
			? findNoticeItemById(currentNoticeView.itemId)
			: null;
	const pathname = globalThis.location.pathname;

	if (pathname !== "/components") {
		return (
			<main className="h-dvh overflow-hidden bg-ll-white">
				<Layout
					dayHeading="Fan LV"
					dayLabel="6"
					defaultMenuOpen
					menuTiles={homeMenuTiles}
					nameHeading="NAME"
					name="User"
					variant="home"
				/>
			</main>
		);
	}

	return (
		<main className="grid min-h-screen place-items-center bg-ll-white p-6">
			<div className="mb-4 flex flex-wrap gap-3">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button disabled>Primary Disabled</Button>
				<Button variant="secondary" disabled>
					Secondary Disabled
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						setIsLoadingVisible((previous) => !previous);
					}}
				>
					Toggle Loading
				</Button>
			</div>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg">Open Modal</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Panel</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody>
						<SystemModalHeading>Group A</SystemModalHeading>
						<SystemModalHeadingContent>
							<SystemModalHeadingGrid>
								{accountItems.map((item) => (
									<Button key={item} variant="secondary" size="lg">
										{item}
									</Button>
								))}
							</SystemModalHeadingGrid>
						</SystemModalHeadingContent>
						<SystemModalHeading>Group B</SystemModalHeading>
						<SystemModalHeadingContent>
							<SystemModalHeadingGrid>
								{supportItems.map((item) => (
									<Button key={item} variant="secondary" size="lg">
										{item}
									</Button>
								))}
							</SystemModalHeadingGrid>
						</SystemModalHeadingContent>
					</SystemModalBody>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog" width="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Control Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Control Settings</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody>
						<SliderToggleRow
							label="Main"
							value={values.master ?? 70}
							onValueChange={(nextValue) => updateValue("master", nextValue)}
							pressed={toggles.master ?? false}
							onPressedChange={(pressed) => {
								updateToggle("master", pressed);
							}}
							toggleAriaLabel="Toggle Main"
						/>
						<TabRoot value={activeTab} onValueChange={handleTabChange}>
							<TabList>
								{tabLabels.map((tabItem) => (
									<TabTrigger key={tabItem.value} value={tabItem.value}>
										{tabItem.label}
									</TabTrigger>
								))}
							</TabList>
							{tabLabels.map((tabItem) => (
								<TabPanel key={tabItem.value} value={tabItem.value} tone="surface">
									{rowsByTab[tabItem.value].map((rowItem) => (
										<SliderToggleRow
											key={rowItem.id}
											label={rowItem.label}
											value={values[rowItem.id] ?? 70}
											onValueChange={(nextValue) => {
												updateValue(rowItem.id, nextValue);
											}}
											pressed={toggles[rowItem.id] ?? false}
											onPressedChange={(pressed) => {
												updateToggle(rowItem.id, pressed);
											}}
											toggleAriaLabel={`Toggle ${rowItem.label}`}
										/>
									))}
								</TabPanel>
							))}
						</TabRoot>
						<SystemModalActions spacing="compact">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog" width="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Info Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Info</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="comfortable">
						<SystemModalMessage>
							<p>NOTICE</p>
							<p>Sample text for UI preview.</p>
							<p>This content is for layout testing only.</p>
						</SystemModalMessage>
						<SystemModalWarning>
							This is a warning message for layout verification only.
						</SystemModalWarning>
						<SystemModalActions spacing="compact">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog" width="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Filter Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Filter</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody>
						<SystemModalPanel>
							<SystemModalHeading size="compact" tone="label" withoutTopMargin>
								Group 01
							</SystemModalHeading>
							<RadioField
								label="Category"
								groupProps={{
									value: topFilter,
									onValueChange: setTopFilter,
								}}
								options={filterTopOptions}
							/>
							<RadioField
								label="Category After"
								groupProps={{
									value: afterFilter,
									onValueChange: setAfterFilter,
								}}
								options={filterAfterOptions}
							/>

							<SystemModalHeading size="compact" tone="label">
								Group 02
							</SystemModalHeading>
							{performerRows.map((row) => (
								<RadioFieldRow
									key={row.key}
									label={row.label}
									groupProps={{
										value: performerFilters[row.key] ?? "all",
										onValueChange: (value) => {
											updatePerformerFilter(row.key, value);
										},
									}}
									options={[
										{ label: "All", value: "all" },
										{ label: "Show", value: "show" },
										{ label: "Hide", value: "hide" },
									]}
								/>
							))}
						</SystemModalPanel>
					</SystemModalBody>
					<SystemModalFooter>
						<SystemModalActionGrid>
							<SystemModalClose asChild>
								<Button variant="secondary" size="modal" radius="dialog">
									Cancel
								</Button>
							</SystemModalClose>
							<Button variant="secondary" size="modal" radius="dialog">
								Reset
							</Button>
							<SystemModalClose asChild>
								<Button size="modal" radius="dialog">
									OK
								</Button>
							</SystemModalClose>
						</SystemModalActionGrid>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Form Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Form</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="default">
						<FormStack>
							<FormSelectField
								label="項目A"
								required
								value={destination}
								onChange={(event) => {
									setDestination(event.currentTarget.value);
								}}
								placeholder="選択してください"
								options={destinationOptions}
							/>
							<FormInputField
								label="項目B"
								required
								value={nickname}
								onChange={(event) => {
									setNickname(event.currentTarget.value);
								}}
							/>
							<FormTextareaField
								errorText="入力してください"
								label="項目C"
								required
								value={formMessage}
								onChange={(event) => {
									setFormMessage(event.currentTarget.value);
								}}
								placeholder="ここに入力してください"
							/>
							<FormNote>※サンプル入力を想定した表示です。</FormNote>
							<FormSubmitActions>
								<Button radius="dialog" size="modal" width="dialog">
									実行
								</Button>
							</FormSubmitActions>
						</FormStack>
					</SystemModalBody>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			<SystemModal open={isListModalOpen} onOpenChange={handleListModalOpenChange}>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open List Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>お知らせ</SystemModalTitle>
					</SystemModalHeader>
					<ModalTabRoot
						value={activeNoticeTab}
						onValueChange={handleNoticeTabChange}
					>
						<ModalTabList>
							{noticeTabs.map((tabItem) => (
								<ModalTabTrigger key={tabItem.value} value={tabItem.value}>
									{tabItem.label}
								</ModalTabTrigger>
							))}
						</ModalTabList>
						<SystemModalBody padding="compact">
							{noticeTabs.map((tabItem) => (
								<ModalTabPanel key={tabItem.value} value={tabItem.value}>
									<ListRoot>
										<ListItems>
											{noticeRowsByTab[tabItem.value].map((row) => (
												<ListNoticeCard
													key={row.id}
													heading={row.heading}
													meta={row.meta}
													onAction={() => {
														openNoticeDetail(row.id);
													}}
													text={row.text}
												/>
											))}
										</ListItems>
									</ListRoot>
								</ModalTabPanel>
							))}
						</SystemModalBody>
					</ModalTabRoot>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			<SystemModal
				open={currentNoticeView?.type === "detail"}
				onOpenChange={(nextOpen) => {
					if (!nextOpen) {
						backNoticeView();
					}
				}}
			>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>お知らせ</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="compact">
						<ListRoot>
							<ListDetailBody>
								<SystemModalStack spacing="sm">
									<ListCard>
										<SystemModalStack spacing="sm">
											<ListCardHeader>
												<ListCardLead>
													<ListCardHeading>
														{currentNoticeDetailItem?.heading ?? "お知らせ"}
													</ListCardHeading>
													<ListCardMeta>
														{currentNoticeDetailItem?.meta ?? ""}
													</ListCardMeta>
												</ListCardLead>
												<ListActionButton onClick={backNoticeView}>戻る</ListActionButton>
											</ListCardHeader>
											<Separator />
											<ListCardText>{currentNoticeDetailItem?.text ?? ""}</ListCardText>
										</SystemModalStack>
									</ListCard>
									<ListDetailImage />
									{(currentNoticeDetailItem?.detail ?? []).map((line) => (
										<p key={line}>{line}</p>
									))}
									<ListDetailActions>
										<ListActionButton onClick={backNoticeView}>戻る</ListActionButton>
									</ListDetailActions>
								</SystemModalStack>
							</ListDetailBody>
						</ListRoot>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Table Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Detail</SystemModalTitle>
					</SystemModalHeader>
					<ModalTabRoot
						value={activeDetailTab}
						onValueChange={handleDetailTabChange}
					>
						<ModalTabList>
							{detailTabs.map((tabItem) => (
								<ModalTabTrigger key={tabItem.value} value={tabItem.value}>
									{tabItem.label}
								</ModalTabTrigger>
							))}
						</ModalTabList>
						<SystemModalBody padding="compact">
							{detailTabs.map((tabItem) => (
								<ModalTabPanel key={tabItem.value} value={tabItem.value}>
									<SystemModalStack spacing="sm">
										<SystemModalHeading
											size="compact"
											tone="label"
											withoutTopMargin
											layout="bar"
										>
											Rate Group 01
										</SystemModalHeading>
										<TableRoot>
											<TableHead>
												<TableRow>
													<TableHeaderCell>Type</TableHeaderCell>
													<TableHeaderCell>Rate</TableHeaderCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{rarityRateRows.map((row) => (
													<TableRow key={`${tabItem.value}-${row.rarity}`}>
														<TableCell align="center">{row.rarity}</TableCell>
														<TableCell align="right">{row.ratio}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</TableRoot>
										<SystemModalHeading
											size="compact"
											tone="label"
											layout="bar"
										>
											Rate Group 02
										</SystemModalHeading>
										<TableRoot>
											<TableHead>
												<TableRow>
													<TableHeaderCell columnWidth="20%">Type</TableHeaderCell>
													<TableHeaderCell>Name</TableHeaderCell>
													<TableHeaderCell columnWidth="22%">Rate</TableHeaderCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{cardRateRowsByTab[tabItem.value].map((row) => (
													<TableRow
														key={`${tabItem.value}-${row.rarity}-${row.name}`}
													>
														<TableCell align="center">{row.rarity}</TableCell>
														<TableCell>{row.name}</TableCell>
														<TableCell align="right">{row.ratio}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</TableRoot>
									</SystemModalStack>
								</ModalTabPanel>
							))}
						</SystemModalBody>
					</ModalTabRoot>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Text Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Document</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="none" tone="surface">
						<SystemModalSectionBody withoutTopMargin padding="md">
							<p>
								This is sample text for layout preview in a modal component.
							</p>
							<p>
								The content is intentionally plain and contains no specific names.
							</p>

							<SystemModalSection>
								<SystemModalSectionTitle>Section 1</SystemModalSectionTitle>
								<SystemModalSectionBody>
									<p>
										This paragraph exists to verify spacing, line-height, and section
										separation.
									</p>
								</SystemModalSectionBody>
							</SystemModalSection>

							<SystemModalSection>
								<SystemModalSectionTitle>Section 2</SystemModalSectionTitle>
								<SystemModalSectionBody>
									<ol>
										<li>Item one for list rendering.</li>
										<li>Item two for list rendering.</li>
									</ol>
								</SystemModalSectionBody>
							</SystemModalSection>

							<SystemModalSection>
								<SystemModalSectionTitle>Section 3</SystemModalSectionTitle>
								<SystemModalSectionBody>
									<ol>
										<li>Another list item for shape confirmation.</li>
										<li>Final list item for visual testing.</li>
									</ol>
								</SystemModalSectionBody>
							</SystemModalSection>
						</SystemModalSectionBody>
					</SystemModalBody>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			{isLoadingVisible ? <LoadingOverlay /> : null}
		</main>
	);
}
