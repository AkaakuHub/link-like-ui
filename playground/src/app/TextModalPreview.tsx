import { Button } from "../../../src/Components/System/Button";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalSection,
	SystemModalSectionBody,
	SystemModalSectionTitle,
	SystemModalTitle,
	SystemModalTrigger,
} from "../../../src/Components/System/SystemModal";

export function TextModalPreview() {
	return (
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
					<SystemModalSectionBody withoutTopMargin padding="md">
						<p>This is sample text for layout preview in a modal component.</p>
						<p>The content is intentionally plain and contains no specific names.</p>
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
	);
}
