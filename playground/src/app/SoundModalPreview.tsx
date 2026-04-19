import { useState } from "react";
import { Button } from "../../../src/Components/System/Button";
import { SoundModal } from "./SoundModal";

export function SoundModalPreview() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				size="lg"
				variant="secondary"
				onClick={() => {
					setIsOpen(true);
				}}
			>
				Open Sound Modal
			</Button>
			<SoundModal onOpenChange={setIsOpen} open={isOpen} />
		</>
	);
}
