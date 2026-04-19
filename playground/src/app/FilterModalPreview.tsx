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
	SystemModalTrigger,
} from "../../../src/Components/System/SystemModal";
import {
	createInitialPerformerFilters,
	filterAfterOptions,
	filterTopOptions,
	performerRows,
} from "./filterData";

export function FilterModalPreview() {
	const [topFilter, setTopFilter] = useState<string>("choice-01");
	const [afterFilter, setAfterFilter] = useState<string>("none");
	const [performerFilters, setPerformerFilters] = useState<Record<string, string>>(
		createInitialPerformerFilters(),
	);

	function updatePerformerFilter(rowKey: string, value: string) {
		setPerformerFilters((prevFilters) => ({
			...prevFilters,
			[rowKey]: value,
		}));
	}

	return (
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
	);
}
