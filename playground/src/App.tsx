import { useState } from "react";
import {
	Button,
	ModalTabList,
	ModalTabPanel,
	ModalTabRoot,
	ModalTabTrigger,
	RadioField,
	RadioFieldRow,
	SliderToggleRow,
	SystemModal,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalActionGrid,
	SystemModalActions,
	SystemModalHeading,
	SystemModalHeadingContent,
	SystemModalHeadingGrid,
	SystemModalMessage,
	SystemModalPanel,
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
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
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
const filterTopOptions = [
	{ label: "Choice 01", value: "choice-01" },
	{ label: "Choice 02", value: "choice-02" },
	{ label: "Choice 03", value: "choice-03" },
];
const filterAfterOptions = [
	{ label: "None", value: "none" },
	{ label: "Has", value: "has" },
	{ label: "No", value: "no" },
];
const performerRows = [
	{ key: "row-01", label: "Item 01" },
	{ key: "row-02", label: "Item 02" },
	{ key: "row-03", label: "Item 03" },
	{ key: "row-04", label: "Item 04" },
	{ key: "row-05", label: "Item 05" },
	{ key: "row-06", label: "Item 06" },
	{ key: "row-07", label: "Item 07" },
	{ key: "row-08", label: "Item 08" },
	{ key: "row-09", label: "Item 09" },
	{ key: "row-10", label: "Item 10" },
	{ key: "row-11", label: "Item 11" },
	{ key: "row-12", label: "Item 12" },
];

const tabLabels: Array<{ label: string; value: ControlTabValue }> = [
	{ label: "Tab 01", value: "tab-01" },
	{ label: "Tab 02", value: "tab-02" },
	{ label: "Tab 03", value: "tab-03" },
	{ label: "Tab 04", value: "tab-04" },
	{ label: "Tab 05", value: "tab-05" },
];

const detailTabValues = ["detail-01", "detail-02"] as const;
type DetailTabValue = (typeof detailTabValues)[number];
const detailTabs: Array<{ label: string; value: DetailTabValue }> = [
	{ label: "Tab A", value: "detail-01" },
	{ label: "Tab B", value: "detail-02" },
];

const rarityRateRows: Array<{ rarity: string; ratio: string }> = [
	{ rarity: "VR", ratio: "3.00%" },
	{ rarity: "UR", ratio: "18.00%" },
	{ rarity: "R", ratio: "79.00%" },
];

const cardRateRowsByTab: Record<
	DetailTabValue,
	Array<{ rarity: string; name: string; ratio: string }>
> = {
	"detail-01": [
		{ rarity: "VR", name: "Entry 01", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 02", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 03", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 04", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 05", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 06", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 07", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 08", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 09", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 10", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 11", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 12", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 13", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 14", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 15", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 16", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 17", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 18", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 19", ratio: "0.04%" },
		{ rarity: "UR", name: "Entry 20", ratio: "0.04%" },
	],
	"detail-02": [
		{ rarity: "VR", name: "Alt 01", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 02", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 03", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 04", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 05", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 06", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 07", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 08", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 09", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 10", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 11", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 12", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 13", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 14", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 15", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 16", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 17", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 18", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 19", ratio: "0.08%" },
		{ rarity: "UR", name: "Alt 20", ratio: "0.08%" },
	],
};

function isDetailTabValue(value: string): value is DetailTabValue {
	return detailTabValues.some((tabValue) => tabValue === value);
}

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

function createInitialPerformerFilters(): Record<string, string> {
	const initialMap: Record<string, string> = {};
	for (const performer of performerRows) {
		initialMap[performer.key] = "all";
	}
	return initialMap;
}

export function App() {
	const [activeTab, setActiveTab] = useState<ControlTabValue>("tab-01");
	const [activeDetailTab, setActiveDetailTab] =
		useState<DetailTabValue>("detail-01");
	const [values, setValues] = useState<Record<string, number>>(
		createInitialMap(70),
	);
	const [toggles, setToggles] = useState<Record<string, boolean>>(
		createInitialToggleMap(),
	);
	const [topFilter, setTopFilter] = useState<string>("choice-01");
	const [afterFilter, setAfterFilter] = useState<string>("none");
	const [performerFilters, setPerformerFilters] = useState<Record<string, string>>(
		createInitialPerformerFilters(),
	);

	function handleTabChange(value: string) {
		if (isControlTabValue(value)) {
			setActiveTab(value);
		}
	}

	function handleDetailTabChange(value: string) {
		if (isDetailTabValue(value)) {
			setActiveDetailTab(value);
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

	function updatePerformerFilter(rowKey: string, value: string) {
		setPerformerFilters((prevFilters) => ({
			...prevFilters,
			[rowKey]: value,
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
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Panel</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody>
						<SystemModalHeading>Group A</SystemModalHeading>
						<SystemModalHeadingContent>
							<SystemModalHeadingGrid>
								{accountItems.map((item) => (
									<Button key={item} variant="secondary" size="lg">
										{item}
									</Button>
								))}
							</SystemModalHeadingGrid>
						</SystemModalHeadingContent>
						<SystemModalHeading>Group B</SystemModalHeading>
						<SystemModalHeadingContent>
							<SystemModalHeadingGrid>
								{supportItems.map((item) => (
									<Button key={item} variant="secondary" size="lg">
										{item}
									</Button>
								))}
							</SystemModalHeadingGrid>
						</SystemModalHeadingContent>
					</SystemModalBody>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog" width="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
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
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Info Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Info</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="comfortable">
						<SystemModalMessage>
							<p>NOTICE</p>
							<p>Sample text for UI preview.</p>
							<p>This content is for layout testing only.</p>
						</SystemModalMessage>
						<SystemModalWarning>
							This is a warning message for layout verification only.
						</SystemModalWarning>
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
					<SystemModalBody padding="compact">
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
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Table Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Detail</SystemModalTitle>
					</SystemModalHeader>
					<ModalTabRoot
						value={activeDetailTab}
						onValueChange={handleDetailTabChange}
					>
						<ModalTabList>
							{detailTabs.map((tabItem) => (
								<ModalTabTrigger key={tabItem.value} value={tabItem.value}>
									{tabItem.label}
								</ModalTabTrigger>
							))}
						</ModalTabList>
						<SystemModalBody padding="compact">
							{detailTabs.map((tabItem) => (
								<ModalTabPanel key={tabItem.value} value={tabItem.value}>
									<div className="space-y-2">
										<SystemModalHeading
											size="compact"
											tone="label"
											withoutTopMargin
											className="w-full rounded-[0.6rem]"
										>
											Rate Group 01
										</SystemModalHeading>
										<TableRoot>
											<TableHead>
												<TableRow>
													<TableHeaderCell>Type</TableHeaderCell>
													<TableHeaderCell>Rate</TableHeaderCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{rarityRateRows.map((row) => (
													<TableRow key={`${tabItem.value}-${row.rarity}`}>
														<TableCell className="text-center">{row.rarity}</TableCell>
														<TableCell className="text-right">{row.ratio}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</TableRoot>
										<SystemModalHeading
											size="compact"
											tone="label"
											className="w-full rounded-[0.6rem]"
										>
											Rate Group 02
										</SystemModalHeading>
										<TableRoot>
											<TableHead>
												<TableRow>
													<TableHeaderCell className="w-[20%]">Type</TableHeaderCell>
													<TableHeaderCell>Name</TableHeaderCell>
													<TableHeaderCell className="w-[22%]">Rate</TableHeaderCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{cardRateRowsByTab[tabItem.value].map((row) => (
													<TableRow
														key={`${tabItem.value}-${row.rarity}-${row.name}`}
													>
														<TableCell className="text-center">{row.rarity}</TableCell>
														<TableCell>{row.name}</TableCell>
														<TableCell className="text-right">{row.ratio}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</TableRoot>
									</div>
								</ModalTabPanel>
							))}
						</SystemModalBody>
					</ModalTabRoot>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
			<SystemModal>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open Text Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>Document</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="none" tone="surface">
						<SystemModalSectionBody withoutTopMargin className="p-4">
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
						</SystemModalSectionBody>
					</SystemModalBody>
					<SystemModalFooter>
						<SystemModalActions spacing="none">
							<SystemModalClose asChild>
								<Button variant="secondary" size="lg" radius="dialog">
									Close
								</Button>
							</SystemModalClose>
						</SystemModalActions>
					</SystemModalFooter>
				</SystemModalContent>
			</SystemModal>
		</main>
	);
}
