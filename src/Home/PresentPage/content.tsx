import { Button } from "../../System/Button";
import {
	PresentPageActionRow,
	PresentPageBand,
	PresentPageBody,
	PresentPageEmptyState,
	PresentPageFooter,
	PresentPageNote,
	PresentPageRoot,
} from "./structure";

export interface PresentPageProps {
	actionLabel: string;
	emptyMessage: string;
	historyLabel: string;
	notes: readonly {
		isAccent?: boolean;
		text: string;
	}[];
	title: string;
}

export function PresentPage({
	actionLabel,
	emptyMessage,
	historyLabel,
	notes,
	title,
}: PresentPageProps) {
	return (
		<PresentPageRoot>
			<PresentPageBand>{title}</PresentPageBand>
			<PresentPageBody>
				<div className="grid place-items-center px-6">
					<PresentPageEmptyState>{emptyMessage}</PresentPageEmptyState>
				</div>
				<PresentPageFooter>
					<PresentPageNote>
						{notes.map((note) => (
							<span
								key={note.text}
								className={note.isAccent ? "text-ll-pink" : undefined}
							>
								{note.text}
							</span>
						))}
					</PresentPageNote>
					<PresentPageActionRow>
						<Button size="lg" variant="secondary">
							{historyLabel}
						</Button>
						<Button disabled size="lg" variant="primary">
							{actionLabel}
						</Button>
					</PresentPageActionRow>
				</PresentPageFooter>
			</PresentPageBody>
		</PresentPageRoot>
	);
}
