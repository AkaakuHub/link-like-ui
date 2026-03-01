import type { ComponentPropsWithoutRef } from "react";
import { Separator } from "../Separator";
import {
	ListCard,
	ListCardHeader,
	ListCardHeading,
	ListCardMeta,
	ListCardText,
} from "./structure";

export interface ListNoticeCardProps
	extends Omit<ComponentPropsWithoutRef<typeof ListCard>, "children"> {
	heading: string;
	meta: string;
	text: string;
}

export function ListNoticeCard({
	heading,
	meta,
	text,
	...props
}: ListNoticeCardProps) {
	return (
		<ListCard {...props}>
			<div className="space-y-2">
				<ListCardHeader>
					<ListCardHeading>{heading}</ListCardHeading>
					<ListCardMeta>{meta}</ListCardMeta>
				</ListCardHeader>
				<Separator />
				<ListCardText>{text}</ListCardText>
			</div>
		</ListCard>
	);
}
