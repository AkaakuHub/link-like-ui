import { useState } from "react";
import { LoadingOverlay } from "../../../src/System/Loading";
import { ControlModalPreview } from "./ControlModalPreview";
import { FilterModalPreview } from "./FilterModalPreview";
import { FormModalPreview } from "./FormModalPreview";
import { InfoModalPreview } from "./InfoModalPreview";
import { NoticeModalPreview } from "./NoticeModalPreview";
import { PanelModalPreview } from "./PanelModalPreview";
import { PreviewToolbar } from "./PreviewToolbar";
import { TableModalPreview } from "./TableModalPreview";
import { TextModalPreview } from "./TextModalPreview";

export function ComponentsPreview() {
	const [isLoadingVisible, setIsLoadingVisible] = useState<boolean>(false);

	return (
		<main className="grid min-h-screen place-items-center bg-ll-white p-6">
			<PreviewToolbar
				isLoadingVisible={isLoadingVisible}
				onToggleLoading={() => {
					setIsLoadingVisible((previous) => !previous);
				}}
			/>
			<PanelModalPreview />
			<ControlModalPreview />
			<InfoModalPreview />
			<FilterModalPreview />
			<FormModalPreview />
			<NoticeModalPreview />
			<TableModalPreview />
			<TextModalPreview />
			{isLoadingVisible ? <LoadingOverlay /> : null}
		</main>
	);
}
