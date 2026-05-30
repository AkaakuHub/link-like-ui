import { WithMeetsScreen } from "../../../src/Components/Patterns/WithMeetsScreen";
import {
	withMeetsComments,
	withMeetsGifts,
	withMeetsPoster,
} from "./withMeetsData";

export function WithMeetsPreview() {
	function backToMedia() {
		globalThis.location.assign("/media");
	}

	return (
		<WithMeetsScreen
			comments={withMeetsComments}
			gifts={withMeetsGifts}
			onBack={backToMedia}
			posterAlt={withMeetsPoster.alt}
			posterSrc={withMeetsPoster.src}
		/>
	);
}
