import { Button } from "../../../src/Components/System/Button";
import {
	ScreenPageBody,
	ScreenPageCenter,
	ScreenPageContent,
	ScreenPageEmptyState,
	ScreenPageRoot,
} from "../../../src/Components/Patterns/ScreenPage";
import { ScreenTitleBar } from "../../../src/Components/Patterns/ScreenTitleBar";
import {
	ScreenBottomActions,
	ScreenBottomArea,
	ScreenBottomNote,
	ScreenBottomNoteLine,
} from "../../../src/Components/Patterns/ScreenBottomArea";

export function PresentPagePreview() {
	const notes = [
		{
			text: "Expired presents are removed automatically.",
		},
		{
			isAccent: true,
			text: "You can hold up to 100 claimable presents.",
		},
	] as const;

	return (
		<ScreenPageRoot>
			<ScreenTitleBar>Present Box</ScreenTitleBar>
			<ScreenPageBody>
				<ScreenPageContent>
					<ScreenPageCenter>
					<ScreenPageEmptyState>
						There are no presents available to claim.
					</ScreenPageEmptyState>
					</ScreenPageCenter>
					<ScreenBottomArea>
						<ScreenBottomNote>
							{notes.map((note) => (
								<ScreenBottomNoteLine
									key={note.text}
									isAccent={note.isAccent}
								>
									{note.text}
								</ScreenBottomNoteLine>
							))}
						</ScreenBottomNote>
						<ScreenBottomActions>
							<Button size="lg" variant="secondary">
								History
							</Button>
							<Button disabled size="lg" variant="primary">
								Claim All
							</Button>
						</ScreenBottomActions>
					</ScreenBottomArea>
				</ScreenPageContent>
			</ScreenPageBody>
		</ScreenPageRoot>
	);
}
