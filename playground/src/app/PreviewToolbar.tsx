import { Button } from "../../../src/Components/System/Button";

interface PreviewToolbarProps {
	isLoadingVisible: boolean;
	onToggleLoading: () => void;
}

export function PreviewToolbar({
	isLoadingVisible,
	onToggleLoading,
}: PreviewToolbarProps) {
	return (
		<div className="mb-4 flex flex-wrap gap-3">
			<Button>Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button disabled>Primary Disabled</Button>
			<Button variant="secondary" disabled>
				Secondary Disabled
			</Button>
			<Button variant="secondary" onClick={onToggleLoading}>
				{isLoadingVisible ? "Hide Loading" : "Toggle Loading"}
			</Button>
		</div>
	);
}
