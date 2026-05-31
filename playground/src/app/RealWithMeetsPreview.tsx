import Hls from "hls.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WithMeetsScreen } from "../../../src/Components/Patterns/WithMeetsScreen";
import { LoadingOverlay } from "../../../src/Components/System/Loading";
import {
	fetchRealComments,
	fetchRealMediaItem,
	fetchRealRankings,
	type RealComment,
	type RealMediaItem,
} from "./realData";

type QueuedRealComment = RealComment & {
	displayAt: number;
};

export function RealWithMeetsPreview() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const commentLoadPromiseRef = useRef<Promise<void>>(Promise.resolve());
	const lastCommentFetchSecondRef = useRef<number>(-1);
	const lastFetchedCommentTimeMsRef = useRef<number>(0);
	const seekBaseCommentTimeMsRef = useRef<number>(0);
	const displayedCommentIdsRef = useRef<ReadonlySet<string>>(new Set());
	const queuedCommentIdsRef = useRef<ReadonlySet<string>>(new Set());
	const commentDisplayQueueRef = useRef<readonly QueuedRealComment[]>([]);
	const params = useMemo(
		() => new URLSearchParams(globalThis.location.search),
		[],
	);
	const id = params.get("id") ?? "";
	const hlsPath = params.get("hls") ?? "";
	const bufferedCommentsRef = useRef<readonly RealComment[]>([]);
	const [comments, setComments] = useState<readonly RealComment[]>([]);
	const [gifts, setGifts] = useState<
		readonly { amount: string; id: string; label: string; userName: string }[]
	>([]);
	const [mediaItem, setMediaItem] = useState<RealMediaItem | null>(null);
	const [playbackRate, setPlaybackRate] = useState<number>(1);
	const [playbackTime, setPlaybackTime] = useState<number>(0);
	const [playbackDuration, setPlaybackDuration] = useState<number>(0);
	const [isInitialDataLoading, setInitialDataLoading] = useState<boolean>(true);
	const [isInitialCommentsLoading, setInitialCommentsLoading] =
		useState<boolean>(true);
	const [isVideoLoading, setVideoLoading] = useState<boolean>(true);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const videoSource = mediaItem?.hlsPath ?? hlsPath;
	const isLoading =
		isInitialDataLoading ||
		isInitialCommentsLoading ||
		isVideoLoading ||
		!mediaItem;
	const commentFetchSecond = Math.floor(playbackTime + 8);

	const loadComments = useCallback(
		(
			playTimeSecond: number,
			{
				mode,
				showLoading,
			}: { mode: "append" | "replace"; showLoading: boolean },
		) => {
			if (!id) return;

			commentLoadPromiseRef.current = commentLoadPromiseRef.current
				.catch(() => {})
				.then(async () => {
					const playTimeMs = Math.max(0, Math.floor(playTimeSecond * 1000));
					const fromPlayTimeMs =
						mode === "append"
							? lastFetchedCommentTimeMsRef.current
							: seekBaseCommentTimeMsRef.current;
					if (
						mode === "append" &&
						typeof fromPlayTimeMs === "number" &&
						playTimeMs <= fromPlayTimeMs
					) {
						return;
					}
					if (showLoading) setInitialCommentsLoading(true);

					try {
						const page = await fetchRealComments(
							id,
							0,
							5000,
							playTimeMs,
							fromPlayTimeMs,
						);

						lastFetchedCommentTimeMsRef.current = Math.max(
							lastFetchedCommentTimeMsRef.current,
							playTimeMs,
						);
						const nextBufferedComments = (() => {
							const nextComments =
								mode === "append"
									? [...bufferedCommentsRef.current, ...page.items]
									: page.items;
							const dedupedComments = new Map(
								nextComments.map((comment) => [comment.id, comment]),
							);
							return [...dedupedComments.values()].sort(
								(firstComment, secondComment) =>
									firstComment.playTimeMs - secondComment.playTimeMs,
							);
						})();
						bufferedCommentsRef.current = nextBufferedComments;
					} finally {
						if (showLoading) {
							setInitialCommentsLoading(false);
						}
					}
				});
		},
		[id],
	);

	const startPlayback = useCallback(async () => {
		const video = videoRef.current;

		if (!video) return;

		try {
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			await video.play();
			return;
		} catch {
			video.muted = true;
			setIsMuted(true);
			await video.play().catch(() => {});
		}
	}, []);

	const enableAudioAfterInteraction = useCallback(() => {
		const video = videoRef.current;

		if (!video || !video.muted) return;

		video.muted = false;
		setIsMuted(false);
		void video.play().catch(() => {
			video.muted = true;
			setIsMuted(true);
		});
	}, []);

	useEffect(() => {
		if (!id) return;

		setInitialDataLoading(true);
		setInitialCommentsLoading(true);
		setVideoLoading(true);
		commentLoadPromiseRef.current = Promise.resolve();
		lastFetchedCommentTimeMsRef.current = 0;
		seekBaseCommentTimeMsRef.current = 0;
		bufferedCommentsRef.current = [];
		displayedCommentIdsRef.current = new Set();
		queuedCommentIdsRef.current = new Set();
		commentDisplayQueueRef.current = [];
		setComments([]);
		void fetchRealMediaItem(id)
			.then(setMediaItem)
			.finally(() => {
				setInitialDataLoading(false);
			});
		void loadComments(0, { mode: "replace", showLoading: true });
		void fetchRealRankings(id).then((page) => {
			setGifts(page.items);
		});
	}, [id, loadComments]);

	useEffect(() => {
		if (
			!id ||
			commentFetchSecond <= 0 ||
			commentFetchSecond === lastCommentFetchSecondRef.current
		) {
			return;
		}

		lastCommentFetchSecondRef.current = commentFetchSecond;
		void loadComments(commentFetchSecond, { mode: "append", showLoading: false });
	}, [commentFetchSecond, id, loadComments]);

	useEffect(() => {
		const video = videoRef.current;

		if (!mediaItem || !video || !videoSource) return;
		const updatePlaybackState = () => {
			setPlaybackTime(video.currentTime);
			setPlaybackDuration(video.duration);
			setIsPlaying(!video.paused);
		};
		const showVideoLoading = () => {
			setVideoLoading(true);
		};
		const hideVideoLoading = () => {
			if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
				setVideoLoading(false);
			}
		};

		video.addEventListener("timeupdate", updatePlaybackState);
		video.addEventListener("durationchange", updatePlaybackState);
		video.addEventListener("loadeddata", hideVideoLoading);
		video.addEventListener("canplay", startPlayback, { once: true });
		video.addEventListener("canplay", hideVideoLoading);
		video.addEventListener("playing", hideVideoLoading);
		video.addEventListener("seeking", showVideoLoading);
		video.addEventListener("seeked", hideVideoLoading);
		video.addEventListener("waiting", showVideoLoading);
		video.addEventListener("pause", updatePlaybackState);
		video.addEventListener("play", updatePlaybackState);
		let animationFrameId = 0;
		const updateFrameState = (now: number) => {
			setPlaybackTime(video.currentTime);
			setPlaybackDuration(video.duration);
			setIsPlaying(!video.paused);
			if (video.paused) {
				animationFrameId = requestAnimationFrame(updateFrameState);
				return;
			}

			const visibleTimeMs = Math.floor(video.currentTime * 1000);
			const smoothingWindowMs = 3000;
			const displayedCommentIds = displayedCommentIdsRef.current;
			const queuedCommentIds = queuedCommentIdsRef.current;
			const dueComments = bufferedCommentsRef.current.filter(
				(comment) =>
					comment.playTimeMs <= visibleTimeMs + smoothingWindowMs &&
					!displayedCommentIds.has(comment.id) &&
					!queuedCommentIds.has(comment.id),
			);
			if (dueComments.length > 0) {
				queuedCommentIdsRef.current = new Set([
					...queuedCommentIds,
					...dueComments.map((comment) => comment.id),
				]);
				const scheduledComments = dueComments
					.sort(
						(firstComment, secondComment) =>
							firstComment.playTimeMs - secondComment.playTimeMs,
					)
					.map((comment, index) => ({
						...comment,
						displayAt:
							now + ((index + 1) / (dueComments.length + 1)) * smoothingWindowMs,
					}));
				commentDisplayQueueRef.current = [
					...commentDisplayQueueRef.current,
					...scheduledComments,
				].sort(
					(firstComment, secondComment) =>
						firstComment.displayAt - secondComment.displayAt,
				);
			}

			if (
				commentDisplayQueueRef.current.length > 0 &&
				(commentDisplayQueueRef.current[0]?.displayAt ?? Number.POSITIVE_INFINITY) <=
					now
			) {
				const nextComments = commentDisplayQueueRef.current.filter(
					(comment) => comment.displayAt <= now,
				);
				commentDisplayQueueRef.current =
					commentDisplayQueueRef.current.slice(nextComments.length);
				displayedCommentIdsRef.current = new Set([
					...displayedCommentIdsRef.current,
					...nextComments.map((comment) => comment.id),
				]);
				setComments((currentComments) => [
					...currentComments,
					...nextComments.map((comment) => ({
						id: comment.id,
						message: comment.message,
						playTimeMs: comment.playTimeMs,
						userName: comment.userName,
					})),
				]);
			}

			animationFrameId = requestAnimationFrame(updateFrameState);
		};
		animationFrameId = requestAnimationFrame(updateFrameState);

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			setVideoLoading(true);
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			video.src = videoSource;
			video.load();
			return () => {
				video.removeEventListener("timeupdate", updatePlaybackState);
				video.removeEventListener("durationchange", updatePlaybackState);
				video.removeEventListener("loadeddata", hideVideoLoading);
				video.removeEventListener("canplay", startPlayback);
				video.removeEventListener("canplay", hideVideoLoading);
				video.removeEventListener("playing", hideVideoLoading);
				video.removeEventListener("seeking", showVideoLoading);
				video.removeEventListener("seeked", hideVideoLoading);
				video.removeEventListener("waiting", showVideoLoading);
				video.removeEventListener("pause", updatePlaybackState);
				video.removeEventListener("play", updatePlaybackState);
				cancelAnimationFrame(animationFrameId);
			};
		}

		const hls = new Hls({
			abrEwmaDefaultEstimate: 2_000_000,
			abrEwmaFastVoD: 3,
			abrEwmaSlowVoD: 9,
			backBufferLength: 30,
			capLevelToPlayerSize: true,
			enableWorker: true,
			fragLoadingMaxRetry: 12,
			fragLoadingRetryDelay: 1600,
			fragLoadingTimeOut: 45000,
			lowLatencyMode: false,
			manifestLoadingMaxRetry: 8,
			manifestLoadingRetryDelay: 1600,
			manifestLoadingTimeOut: 30000,
			maxBufferLength: 45,
			maxBufferSize: 90 * 1000 * 1000,
			maxMaxBufferLength: 90,
			startLevel: -1,
		});

		setVideoLoading(true);
		video.autoplay = true;
		video.muted = true;
		video.playsInline = true;
		hls.attachMedia(video);
		hls.on(Hls.Events.MEDIA_ATTACHED, () => {
			hls.loadSource(videoSource);
		});
		hls.on(Hls.Events.MANIFEST_PARSED, () => {
			video.muted = true;
			setIsMuted(true);
			void startPlayback();
		});
		hls.on(Hls.Events.FRAG_BUFFERED, () => {
			setVideoLoading(false);
			void startPlayback();
		});
		hls.on(Hls.Events.ERROR, (_event, data) => {
			if (!data.fatal) return;

			setVideoLoading(false);
			if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
				hls.startLoad();
				return;
			}
			if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
				hls.recoverMediaError();
			}
		});

		return () => {
			video.removeEventListener("timeupdate", updatePlaybackState);
			video.removeEventListener("durationchange", updatePlaybackState);
			video.removeEventListener("loadeddata", hideVideoLoading);
			video.removeEventListener("canplay", startPlayback);
			video.removeEventListener("canplay", hideVideoLoading);
			video.removeEventListener("playing", hideVideoLoading);
			video.removeEventListener("seeking", showVideoLoading);
			video.removeEventListener("seeked", hideVideoLoading);
			video.removeEventListener("waiting", showVideoLoading);
			video.removeEventListener("pause", updatePlaybackState);
			video.removeEventListener("play", updatePlaybackState);
			cancelAnimationFrame(animationFrameId);
			hls.destroy();
		};
	}, [mediaItem, startPlayback, videoSource]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		video.playbackRate = playbackRate;
		video.defaultPlaybackRate = playbackRate;
	}, [playbackRate]);

	function backToRealMedia() {
		globalThis.location.assign("/real-media");
	}

	if (!mediaItem) {
		return <LoadingOverlay text="Loading..." />;
	}

	return (
		<div
			onClick={enableAudioAfterInteraction}
			onKeyDown={enableAudioAfterInteraction}
		>
			<WithMeetsScreen
				chapters={mediaItem.chapters}
				comments={comments}
				description={mediaItem.description}
				gifts={gifts}
				isHorizontal={mediaItem.isHorizontal}
				onPlaybackToggle={() => {
					const video = videoRef.current;
					if (!video) return;
					if (video.paused) {
						void startPlayback();
						return;
					}
					video.pause();
					setIsPlaying(false);
				}}
				onSeek={(seconds) => {
					const video = videoRef.current;
					if (!video) return;
					setVideoLoading(true);
					const seekTimeMs = Math.max(0, Math.floor(seconds * 1000));
					lastFetchedCommentTimeMsRef.current = 0;
					seekBaseCommentTimeMsRef.current = seekTimeMs;
					bufferedCommentsRef.current = [];
					displayedCommentIdsRef.current = new Set();
					queuedCommentIdsRef.current = new Set();
					commentDisplayQueueRef.current = [];
					setComments([]);
					void loadComments(seconds + 8, { mode: "replace", showLoading: false });
					video.currentTime = seconds;
				}}
				onBack={backToRealMedia}
				posterAlt={mediaItem.imageAlt}
				posterSrc={mediaItem.imageSrc}
				isPlaying={isPlaying}
				playbackDuration={playbackDuration}
				playbackRate={playbackRate}
				playbackTime={playbackTime}
				onPlaybackRateChange={(rate) => {
					setPlaybackRate(rate);
				}}
				title={mediaItem.title}
				videoRef={videoRef}
				videoMuted={isMuted}
				videoSrc={videoSource}
				showSupportSummary={false}
			/>
			{isLoading ? <LoadingOverlay text="Loading..." /> : null}
		</div>
	);
}
