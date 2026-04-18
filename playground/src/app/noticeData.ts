import {
	noticeTabValues,
	type NoticeTabValue,
} from "../stores/useNoticeModalStore";

export const noticeTabs: Array<{ label: string; value: NoticeTabValue }> = [
	{ label: "お知らせ", value: "notice-01" },
	{ label: "不具合情報", value: "notice-02" },
];

export const noticeRowsByTab: Record<
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

export function isNoticeTabValue(value: string): value is NoticeTabValue {
	return noticeTabValues.some((tabValue) => tabValue === value);
}

export function findNoticeItemById(id: string) {
	for (const tabItems of Object.values(noticeRowsByTab)) {
		const foundItem = tabItems.find((item) => item.id === id);

		if (foundItem) {
			return foundItem;
		}
	}

	return null;
}
