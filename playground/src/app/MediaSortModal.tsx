import { useState } from "react";
import { Button } from "../../../src/Components/System/Button";
import { RadioField } from "../../../src/Components/System/Radio";
import {
	SystemModal,
	SystemModalActionGrid,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalPanel,
	SystemModalTitle,
} from "../../../src/Components/System/SystemModal";

const sortOptions = [
	{ label: "Date", value: "date" },
	{ label: "With Star", value: "with-star" },
] as const;

interface MediaSortModalProps {
	onOpenChange: (nextOpen: boolean) => void;
	open: boolean;
}

export function MediaSortModal({ onOpenChange, open }: MediaSortModalProps) {
	const [sortValue, setSortValue] = useState<string>("date");

	return (
		<SystemModal open={open} onOpenChange={onOpenChange}>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>Sort</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SystemModalPanel>
						<RadioField
							groupProps={{
								onValueChange: setSortValue,
								value: sortValue,
							}}
							options={[...sortOptions]}
						/>
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
							onClick={() => {
								setSortValue("date");
							}}
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
