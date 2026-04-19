import { useState } from "react";
import { Button } from "../../../src/Components/System/Button";
import { SliderToggleRow } from "../../../src/Components/System/Slider";
import {
	SystemModal,
	SystemModalActionGrid,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalTitle,
} from "../../../src/Components/System/SystemModal";
import {
	TabList,
	TabPanel,
	TabRoot,
	TabTrigger,
} from "../../../src/Components/System/Tab";
import {
	createInitialMap,
	createInitialToggleMap,
	isControlTabValue,
	rowsByTab,
	tabLabels,
	type ControlTabValue,
} from "./controlData";

interface SoundModalProps {
	hasOverlay?: boolean;
	onOpenChange: (nextOpen: boolean) => void;
	open: boolean;
}

export function SoundModal({
	hasOverlay = true,
	onOpenChange,
	open,
}: SoundModalProps) {
	const [activeTab, setActiveTab] = useState<ControlTabValue>("tab-01");
	const [values, setValues] = useState<Record<string, number>>(
		createInitialMap(70),
	);
	const [toggles, setToggles] = useState<Record<string, boolean>>(
		createInitialToggleMap(),
	);

	function handleTabChange(value: string) {
		if (isControlTabValue(value)) {
			setActiveTab(value);
		}
	}

	function updateValue(id: string, nextValue: number) {
		setValues((prevValues) => ({
			...prevValues,
			[id]: nextValue,
		}));
	}

	function updateToggle(id: string, pressed: boolean) {
		setToggles((prevToggles) => ({
			...prevToggles,
			[id]: pressed,
		}));
	}

	return (
		<SystemModal open={open} onOpenChange={onOpenChange}>
			<SystemModalContent
				overlayClassName={hasOverlay ? undefined : "bg-transparent"}
				width="md"
			>
				<SystemModalHeader>
					<SystemModalTitle>Sound Settings</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SliderToggleRow
						label="Main"
						onPressedChange={(pressed) => {
							updateToggle("master", pressed);
						}}
						onValueChange={(nextValue) => updateValue("master", nextValue)}
						pressed={toggles.master ?? false}
						sliderTrackClassName="h-[0.68rem]"
						toggleAriaLabel="Toggle Main"
						value={values.master ?? 70}
					/>
					<TabRoot value={activeTab} onValueChange={handleTabChange}>
						<TabList>
							{tabLabels.map((tabItem) => (
								<TabTrigger key={tabItem.value} value={tabItem.value}>
									{tabItem.label}
								</TabTrigger>
							))}
						</TabList>
						{tabLabels.map((tabItem) => (
							<TabPanel key={tabItem.value} tone="surface" value={tabItem.value}>
								{rowsByTab[tabItem.value].map((rowItem) => (
									<SliderToggleRow
										key={rowItem.id}
										label={rowItem.label}
										onPressedChange={(pressed) => {
											updateToggle(rowItem.id, pressed);
										}}
										onValueChange={(nextValue) => {
											updateValue(rowItem.id, nextValue);
										}}
										pressed={toggles[rowItem.id] ?? false}
										toggleAriaLabel={`Toggle ${rowItem.label}`}
										value={values[rowItem.id] ?? 70}
									/>
								))}
							</TabPanel>
						))}
					</TabRoot>
				</SystemModalBody>
				<SystemModalFooter>
					<SystemModalActionGrid className="grid-cols-2">
						<SystemModalClose asChild>
							<Button radius="dialog" size="modal" variant="secondary">
								Cancel
							</Button>
						</SystemModalClose>
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
