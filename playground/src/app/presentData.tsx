import type { LayoutPageDefinition } from "../../../src/Components/Patterns/AppShell";
import { PresentPagePreview } from "./PresentPagePreview";

export const presentPageDefinition: LayoutPageDefinition = {
	content: <PresentPagePreview />,
	id: "present",
	showClock: false,
};
