import { Button } from "../../../src/Components/System/Button";
import { LuGift } from "react-icons/lu";
import {
	ScreenCardList,
	ScreenCardListAction,
	ScreenCardListBody,
	ScreenCardListDescription,
	ScreenCardListDivider,
	ScreenCardListItem,
	ScreenCardListItems,
	ScreenCardListMetaLabel,
	ScreenCardListMetaRow,
	ScreenCardListMetaText,
	ScreenCardListStatus,
	ScreenCardListThumb,
	ScreenCardListThumbCount,
	ScreenCardListThumbFrame,
	ScreenCardListTitle,
} from "../../../src/Components/Patterns/ScreenCardList";
import {
	ScreenPageBody,
	ScreenPageContent,
	ScreenPageRoot,
} from "../../../src/Components/Patterns/ScreenPage";
import { ScreenTitleBar } from "../../../src/Components/Patterns/ScreenTitleBar";
import {
	ScreenBottomActions,
	ScreenBottomArea,
	ScreenBottomNote,
	ScreenBottomNoteLine,
} from "../../../src/Components/Patterns/ScreenBottomArea";
import { presentItemsPreview } from "./presentItemsData";

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
					<ScreenCardList>
						<ScreenCardListItems>
							{presentItemsPreview.map((item) => (
								<ScreenCardListItem key={item.id}>
									<ScreenCardListThumb>
										<ScreenCardListThumbFrame>
											<LuGift aria-hidden="true" className="h-6 w-6" />
										</ScreenCardListThumbFrame>
										<ScreenCardListThumbCount>
											{item.quantityLabel}
										</ScreenCardListThumbCount>
									</ScreenCardListThumb>
									<ScreenCardListBody>
										<ScreenCardListTitle>{item.title}</ScreenCardListTitle>
										<ScreenCardListDivider />
										<ScreenCardListDescription>
											{item.message}
										</ScreenCardListDescription>
										<ScreenCardListMetaRow>
											<ScreenCardListMetaLabel>
												Acquired
											</ScreenCardListMetaLabel>
											<ScreenCardListMetaText>
												{item.acquiredAt}
											</ScreenCardListMetaText>
											<ScreenCardListStatus>
												Reward Item
											</ScreenCardListStatus>
											<ScreenCardListMetaText className="text-ll-pink">
												{item.status}
											</ScreenCardListMetaText>
										</ScreenCardListMetaRow>
									</ScreenCardListBody>
									<ScreenCardListAction>Claim</ScreenCardListAction>
								</ScreenCardListItem>
							))}
						</ScreenCardListItems>
					</ScreenCardList>
					<ScreenBottomArea>
						<ScreenBottomNote>
							{notes.map((note) => (
								<ScreenBottomNoteLine
									key={note.text}
									{...("isAccent" in note ? { isAccent: note.isAccent } : {})}
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
