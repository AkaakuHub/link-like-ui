import { useState } from "react";
import { Button } from "../../../src/Components/System/Button";
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

const liveTypeOptions = [
	{ label: "Any", value: "all" },
	{ label: "Series A", value: "series-a" },
	{ label: "Series B", value: "series-b" },
] as const;

const afterAccessOptions = [
	{ label: "Any", value: "all" },
	{ label: "Enabled", value: "enabled" },
	{ label: "Disabled", value: "disabled" },
] as const;

const performerRows = [
	{ key: "member-a", label: "Member A" },
	{ key: "member-b", label: "Member B" },
	{ key: "member-c", label: "Member C" },
	{ key: "member-d", label: "Member D" },
] as const;

function createInitialPerformerFilters(): Record<string, string> {
	return performerRows.reduce<Record<string, string>>((accumulator, row) => {
		accumulator[row.key] = "all";
		return accumulator;
	}, {});
}

interface MediaFilterModalProps {
	onOpenChange: (nextOpen: boolean) => void;
	open: boolean;
}

export function MediaFilterModal({
	onOpenChange,
	open,
}: MediaFilterModalProps) {
	const [liveType, setLiveType] = useState<string>("all");
	const [afterAccess, setAfterAccess] = useState<string>("all");
	const [performerFilters, setPerformerFilters] = useState<Record<string, string>>(
		createInitialPerformerFilters(),
	);

	function resetFilters() {
		setLiveType("all");
		setAfterAccess("all");
		setPerformerFilters(createInitialPerformerFilters());
	}

	return (
		<SystemModal open={open} onOpenChange={onOpenChange}>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>Filter</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SystemModalPanel>
						<SystemModalHeading size="compact" tone="label" withoutTopMargin>
							Media
						</SystemModalHeading>
						<RadioField
							label="Live Type"
							groupProps={{
								onValueChange: setLiveType,
								value: liveType,
							}}
							options={[...liveTypeOptions]}
						/>
						<RadioField
							label="After Access"
							groupProps={{
								onValueChange: setAfterAccess,
								value: afterAccess,
							}}
							options={[...afterAccessOptions]}
						/>
						<SystemModalHeading size="compact" tone="label">
							Cast
						</SystemModalHeading>
						{performerRows.map((row) => (
							<RadioFieldRow
								key={row.key}
								label={row.label}
								groupProps={{
									onValueChange: (value) => {
										setPerformerFilters((prev) => ({
											...prev,
											[row.key]: value,
										}));
									},
									value: performerFilters[row.key] ?? "all",
								}}
								options={[
									{ label: "Any", value: "all" },
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
							<Button radius="dialog" size="modal" variant="secondary">
								Cancel
							</Button>
						</SystemModalClose>
						<Button
							radius="dialog"
							size="modal"
							variant="secondary"
							onClick={resetFilters}
						>
							Reset
						</Button>
						<SystemModalClose asChild>
							<Button radius="dialog" size="modal">
								OK
							</Button>
						</SystemModalClose>
					</SystemModalActionGrid>
				</SystemModalFooter>
			</SystemModalContent>
		</SystemModal>
	);
}
