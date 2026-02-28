import { useState } from "react";
import {
	Button,
	SliderToggleRow,
	SystemModal,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalHeader,
	SystemModalHeading,
	SystemModalHeadingContent,
	SystemModalHeadingGrid,
	SystemModalMessage,
	SystemModalTitle,
	SystemModalTrigger,
	SystemModalSection,
	SystemModalSectionBody,
	SystemModalSectionTitle,
	SystemModalWarning,
	TabList,
	TabPanel,
	TabRoot,
	TabTrigger,
} from "../../src";

const tabValues = ["tab-01", "tab-02", "tab-03", "tab-04", "tab-05"] as const;
type ControlTabValue = (typeof tabValues)[number];
const accountItems = ["Action 01", "Action 02", "Action 03", "Action 04"];
const supportItems = [
	"Option 01",
	"Option 02",
	"Option 03",
	"Option 04",
	"Option 05",
	"Option 06",
];

const tabLabels: Array<{ label: string; value: ControlTabValue }> = [
	{ label: "Tab 01", value: "tab-01" },
	{ label: "Tab 02", value: "tab-02" },
	{ label: "Tab 03", value: "tab-03" },
	{ label: "Tab 04", value: "tab-04" },
	{ label: "Tab 05", value: "tab-05" },
];

const rowsByTab: Record<ControlTabValue, Array<{ id: string; label: string }>> = {
	"tab-01": [
		{ id: "tab-01-row-01", label: "Row 01" },
		{ id: "tab-01-row-02", label: "Row 02" },
		{ id: "tab-01-row-03", label: "Row 03" },
		{ id: "tab-01-row-04", label: "Row 04" },
	],
	"tab-02": [
		{ id: "tab-02-row-01", label: "Row 01" },
		{ id: "tab-02-row-02", label: "Row 02" },
		{ id: "tab-02-row-03", label: "Row 03" },
		{ id: "tab-02-row-04", label: "Row 04" },
	],
	"tab-03": [
		{ id: "tab-03-row-01", label: "Row 01" },
		{ id: "tab-03-row-02", label: "Row 02" },
		{ id: "tab-03-row-03", label: "Row 03" },
		{ id: "tab-03-row-04", label: "Row 04" },
	],
	"tab-04": [
		{ id: "tab-04-row-01", label: "Row 01" },
		{ id: "tab-04-row-02", label: "Row 02" },
		{ id: "tab-04-row-03", label: "Row 03" },
		{ id: "tab-04-row-04", label: "Row 04" },
	],
	"tab-05": [
		{ id: "tab-05-row-01", label: "Row 01" },
		{ id: "tab-05-row-02", label: "Row 02" },
		{ id: "tab-05-row-03", label: "Row 03" },
		{ id: "tab-05-row-04", label: "Row 04" },
	],
};

function isControlTabValue(value: string): value is ControlTabValue {
	return tabValues.some((tabValue) => tabValue === value);
}

function createInitialMap(initialValue: number): Record<string, number> {
	const initialMap: Record<string, number> = { master: initialValue };

	for (const rowGroup of Object.values(rowsByTab)) {
		for (const row of rowGroup) {
			initialMap[row.id] = initialValue;
		}
	}

	return initialMap;
}

function createInitialToggleMap(): Record<string, boolean> {
	const initialMap: Record<string, boolean> = { master: false };

	for (const rowGroup of Object.values(rowsByTab)) {
		for (const row of rowGroup) {
			initialMap[row.id] = false;
		}
	}

	return initialMap;
}

export function App() {
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
		<main className="grid min-h-screen place-items-center bg-ll-tab-gray p-6">
			<div className="mb-4 flex flex-wrap gap-3">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button disabled>Primary Disabled</Button>
				<Button variant="secondary" disabled>
					Secondary Disabled
				</Button>
			</div>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg">Open Modal</Button>
				</SystemModalTrigger>
				<SystemModalContent className="max-w-[24rem]">
					<SystemModalHeader>
						<SystemModalTitle>Panel</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody className="px-3 pt-4 pb-6">
						<SystemModalHeading>Group A</SystemModalHeading>
						<SystemModalHeadingContent>
							<SystemModalHeadingGrid>
								{accountItems.map((item) => (
									<Button
										key={item}
										variant="secondary"
										className="h-12 rounded-[12px]"
									>
										{item}
									</Button>
								))}
							</SystemModalHeadingGrid>
						</SystemModalHeadingContent>
						<SystemModalHeading>Group B</SystemModalHeading>
						<SystemModalHeadingContent>
							<SystemModalHeadingGrid>
								{supportItems.map((item) => (
									<Button
										key={item}
										variant="secondary"
										className="h-12 rounded-[12px]"
									>
										{item}
									</Button>
								))}
							</SystemModalHeadingGrid>
						</SystemModalHeadingContent>
						<div className="mt-6 flex justify-center">
							<SystemModalClose asChild>
								<Button
									variant="secondary"
									className="h-12 w-[72%] rounded-[13px]"
								>
									Close
								</Button>
							</SystemModalClose>
						</div>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Control Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent className="max-w-[24rem]">
					<SystemModalHeader>
						<SystemModalTitle>Control Settings</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody className="px-3 pt-4 pb-6">
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
						<TabRoot
							value={activeTab}
							onValueChange={handleTabChange}
							className="mt-4"
						>
							<TabList>
								{tabLabels.map((tabItem) => (
									<TabTrigger key={tabItem.value} value={tabItem.value}>
										{tabItem.label}
									</TabTrigger>
								))}
							</TabList>
							{tabLabels.map((tabItem) => (
								<TabPanel
									key={tabItem.value}
									value={tabItem.value}
									className="space-y-[0.65rem] bg-ll-modal-content-gray p-2"
								>
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
						<div className="mt-5 flex justify-center">
							<SystemModalClose asChild>
								<Button
									variant="secondary"
									className="h-12 w-[72%] rounded-[13px]"
								>
									Close
								</Button>
							</SystemModalClose>
						</div>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Info Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent className="max-w-[21.75rem]">
					<SystemModalHeader>
						<SystemModalTitle>Info</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody className="p-4">
						<SystemModalMessage>
							<p className="font-semibold">NOTICE</p>
							<p>Sample text for UI preview.</p>
							<p>This content is for layout testing only.</p>
						</SystemModalMessage>
						<SystemModalWarning>
							This is a warning message for layout verification only.
						</SystemModalWarning>
						<div className="mt-5 flex justify-center">
							<SystemModalClose asChild>
								<Button
									variant="secondary"
									className="h-12 w-[72%] rounded-[13px]"
								>
									Close
								</Button>
							</SystemModalClose>
						</div>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Text Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent className="max-w-[22rem]">
					<SystemModalHeader>
						<SystemModalTitle>Document</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody className="p-4">
						<p>
							This is sample text for layout preview in a modal component.
						</p>
						<p>
							The content is intentionally plain and contains no specific names.
						</p>

						<SystemModalSection>
							<SystemModalSectionTitle>Section 1</SystemModalSectionTitle>
							<SystemModalSectionBody>
								<p>
									This paragraph exists to verify spacing, line-height, and section
									separation.
								</p>
							</SystemModalSectionBody>
						</SystemModalSection>

						<SystemModalSection>
							<SystemModalSectionTitle>Section 2</SystemModalSectionTitle>
							<SystemModalSectionBody>
								<ol>
									<li>Item one for list rendering.</li>
									<li>Item two for list rendering.</li>
								</ol>
							</SystemModalSectionBody>
						</SystemModalSection>

						<SystemModalSection>
							<SystemModalSectionTitle>Section 3</SystemModalSectionTitle>
							<SystemModalSectionBody>
								<ol>
									<li>Another list item for shape confirmation.</li>
									<li>Final list item for visual testing.</li>
								</ol>
							</SystemModalSectionBody>
						</SystemModalSection>

						<div className="mt-6 flex justify-center">
							<SystemModalClose asChild>
								<Button variant="secondary" className="h-12 w-[72%] rounded-[13px]">
									Close
								</Button>
							</SystemModalClose>
						</div>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
		</main>
	);
}
