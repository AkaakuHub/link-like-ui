import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils";
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
	onAction?: (() => void) | undefined;
	text: string;
}

export function ListNoticeCard({
	heading,
	meta,
	onAction,
	text,
	className,
	onClick,
	...props
}: ListNoticeCardProps) {
	const handleClick: ComponentPropsWithoutRef<typeof ListCard>["onClick"] = (
		event,
	) => {
		onClick?.(event);
		onAction?.();
	};

	return (
		<ListCard
			className={cn(onAction ? "cursor-pointer" : "", className)}
			onKeyDown={
				onAction
					? (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								onAction();
							}
						}
					: undefined
			}
			onClick={onAction ? handleClick : onClick}
			role={onAction ? "button" : undefined}
			tabIndex={onAction ? 0 : undefined}
			{...props}
		>
			<div className="ll-stack-tight">
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
