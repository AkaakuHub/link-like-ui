import {
	noticeTabValues,
	type NoticeTabValue,
	useNoticeModalStore,
} from "../stores/useNoticeModalStore";
import { Button } from "../../../src/System/Button";
import {
	ListActionButton,
	ListCard,
	ListCardHeader,
	ListCardHeading,
	ListCardLead,
	ListCardMeta,
	ListCardText,
	ListDetailActions,
	ListDetailBody,
	ListDetailImage,
	ListItems,
	ListNoticeCard,
	ListRoot,
} from "../../../src/System/List";
import {
	ModalTabList,
	ModalTabPanel,
	ModalTabRoot,
	ModalTabTrigger,
} from "../../../src/System/ModalTab";
import { Separator } from "../../../src/System/Separator";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalStack,
	SystemModalTitle,
	SystemModalTrigger,
} from "../../../src/System/SystemModal";
import {
	findNoticeItemById,
	isNoticeTabValue,
	noticeRowsByTab,
	noticeTabs,
} from "./noticeData";

export function NoticeModalPreview() {
	const activeNoticeTab = useNoticeModalStore((state) => state.activeTab);
	const noticeHistory = useNoticeModalStore((state) => state.history);
	const isListModalOpen = useNoticeModalStore((state) => state.isOpen);
	const setNoticeTab = useNoticeModalStore((state) => state.setTab);
	const openNoticeDetail = useNoticeModalStore((state) => state.openDetail);
	const backNoticeView = useNoticeModalStore((state) => state.back);
	const setListModalOpen = useNoticeModalStore((state) => state.setModalOpen);

	function handleNoticeTabChange(value: string) {
		if (isNoticeTabValue(value)) {
			setNoticeTab(value);
		}
	}

	function handleListModalOpenChange(nextOpen: boolean) {
		setListModalOpen(nextOpen);
	}

	const currentNoticeView = noticeHistory[noticeHistory.length - 1];
	const currentNoticeDetailItem =
		currentNoticeView?.type === "detail"
			? findNoticeItemById(currentNoticeView.itemId)
			: null;

	return (
		<>
			<SystemModal open={isListModalOpen} onOpenChange={handleListModalOpenChange}>
				<SystemModalTrigger asChild>
					<Button size="lg" variant="secondary">
						Open List Modal
					</Button>
				</SystemModalTrigger>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>お知らせ</SystemModalTitle>
					</SystemModalHeader>
					<ModalTabRoot
						value={activeNoticeTab}
						onValueChange={handleNoticeTabChange}
					>
						<ModalTabList>
							{noticeTabs.map((tabItem) => (
								<ModalTabTrigger key={tabItem.value} value={tabItem.value}>
									{tabItem.label}
								</ModalTabTrigger>
							))}
						</ModalTabList>
						<SystemModalBody padding="compact">
							{noticeTabs.map((tabItem) => (
								<ModalTabPanel key={tabItem.value} value={tabItem.value}>
									<ListRoot>
										<ListItems>
											{noticeRowsByTab[tabItem.value].map((row) => (
												<ListNoticeCard
													key={row.id}
													heading={row.heading}
													meta={row.meta}
													onAction={() => {
														openNoticeDetail(row.id);
													}}
													text={row.text}
												/>
											))}
										</ListItems>
									</ListRoot>
								</ModalTabPanel>
							))}
						</SystemModalBody>
					</ModalTabRoot>
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
			<SystemModal
				open={currentNoticeView?.type === "detail"}
				onOpenChange={(nextOpen) => {
					if (!nextOpen) {
						backNoticeView();
					}
				}}
			>
				<SystemModalContent width="md">
					<SystemModalHeader>
						<SystemModalTitle>お知らせ</SystemModalTitle>
					</SystemModalHeader>
					<SystemModalBody padding="compact">
						<ListRoot>
							<ListDetailBody>
								<SystemModalStack spacing="sm">
									<ListCard>
										<SystemModalStack spacing="sm">
											<ListCardHeader>
												<ListCardLead>
													<ListCardHeading>
														{currentNoticeDetailItem?.heading ?? "お知らせ"}
													</ListCardHeading>
													<ListCardMeta>
														{currentNoticeDetailItem?.meta ?? ""}
													</ListCardMeta>
												</ListCardLead>
												<ListActionButton onClick={backNoticeView}>
													戻る
												</ListActionButton>
											</ListCardHeader>
											<Separator />
											<ListCardText>{currentNoticeDetailItem?.text ?? ""}</ListCardText>
										</SystemModalStack>
									</ListCard>
									<ListDetailImage />
									{(currentNoticeDetailItem?.detail ?? []).map((line) => (
										<p key={line}>{line}</p>
									))}
									<ListDetailActions>
										<ListActionButton onClick={backNoticeView}>戻る</ListActionButton>
									</ListDetailActions>
								</SystemModalStack>
							</ListDetailBody>
						</ListRoot>
					</SystemModalBody>
				</SystemModalContent>
			</SystemModal>
		</>
	);
}
