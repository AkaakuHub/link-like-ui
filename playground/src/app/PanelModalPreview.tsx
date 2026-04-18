import { Button } from "../../../src/System/Button";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalHeading,
	SystemModalHeadingContent,
	SystemModalHeadingGrid,
	SystemModalTitle,
	SystemModalTrigger,
} from "../../../src/System/SystemModal";
import { accountItems, supportItems } from "./controlData";

export function PanelModalPreview() {
	return (
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
	);
}
