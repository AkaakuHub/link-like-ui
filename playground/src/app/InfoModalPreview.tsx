import { Button } from "../../../src/Components/System/Button";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalHeader,
	SystemModalMessage,
	SystemModalTitle,
	SystemModalTrigger,
	SystemModalWarning,
} from "../../../src/Components/System/SystemModal";

export function InfoModalPreview() {
	return (
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
	);
}
