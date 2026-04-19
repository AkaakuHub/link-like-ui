import { useState } from "react";
import { Button } from "../../../src/System/Button";
import {
	FormInputField,
	FormNote,
	FormSelectField,
	FormStack,
	FormSubmitActions,
	FormTextareaField,
} from "../../../src/System/Form";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalTitle,
	SystemModalTrigger,
} from "../../../src/System/SystemModal";

const destinationOptions = [
	{ label: "Option 01", value: "option-01" },
	{ label: "Option 02", value: "option-02" },
	{ label: "Option 03", value: "option-03" },
];

export function FormModalPreview() {
	const [destination, setDestination] = useState<string>("");
	const [nickname, setNickname] = useState<string>("");
	const [formMessage, setFormMessage] = useState<string>("");

	return (
		<SystemModal>
			<SystemModalTrigger asChild>
				<Button size="lg" variant="secondary">
					Open Form Modal
				</Button>
			</SystemModalTrigger>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>Form</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody padding="default">
					<FormStack>
						<FormSelectField
							label="項目A"
							required
							value={destination}
							onChange={(event) => {
								setDestination(event.currentTarget.value);
							}}
							placeholder="選択してください"
							options={destinationOptions}
						/>
						<FormInputField
							label="項目B"
							required
							value={nickname}
							onChange={(event) => {
								setNickname(event.currentTarget.value);
							}}
						/>
						<FormTextareaField
							errorText="入力してください"
							label="項目C"
							required
							value={formMessage}
							onChange={(event) => {
								setFormMessage(event.currentTarget.value);
							}}
							placeholder="ここに入力してください"
						/>
						<FormNote>※サンプル入力を想定した表示です。</FormNote>
						<FormSubmitActions>
							<Button radius="dialog" size="modal" width="dialog">
								実行
							</Button>
						</FormSubmitActions>
					</FormStack>
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
