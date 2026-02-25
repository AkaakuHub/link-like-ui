import {
	Button,
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
} from "../../src";

const accountItems = ["Action 01", "Action 02", "Action 03", "Action 04"];
const supportItems = [
	"Option 01",
	"Option 02",
	"Option 03",
	"Option 04",
	"Option 05",
	"Option 06",
];

export function App() {
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
