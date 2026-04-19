import type { LayoutPageDefinition } from "../../../src/Home/Layout";
import { PresentPage } from "../../../src/Home/PresentPage";

export const presentPageDefinition: LayoutPageDefinition = {
	content: (
		<PresentPage
			actionLabel="Claim All"
			emptyMessage="There are no presents available to claim."
			historyLabel="History"
			notes={[
				{
					text: "Expired presents are removed automatically.",
				},
				{
					isAccent: true,
					text: "You can hold up to 100 claimable presents.",
				},
			]}
			title="Present Box"
		/>
	),
	id: "present",
	showClock: false,
};
