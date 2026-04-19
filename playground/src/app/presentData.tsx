import type { LayoutPageDefinition } from "../../../src/Home/Layout";
import { PresentPagePreview } from "./PresentPagePreview";

export const presentPageDefinition: LayoutPageDefinition = {
	content: <PresentPagePreview />,
	id: "present",
	showClock: false,
};
