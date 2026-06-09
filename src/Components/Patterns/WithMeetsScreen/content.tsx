import {
	type RefObject,
	type UIEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	LuChevronDown,
	LuChevronLeft,
	LuExpand,
	LuGift,
	LuList,
	LuMail,
	LuMessageCircle,
	LuMinimize,
	LuPause,
	LuPlay,
	LuRadio,
	LuSend,
	LuSettings2,
	LuSmile,
	LuStar,
	LuTrophy,
	LuX,
} from "react-icons/lu";
import SimpleBar from "simplebar-react";
import {
	WithMeetsControlRow,
	WithMeetsFrame,
	WithMeetsIconButton,
	WithMeetsMenuButton,
	WithMeetsPanel,
	WithMeetsPanelBody,
	WithMeetsPanelHeader,
	WithMeetsPanelTitle,
	WithMeetsPlayBadge,
	WithMeetsProgressArea,
	WithMeetsRoot,
	WithMeetsScoreTrack,
	WithMeetsSideActions,
	WithMeetsStageImage,
	WithMeetsStageVideo,
	WithMeetsTopBar,
	WithMeetsVideoViewport,
} from "./structure";
import { useWithMeetsVirtualList } from "./virtualList";

export interface WithMeetsCommentInput {
	id: string;
	message: string;
	userName: string;
}

export interface WithMeetsGiftInput {
	amount: string;
	id: string;
	label: string;
	userName: string;
}

export interface WithMeetsChapterInput {
	isExtra: boolean;
	name: string;
	playTimeSecond: number | null;
}

export interface WithMeetsScreenProps {
	chapters?: readonly WithMeetsChapterInput[];
	comments: readonly WithMeetsCommentInput[];
	description?: string;
	gifts: readonly WithMeetsGiftInput[];
	isHorizontal?: boolean;
	onBack?: () => void;
	posterAlt: string;
	posterSrc: string;
	title?: string;
	playbackDuration?: number;
	playbackRate?: number;
	isPlaying?: boolean;
	playbackTime?: number;
	onPlaybackToggle?: () => void;
	onPlaybackRateChange?: (rate: number) => void;
	onSeek?: (seconds: number) => void;
	onSettingsOpen?: () => void;
	showSupportSummary?: boolean;
	videoRef?: RefObject<HTMLVideoElement | null>;
	videoMuted?: boolean;
	videoSrc?: string;
}

type WithMeetsPanelMode = "chapters" | "comments" | "gifts" | "info" | "none";

function WithMeetsScoreMeter() {
	const stars = ["current", "one", "two", "three"] as const;

	return (
		<WithMeetsScoreTrack>
			<div className="absolute top-[0.7em] right-0 left-0 h-[0.22em] rounded-full bg-ll-true-white/76" />
			<div className="absolute top-0 left-[6%] rounded-full bg-ll-true-white px-[0.7em] py-[0.25em] text-[0.68em] leading-none font-semibold text-ll-gray">
				AFTER
			</div>
			<div className="absolute inset-x-0 top-[0.35em] flex justify-around">
				{stars.map((star) => (
					<LuStar
						key={star}
						className="h-[1.7em] w-[1.7em] fill-ll-label stroke-ll-true-white stroke-[1.5] drop-shadow-[0_1px_2px_var(--color-ll-gray)]"
					/>
				))}
			</div>
			<div className="absolute top-[2.1em] left-0 flex w-full items-center justify-between text-[0.9em] leading-none font-semibold text-ll-true-white">
				<span>Current</span>
				<span>0 pt</span>
				<span>Next star</span>
				<span>10,000 pt</span>
			</div>
		</WithMeetsScoreTrack>
	);
}

function WithMeetsPlaybackControls({
	duration,
	isPlaying,
	onSeek,
	onToggle,
	onRateChange,
	onMenuOpen,
	orientation,
	rate,
	time,
}: {
	duration: number;
	isPlaying: boolean;
	onMenuOpen: () => void;
	onRateChange: ((rate: number) => void) | undefined;
	onSeek: ((seconds: number) => void) | undefined;
	onToggle: (() => void) | undefined;
	orientation: "horizontal" | "vertical";
	rate: number;
	time: number;
}) {
	const progress = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;
	const playbackRates: readonly number[] = [1, 1.5, 2, 3, 4];
	return (
		<WithMeetsProgressArea data-orientation={orientation}>
			<button
				type="button"
				className="relative grid h-[1.4em] w-full items-center"
				onClick={(event) => {
					const rect = event.currentTarget.getBoundingClientRect();
					const ratio = (event.clientX - rect.left) / rect.width;
					onSeek?.(Math.max(0, Math.min(duration, duration * ratio)));
				}}
			>
				<span className="absolute inset-x-0 h-[0.5em] rounded-full bg-ll-disabled/88" />
				<span
					className="absolute left-0 h-[0.5em] rounded-full bg-ll-red"
					style={{ width: `${progress}%` }}
				/>
				<span
					className="absolute h-[1em] w-[1em] -translate-x-1/2 rounded-full bg-ll-red shadow-[0_1px_4px_color-mix(in_srgb,var(--color-ll-black)_30%,transparent)]"
					style={{ left: `${progress}%` }}
				/>
			</button>
			<WithMeetsControlRow>
				<div className="inline-flex items-center gap-[1.15em] text-[0.95em] font-semibold">
					<button
						type="button"
						className="grid h-[1.8em] w-[1.8em] place-items-center text-[1.8em] leading-none"
						onClick={onToggle}
					>
						{isPlaying ? (
							<LuPause className="h-[0.82em] w-[0.82em] fill-ll-true-white" />
						) : (
							<LuPlay className="h-[0.82em] w-[0.82em] fill-ll-true-white" />
						)}
					</button>
					<span>{formatPlaybackTime(time)}</span>
					<span className="text-[1.2em] font-light">/</span>
					<span className="text-ll-true-white/72">
						{formatPlaybackTime(duration)}
					</span>
					<button
						type="button"
						className="min-h-[2.35em] min-w-[4.6em] rounded-full border border-ll-true-white/62 bg-ll-black/24 px-[1em] text-[0.98em] leading-none font-semibold text-ll-true-white shadow-[0_1px_4px_color-mix(in_srgb,var(--color-ll-black)_30%,transparent)]"
						onClick={() => {
							const currentIndex = playbackRates.indexOf(rate);
							const nextRate =
								playbackRates[(currentIndex + 1) % playbackRates.length] ?? 1;
							onRateChange?.(nextRate);
						}}
					>
						{formatPlaybackRate(rate)}
					</button>
				</div>
				<WithMeetsMenuButton type="button" onClick={onMenuOpen}>
					<LuChevronLeft className="h-[1.25em] w-[1.25em]" />
					<span>MENU</span>
				</WithMeetsMenuButton>
			</WithMeetsControlRow>
		</WithMeetsProgressArea>
	);
}

function WithMeetsVirtualTimeline({
	comments,
}: {
	comments: readonly WithMeetsCommentInput[];
}) {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const previousCommentCountRef = useRef<number>(0);
	const isProgrammaticScrollRef = useRef<boolean>(false);
	const [scrollTop, setScrollTop] = useState<number>(0);
	const [isFollowingLatest, setFollowingLatest] = useState<boolean>(true);
	const viewportHeight = 610;
	const itemHeight = 52;
	const commentCount = comments.length;
	const { items, totalHeight } = useWithMeetsVirtualList({
		itemCount: commentCount,
		itemHeight,
		overscan: 6,
		scrollTop,
		viewportHeight,
	});

	useEffect(() => {
		const hasNewComment = commentCount !== previousCommentCountRef.current;
		previousCommentCountRef.current = commentCount;

		if (!hasNewComment) return;
		if (!isFollowingLatest) return;

		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		isProgrammaticScrollRef.current = true;
		scrollContainer.scrollTop = scrollContainer.scrollHeight;
		setScrollTop(scrollContainer.scrollTop);
		requestAnimationFrame(() => {
			isProgrammaticScrollRef.current = false;
		});
	}, [commentCount, isFollowingLatest]);

	function scrollToLatest() {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		setFollowingLatest(true);
		isProgrammaticScrollRef.current = true;
		scrollContainer.scrollTop = scrollContainer.scrollHeight;
		setScrollTop(scrollContainer.scrollTop);
		requestAnimationFrame(() => {
			isProgrammaticScrollRef.current = false;
		});
	}

	return (
		<div className="relative h-full min-h-0 overflow-hidden">
			<SimpleBar
				autoHide={false}
				className="ll-system-modal-scrollbar h-full min-h-0"
				style={{ height: "100%" }}
				scrollableNodeProps={{
					onScroll: (event: UIEvent<HTMLDivElement>) => {
						const scrollContainer = event.currentTarget;
						const distanceFromBottom =
							scrollContainer.scrollHeight -
							scrollContainer.clientHeight -
							scrollContainer.scrollTop;
						setScrollTop(scrollContainer.scrollTop);
						if (!isProgrammaticScrollRef.current) {
							setFollowingLatest(distanceFromBottom < 48);
						}
					},
					ref: scrollContainerRef,
					style: { height: "100%", overscrollBehavior: "contain" },
				}}
			>
				<div className="px-[1em]">
					<div className="relative" style={{ height: totalHeight }}>
						{items.map((virtualItem) => {
							const comment = comments[virtualItem.index];

							if (!comment) {
								return null;
							}

							return (
								<div
									key={comment.id}
									className="absolute right-0 left-0 grid content-center leading-tight"
									style={{
										height: itemHeight,
										transform: `translateY(${virtualItem.offsetTop}px)`,
									}}
								>
									<p className="wrap-break-word text-ll-true-white/88">
										<span className="font-semibold">{comment.userName}: </span>
										{comment.message}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</SimpleBar>
			{isFollowingLatest ? null : (
				<button
					type="button"
					className="absolute right-[1em] bottom-[0.8em] inline-flex items-center gap-[0.35em] rounded-full bg-ll-red px-[0.85em] py-[0.45em] text-[0.72em] font-semibold text-ll-true-white shadow-[0_0.35em_1em_color-mix(in_srgb,var(--color-ll-black)_35%,transparent)]"
					onClick={scrollToLatest}
				>
					<LuChevronDown className="h-[1.1em] w-[1.1em]" />
					<span>最新へ</span>
				</button>
			)}
		</div>
	);
}

function WithMeetsVirtualGifts({
	gifts,
}: {
	gifts: readonly WithMeetsGiftInput[];
}) {
	const [scrollTop, setScrollTop] = useState<number>(0);
	const viewportHeight = 610;
	const itemHeight = 64;
	const { items, totalHeight } = useWithMeetsVirtualList({
		itemCount: gifts.length,
		itemHeight,
		overscan: 5,
		scrollTop,
		viewportHeight,
	});

	return (
		<div
			className="h-full overflow-y-auto px-[1em] py-[0.8em]"
			onScroll={(event) => {
				setScrollTop(event.currentTarget.scrollTop);
			}}
		>
			<div className="relative" style={{ height: totalHeight }}>
				{items.map((virtualItem) => {
					const gift = gifts[virtualItem.index];

					if (!gift) {
						return null;
					}

					return (
						<div
							key={gift.id}
							className="absolute right-0 left-0 flex items-center gap-[0.75em] rounded-[0.45em] bg-ll-badge-orange px-[0.8em] text-[0.74em] leading-tight"
							style={{
								height: itemHeight - 10,
								transform: `translateY(${virtualItem.offsetTop}px)`,
							}}
						>
							<div className="grid h-[2.2em] w-[2.2em] place-items-center rounded-full bg-ll-true-white text-ll-badge-orange">
								<LuGift className="h-[1.25em] w-[1.25em]" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate font-semibold">{gift.userName}</p>
								<p className="truncate text-ll-true-white/88">{gift.label}</p>
							</div>
							<p className="font-semibold">{gift.amount}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function WithMeetsSidePanel({
	chapters,
	comments,
	description,
	gifts,
	isSurfaceVisible,
	mode,
	onClose,
	onSeek,
	onModeChange,
	orientation,
	playbackTime,
	showSupportSummary,
	title,
}: {
	chapters: readonly WithMeetsChapterInput[];
	comments: readonly WithMeetsCommentInput[];
	description: string;
	gifts: readonly WithMeetsGiftInput[];
	isSurfaceVisible: boolean;
	mode: Exclude<WithMeetsPanelMode, "none">;
	onClose: () => void;
	onSeek: ((seconds: number) => void) | undefined;
	onModeChange: (mode: Exclude<WithMeetsPanelMode, "none">) => void;
	playbackTime: number;
	showSupportSummary: boolean;
	title: string;
	orientation: "horizontal" | "vertical";
}) {
	const tabLabels =
		mode === "comments"
			? ["タイムライン"]
			: mode === "info"
				? ["概要"]
				: mode === "chapters"
					? ["チャプター選択"]
					: ["ギフトログ"];

	return (
		<WithMeetsPanel
			data-orientation={orientation}
			className={
				isSurfaceVisible
					? undefined
					: "bg-transparent shadow-none backdrop-blur-none"
			}
		>
			<div
				className={
					isSurfaceVisible
						? "absolute inset-0 bg-ll-gray/48 opacity-100 backdrop-blur-[0.26em] transition-opacity duration-200"
						: "absolute inset-0 bg-ll-gray/48 opacity-0 backdrop-blur-[0.26em] transition-opacity duration-200"
				}
			/>
			<div
				className={
					isSurfaceVisible
						? "absolute top-0 right-0 bottom-0 w-[4.8em] bg-ll-black/78 opacity-100 transition-opacity duration-200"
						: "absolute top-0 right-0 bottom-0 w-[4.8em] bg-ll-black/78 opacity-0 transition-opacity duration-200"
				}
			/>
			<WithMeetsPanelHeader
				className={
					isSurfaceVisible
						? "relative z-10 h-[3.7em] grid-cols-[1fr_auto] bg-ll-gray/54 pr-[5.7em] opacity-100 transition-opacity duration-200"
						: "pointer-events-none absolute inset-x-0 top-0 z-10 h-[3.7em] grid-cols-[1fr_auto] bg-ll-gray/54 pr-[5.7em] opacity-0 transition-opacity duration-200"
				}
			>
				<div className="flex items-center justify-around text-ll-true-white/52">
					<button
						aria-label="Show comments"
						className={
							mode === "comments"
								? "text-ll-true-white"
								: "text-ll-true-white/54"
						}
						type="button"
						onClick={() => {
							onModeChange("comments");
						}}
					>
						<LuMessageCircle className="h-[1.55em] w-[1.55em]" />
					</button>
					<button
						aria-label="Show info"
						className={
							mode === "info" ? "text-ll-true-white" : "text-ll-true-white/54"
						}
						type="button"
						onClick={() => {
							onModeChange("info");
						}}
					>
						<LuTrophy className="h-[1.55em] w-[1.55em]" />
					</button>
					<button
						aria-label="Show gifts"
						className={
							mode === "gifts" ? "text-ll-true-white" : "text-ll-true-white/54"
						}
						type="button"
						onClick={() => {
							onModeChange("gifts");
						}}
					>
						<LuRadio className="h-[1.55em] w-[1.55em]" />
					</button>
					<button
						aria-label="Show chapters"
						className={
							mode === "chapters"
								? "text-ll-true-white"
								: "text-ll-true-white/54"
						}
						type="button"
						onClick={() => {
							onModeChange("chapters");
						}}
					>
						<LuList className="h-[1.55em] w-[1.55em]" />
					</button>
				</div>
				<WithMeetsIconButton type="button" onClick={onClose}>
					<LuX className="h-[1.75em] w-[1.75em]" />
				</WithMeetsIconButton>
			</WithMeetsPanelHeader>
			<div
				className={
					isSurfaceVisible
						? "relative z-10 flex h-[3.05em] items-end gap-[1.7em] bg-ll-tab-active/72 px-[1.3em] pr-[6em] text-[0.92em] font-semibold text-ll-true-white/58 opacity-100 transition-opacity duration-200"
						: "pointer-events-none absolute inset-x-0 top-[3.7em] z-10 flex h-[3.05em] items-end gap-[1.7em] bg-ll-tab-active/72 px-[1.3em] pr-[6em] text-[0.92em] font-semibold text-ll-true-white/58 opacity-0 transition-opacity duration-200"
				}
			>
				{tabLabels.map((label, index) => (
					<span
						key={label}
						className={
							index === 0
								? "relative pb-[0.65em] text-ll-true-white after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[0.16em] after:bg-ll-true-white"
								: "pb-[0.65em]"
						}
					>
						{label}
					</span>
				))}
			</div>
			<WithMeetsPanelBody
				className={
					isSurfaceVisible
						? "relative z-10 h-[calc(100%-6.75em)] pr-[4.8em]"
						: "relative z-10 h-full pr-[0.7em] pt-[1em]"
				}
			>
				{mode === "comments" ? (
					<div
						className={
							isSurfaceVisible
								? showSupportSummary
									? "grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto]"
									: "grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto]"
								: showSupportSummary
									? "grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]"
									: "grid h-full min-h-0 grid-rows-[minmax(0,1fr)]"
						}
					>
						{showSupportSummary ? (
							<div className="mx-[1em] mt-[0.7em] flex items-center rounded-[0.45em] bg-ll-badge-orange px-[0.55em] py-[0.5em]">
								<img
									alt="support avatar"
									className="h-[2.3em] w-[2.3em] rounded-full border border-ll-true-white"
									src="https://placehold.jp/150x150.png"
								/>
								<div className="ml-[0.7em] flex-1 text-[0.82em] font-semibold leading-tight">
									<p>Viewer 001:</p>
									<p>10,000 pt</p>
								</div>
								<span className="rounded-full bg-ll-badge-red px-[0.5em] py-[0.2em] text-[0.68em] font-semibold">
									x100
								</span>
							</div>
						) : null}
						<WithMeetsVirtualTimeline comments={comments} />
						{isSurfaceVisible ? (
							<div className="flex items-center gap-[0.55em] p-[0.8em]">
								<button type="button" className="text-ll-true-white/55">
									<LuSmile className="h-[2em] w-[2em]" />
								</button>
								<div className="flex h-[2.8em] flex-1 items-center justify-between rounded-full bg-ll-tab-active/95 px-[1.2em] text-[0.8em] font-semibold text-ll-true-white/42">
									<span>Enter comment</span>
									<LuSend className="h-[1.4em] w-[1.4em] text-ll-label/72" />
								</div>
							</div>
						) : null}
					</div>
				) : null}
				{mode === "gifts" ? <WithMeetsVirtualGifts gifts={gifts} /> : null}
				{mode === "info" ? (
					<div className="px-[1.25em] py-[1.6em] text-ll-true-white">
						<WithMeetsPanelTitle className="text-[1.25em]">
							{title}
						</WithMeetsPanelTitle>
						<div className="my-[1.4em] h-px bg-ll-true-white/28" />
						<div className="space-y-[0.7em] text-[0.9em] leading-relaxed text-ll-true-white/86">
							{description.split("\n").map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
					</div>
				) : null}
				{mode === "chapters" ? (
					<div className="grid gap-[0.6em] p-[1.4em]">
						{chapters.map((chapter, index) => {
							const isActive = isActiveChapter(chapters, index, playbackTime);

							return (
								<button
									key={`${chapter.name}-${chapter.playTimeSecond ?? index}`}
									className={
										isActive
											? "flex h-[3.2em] items-center justify-between rounded-[0.35em] bg-linear-to-r from-ll-system-left to-ll-system-right px-[1.1em] text-[0.82em] font-semibold text-ll-true-white"
											: "flex h-[3.2em] items-center justify-between rounded-[0.35em] bg-ll-table px-[1.1em] text-[0.82em] font-semibold text-ll-true-white/78 disabled:text-ll-true-white/34"
									}
									type="button"
									disabled={chapter.playTimeSecond === null}
									onClick={() => {
										if (chapter.playTimeSecond === null) return;
										onSeek?.(Math.max(0, chapter.playTimeSecond));
									}}
								>
									<span>{chapter.name}</span>
									<span>{formatChapterTime(chapter.playTimeSecond)}</span>
								</button>
							);
						})}
					</div>
				) : null}
				{isSurfaceVisible ? (
					<div className="absolute right-0 bottom-[0.6em] grid w-[4.8em] justify-items-center gap-[1.2em] text-ll-true-white">
						<button
							aria-label="Show info"
							className="grid h-[2.6em] w-[2.6em] place-items-center rounded-full text-ll-true-white/62"
							type="button"
							onClick={() => {
								onModeChange("info");
							}}
						>
							<LuMail className="h-[1.9em] w-[1.9em]" />
						</button>
						<button
							aria-label="Show gifts"
							className="grid h-[2.6em] w-[2.6em] place-items-center rounded-full text-ll-true-white"
							type="button"
							onClick={() => {
								onModeChange("gifts");
							}}
						>
							<LuGift className="h-[2em] w-[2em]" />
						</button>
					</div>
				) : null}
			</WithMeetsPanelBody>
		</WithMeetsPanel>
	);
}

export function WithMeetsScreen({
	chapters = [],
	comments,
	description = "",
	gifts,
	isHorizontal = true,
	onBack,
	posterAlt,
	posterSrc,
	title = posterAlt,
	isPlaying = false,
	playbackDuration = 0,
	playbackRate = 1,
	playbackTime = 0,
	onPlaybackToggle,
	onPlaybackRateChange,
	onSeek,
	onSettingsOpen,
	showSupportSummary = true,
	videoRef,
	videoMuted = false,
	videoSrc,
}: WithMeetsScreenProps) {
	const [panelMode, setPanelMode] = useState<WithMeetsPanelMode>("comments");
	const [isPanelSurfaceVisible, setPanelSurfaceVisible] =
		useState<boolean>(true);
	const [isBackConfirmVisible, setBackConfirmVisible] =
		useState<boolean>(false);
	const [isChromeVisible, setChromeVisible] = useState<boolean>(true);
	const [lastChromeInteractionAt, setLastChromeInteractionAt] =
		useState<number>(Date.now());
	const frameRef = useRef<HTMLDivElement | null>(null);
	const revealChrome = useCallback(() => {
		setChromeVisible(true);
		setLastChromeInteractionAt(Date.now());
	}, []);
	const openPanel = useCallback((mode: Exclude<WithMeetsPanelMode, "none">) => {
		setPanelMode(mode);
		setPanelSurfaceVisible(true);
	}, []);
	const toggleFullscreen = useCallback(() => {
		if (document.fullscreenElement) {
			void document.exitFullscreen();
			return;
		}

		void frameRef.current?.requestFullscreen();
	}, []);

	useEffect(() => {
		if (!isChromeVisible) return;
		const interactionStartedAt = lastChromeInteractionAt;

		const timeoutId = globalThis.setTimeout(() => {
			if (interactionStartedAt !== lastChromeInteractionAt) return;
			setChromeVisible(false);
		}, 3200);

		return () => {
			globalThis.clearTimeout(timeoutId);
		};
	}, [isChromeVisible, lastChromeInteractionAt]);

	const chromeVisibilityClass = isChromeVisible
		? "opacity-100 transition-opacity duration-300"
		: "pointer-events-none opacity-0 transition-opacity duration-500";
	const orientation = isHorizontal ? "horizontal" : "vertical";

	return (
		<WithMeetsRoot>
			<WithMeetsFrame
				ref={frameRef}
				data-orientation={orientation}
				onKeyDown={revealChrome}
				onPointerDown={revealChrome}
				onPointerMove={revealChrome}
				onTouchStart={revealChrome}
			>
				<WithMeetsVideoViewport
					data-orientation={orientation}
					onClick={() => {
						setChromeVisible(true);
						if (panelMode !== "none") {
							setPanelSurfaceVisible((currentValue) => !currentValue);
						}
					}}
				>
					{videoSrc ? (
						<WithMeetsStageVideo
							ref={videoRef}
							className={isHorizontal ? "object-cover" : "object-contain"}
							poster={posterSrc}
							controls={false}
							muted={videoMuted}
						/>
					) : (
						<WithMeetsStageImage alt={posterAlt} src={posterSrc} />
					)}
				</WithMeetsVideoViewport>
				<WithMeetsTopBar className={chromeVisibilityClass}>
					<div className="flex items-start gap-[0.75em]">
						<WithMeetsIconButton
							type="button"
							aria-label="Back"
							onClick={() => {
								setBackConfirmVisible(true);
							}}
						>
							<LuChevronLeft className="h-[1.7em] w-[1.7em]" />
						</WithMeetsIconButton>
						<WithMeetsPlayBadge>
							<LuPlay className="h-[0.8em] w-[0.8em] fill-ll-true-white" />
							<span>PLAY</span>
						</WithMeetsPlayBadge>
					</div>
					<WithMeetsScoreMeter />
				</WithMeetsTopBar>
				<WithMeetsSideActions className={chromeVisibilityClass}>
					<WithMeetsIconButton
						type="button"
						aria-label="Fullscreen"
						onClick={toggleFullscreen}
					>
						<LuExpand className="h-[1.75em] w-[1.75em]" />
					</WithMeetsIconButton>
					<WithMeetsIconButton
						type="button"
						aria-label="Comments"
						onClick={() => {
							openPanel("comments");
						}}
					>
						<LuMessageCircle className="h-[1.75em] w-[1.75em]" />
					</WithMeetsIconButton>
					<WithMeetsIconButton
						type="button"
						aria-label="Gift log"
						onClick={() => {
							openPanel("gifts");
						}}
					>
						<LuGift className="h-[1.75em] w-[1.75em]" />
					</WithMeetsIconButton>
					<WithMeetsIconButton
						type="button"
						aria-label="Info"
						onClick={() => {
							onSettingsOpen?.();
						}}
					>
						<LuSettings2 className="h-[1.75em] w-[1.75em]" />
					</WithMeetsIconButton>
					<WithMeetsIconButton
						type="button"
						aria-label="Chapter select"
						onClick={() => {
							openPanel("chapters");
						}}
					>
						<LuMinimize className="h-[1.75em] w-[1.75em]" />
					</WithMeetsIconButton>
				</WithMeetsSideActions>
				<div className={chromeVisibilityClass}>
					<WithMeetsPlaybackControls
						duration={playbackDuration}
						isPlaying={isPlaying}
						onMenuOpen={() => {
							openPanel("comments");
						}}
						onRateChange={onPlaybackRateChange}
						onSeek={onSeek}
						onToggle={onPlaybackToggle}
						orientation={orientation}
						rate={playbackRate}
						time={playbackTime}
					/>
				</div>
				{panelMode === "none" ? null : (
					<WithMeetsSidePanel
						chapters={chapters}
						comments={comments}
						description={description}
						gifts={gifts}
						isSurfaceVisible={isPanelSurfaceVisible}
						mode={panelMode}
						orientation={orientation}
						onClose={() => {
							setPanelMode("none");
						}}
						onSeek={onSeek}
						onModeChange={(nextMode) => {
							setPanelMode(nextMode);
							setPanelSurfaceVisible(true);
						}}
						playbackTime={playbackTime}
						showSupportSummary={showSupportSummary}
						title={title}
					/>
				)}
				{isBackConfirmVisible ? (
					<div className="absolute inset-0 z-30 grid place-items-center bg-ll-black/62 px-[12%] text-ll-gray">
						<div className="w-full max-w-[36em] overflow-hidden rounded-[1.35em] bg-ll-true-white shadow-[0_1em_3em_color-mix(in_srgb,var(--color-ll-black)_45%,transparent)]">
							<div className="bg-linear-to-r from-ll-system-left to-ll-system-right px-[1.2em] py-[0.8em] text-center text-[1.5em] font-semibold text-ll-true-white">
								戻る
							</div>
							<div className="p-[1.8em]">
								<div className="grid min-h-[8em] place-items-center rounded-[0.6em] bg-ll-table/18 px-[1em] text-center text-[1.15em] font-semibold">
									前の画面に戻ります
								</div>
								<div className="mt-[1.8em] grid grid-cols-2 gap-[1.3em]">
									<button
										className="h-[3.4em] rounded-[0.6em] border border-ll-gray/18 bg-ll-true-white text-[1.05em] font-semibold shadow-[0_0.25em_1em_color-mix(in_srgb,var(--color-ll-black)_12%,transparent)]"
										type="button"
										onClick={() => {
											setBackConfirmVisible(false);
										}}
									>
										キャンセル
									</button>
									<button
										className="h-[3.4em] rounded-[0.6em] bg-linear-to-r from-ll-system-left to-ll-system-right text-[1.05em] font-semibold text-ll-true-white shadow-[0_0.25em_1em_color-mix(in_srgb,var(--color-ll-black)_18%,transparent)]"
										type="button"
										onClick={onBack}
									>
										OK
									</button>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</WithMeetsFrame>
		</WithMeetsRoot>
	);
}

function formatChapterTime(seconds: number | null) {
	if (seconds === null) return "--:--";

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function isActiveChapter(
	chapters: readonly WithMeetsChapterInput[],
	index: number,
	playbackTime: number,
) {
	const chapter = chapters[index];
	const chapterStart = chapter?.playTimeSecond;

	if (chapterStart === null || chapterStart === undefined) return false;
	if (playbackTime < chapterStart) return false;

	const nextChapter = chapters
		.slice(index + 1)
		.find((candidate) => candidate.playTimeSecond !== null);
	return (
		nextChapter?.playTimeSecond === null ||
		nextChapter?.playTimeSecond === undefined ||
		playbackTime < nextChapter.playTimeSecond
	);
}

function formatPlaybackTime(seconds: number) {
	if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function formatPlaybackRate(rate: number) {
	return `${rate.toFixed(Number.isInteger(rate) ? 0 : 1)}x`;
}
