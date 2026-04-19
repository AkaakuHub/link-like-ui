export interface PresentItemPreview {
	acquiredAt: string;
	id: string;
	message: string;
	quantityLabel: string;
	status: string;
	title: string;
}

export const presentItemsPreview: PresentItemPreview[] = [
	{
		acquiredAt: "2026/03/27 21:00",
		id: "present-01",
		message: "\"This was the final stage.\" Thank you for watching.",
		quantityLabel: "×1",
		status: "No Limit",
		title: "【3/27】With×MEETS Prize",
	},
	{
		acquiredAt: "2026/03/24 21:05",
		id: "present-02",
		message: "\"This is the last greeting.\" Thank you for watching.",
		quantityLabel: "×1",
		status: "No Limit",
		title: "【3/24】With×MEETS Prize",
	},
	{
		acquiredAt: "2026/03/22 21:37",
		id: "present-03",
		message: "\"See you at the last show.\" Thank you for being here.",
		quantityLabel: "×1",
		status: "No Limit",
		title: "【3/22】With×MEETS Prize",
	},
];
