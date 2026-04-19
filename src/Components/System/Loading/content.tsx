import type { ComponentPropsWithoutRef } from "react";
import {
	LoadingContent,
	LoadingRoot,
	LoadingSpinner,
	LoadingText,
} from "./structure";

export interface LoadingOverlayProps
	extends Omit<ComponentPropsWithoutRef<typeof LoadingRoot>, "children"> {
	text?: string;
}

export function LoadingOverlay({
	text = "Now Loading...",
	...props
}: LoadingOverlayProps) {
	return (
		<LoadingRoot role="status" aria-live="polite" {...props}>
			<LoadingContent>
				<LoadingSpinner />
				<LoadingText>{text}</LoadingText>
			</LoadingContent>
		</LoadingRoot>
	);
}
