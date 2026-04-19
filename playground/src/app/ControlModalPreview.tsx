import { useState } from "react";
import { Button } from "../../../src/Components/System/Button";
import { SliderToggleRow } from "../../../src/Components/System/Slider";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalHeader,
	SystemModalTitle,
	SystemModalTrigger,
} from "../../../src/Components/System/SystemModal";
import { TabList, TabPanel, TabRoot, TabTrigger } from "../../../src/Components/System/Tab";
import {
	createInitialMap,
	createInitialToggleMap,
	isControlTabValue,
	rowsByTab,
	tabLabels,
	type ControlTabValue,
} from "./controlData";

export function ControlModalPreview() {
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
		<SystemModal>
			<SystemModalTrigger asChild>
				<Button size="lg" variant="secondary">
					Open Control Modal
				</Button>
			</SystemModalTrigger>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>Control Settings</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SliderToggleRow
						label="Main"
						value={values.master ?? 70}
						onValueChange={(nextValue) => updateValue("master", nextValue)}
						pressed={toggles.master ?? false}
						onPressedChange={(pressed) => {
							updateToggle("master", pressed);
						}}
						toggleAriaLabel="Toggle Main"
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
							<TabPanel key={tabItem.value} value={tabItem.value} tone="surface">
								{rowsByTab[tabItem.value].map((rowItem) => (
									<SliderToggleRow
										key={rowItem.id}
										label={rowItem.label}
										value={values[rowItem.id] ?? 70}
										onValueChange={(nextValue) => {
											updateValue(rowItem.id, nextValue);
										}}
										pressed={toggles[rowItem.id] ?? false}
										onPressedChange={(pressed) => {
											updateToggle(rowItem.id, pressed);
										}}
										toggleAriaLabel={`Toggle ${rowItem.label}`}
									/>
								))}
							</TabPanel>
						))}
					</TabRoot>
					<SystemModalActions spacing="compact">
						<SystemModalClose asChild>
							<Button variant="secondary" size="lg" radius="dialog" width="dialog">
								Close
							</Button>
						</SystemModalClose>
					</SystemModalActions>
				</SystemModalBody>
			</SystemModalContent>
		</SystemModal>
	);
}
