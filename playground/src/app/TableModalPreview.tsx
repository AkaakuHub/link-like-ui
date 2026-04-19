import { useState } from "react";
import { Button } from "../../../src/Components/System/Button";
import {
	ModalTabList,
	ModalTabPanel,
	ModalTabRoot,
	ModalTabTrigger,
} from "../../../src/Components/System/ModalTab";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalHeading,
	SystemModalStack,
	SystemModalTitle,
	SystemModalTrigger,
} from "../../../src/Components/System/SystemModal";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
} from "../../../src/Components/System/Table";
import {
	cardRateRowsByTab,
	detailTabs,
	isDetailTabValue,
	rarityRateRows,
	type DetailTabValue,
} from "./tableData";

export function TableModalPreview() {
	const [activeDetailTab, setActiveDetailTab] =
		useState<DetailTabValue>("detail-01");

	function handleDetailTabChange(value: string) {
		if (isDetailTabValue(value)) {
			setActiveDetailTab(value);
		}
	}

	return (
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
								<SystemModalStack spacing="sm">
									<SystemModalHeading
										size="compact"
										tone="label"
										withoutTopMargin
										layout="bar"
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
													<TableCell align="center">{row.rarity}</TableCell>
													<TableCell align="right">{row.ratio}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</TableRoot>
									<SystemModalHeading
										size="compact"
										tone="label"
										layout="bar"
									>
										Rate Group 02
									</SystemModalHeading>
									<TableRoot>
										<TableHead>
											<TableRow>
												<TableHeaderCell columnWidth="20%">Type</TableHeaderCell>
												<TableHeaderCell>Name</TableHeaderCell>
												<TableHeaderCell columnWidth="22%">Rate</TableHeaderCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{cardRateRowsByTab[tabItem.value].map((row) => (
												<TableRow
													key={`${tabItem.value}-${row.rarity}-${row.name}`}
												>
													<TableCell align="center">{row.rarity}</TableCell>
													<TableCell>{row.name}</TableCell>
													<TableCell align="right">{row.ratio}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</TableRoot>
								</SystemModalStack>
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
	);
}
