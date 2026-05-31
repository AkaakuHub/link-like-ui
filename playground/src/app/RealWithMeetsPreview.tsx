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

export function RealWithMeetsPreview() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const commentRequestIdRef = useRef<number>(0);
	const lastCommentFetchSecondRef = useRef<number>(-1);
	const params = useMemo(
		() => new URLSearchParams(globalThis.location.search),
		[],
	);
	const id = params.get("id") ?? "";
	const hlsPath = params.get("hls") ?? "";
	const [comments, setComments] = useState<readonly RealComment[]>([]);
	const [gifts, setGifts] = useState<
		readonly { amount: string; id: string; label: string; userName: string }[]
	>([]);
	const [mediaItem, setMediaItem] = useState<RealMediaItem | null>(null);
	const [playbackTime, setPlaybackTime] = useState<number>(0);
	const [playbackDuration, setPlaybackDuration] = useState<number>(0);
	const [isInitialDataLoading, setInitialDataLoading] = useState<boolean>(true);
	const [isInitialCommentsLoading, setInitialCommentsLoading] =
		useState<boolean>(true);
	const [isVideoLoading, setVideoLoading] = useState<boolean>(true);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const videoSource = mediaItem?.hlsPath ?? hlsPath;
	const isLoading =
		isInitialDataLoading ||
		isInitialCommentsLoading ||
		isVideoLoading ||
		!mediaItem;
	const commentFetchSecond = Math.floor(playbackTime / 5) * 5;

	const loadComments = useCallback(
		async (
			playTimeSecond: number,
			{ showLoading }: { showLoading: boolean },
		) => {
			if (!id) return;

			const requestId = commentRequestIdRef.current + 1;
			commentRequestIdRef.current = requestId;
			if (showLoading) setInitialCommentsLoading(true);

			try {
				const page = await fetchRealComments(
					id,
					0,
					80,
					playTimeSecond * 1000,
				);

				if (commentRequestIdRef.current === requestId) {
					setComments(page.items);
				}
			} finally {
				if (showLoading) {
					setInitialCommentsLoading(false);
				}
			}
		},
		[id],
	);

	const startPlayback = useCallback(async () => {
		const video = videoRef.current;

		if (!video) return;

		try {
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
		void fetchRealMediaItem(id)
			.then(setMediaItem)
			.finally(() => {
				setInitialDataLoading(false);
			});
		void loadComments(0, { showLoading: true });
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
		void loadComments(commentFetchSecond, { showLoading: false });
	}, [commentFetchSecond, id, loadComments]);

	useEffect(() => {
		const video = videoRef.current;

		if (!video || !videoSource) return;
		const updatePlaybackState = () => {
			setPlaybackTime(video.currentTime);
			setPlaybackDuration(video.duration);
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

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			setVideoLoading(true);
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
		hls.loadSource(videoSource);
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED, () => {
			video.muted = true;
			setIsMuted(true);
			void startPlayback();
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
			hls.destroy();
		};
	}, [startPlayback, videoSource]);

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
				onPlaybackToggle={() => {
					const video = videoRef.current;
					if (!video) return;
					if (video.paused) {
						void startPlayback();
						return;
					}
					video.pause();
				}}
				onSeek={(seconds) => {
					const video = videoRef.current;
					if (!video) return;
					setVideoLoading(true);
					void loadComments(seconds, { showLoading: false });
					video.currentTime = seconds;
				}}
				onBack={backToRealMedia}
				posterAlt={mediaItem.imageAlt}
				posterSrc={mediaItem.imageSrc}
				playbackDuration={playbackDuration}
				playbackTime={playbackTime}
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
