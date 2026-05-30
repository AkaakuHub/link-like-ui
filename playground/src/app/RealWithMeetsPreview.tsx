import Hls from "hls.js";
import { useEffect, useMemo, useRef, useState } from "react";
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
	const params = useMemo(
		() => new URLSearchParams(globalThis.location.search),
		[],
	);
	const id = params.get("id") ?? "";
	const hlsPath = params.get("hls") ?? "";
	const posterSrc = params.get("poster") ?? "";
	const title = params.get("title") ?? id;
	const [comments, setComments] = useState<readonly RealComment[]>([]);
	const [gifts, setGifts] = useState<
		readonly { amount: string; id: string; label: string; userName: string }[]
	>([]);
	const [mediaItem, setMediaItem] = useState<RealMediaItem | null>(null);
	const [playbackTime, setPlaybackTime] = useState<number>(0);
	const [playbackDuration, setPlaybackDuration] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const videoSource = mediaItem?.hlsPath ?? hlsPath;

	useEffect(() => {
		if (!id) return;

		setIsLoading(true);
		void Promise.all([
			fetchRealComments(id).then((page) => {
				setComments(page.items);
			}),
			fetchRealRankings(id).then((page) => {
				setGifts(page.items);
			}),
			fetchRealMediaItem(id).then(setMediaItem),
		]).finally(() => {
			setIsLoading(false);
		});
	}, [id]);

	useEffect(() => {
		const video = videoRef.current;

		if (!video || !videoSource) return;
		const updatePlaybackState = () => {
			setPlaybackTime(video.currentTime);
			setPlaybackDuration(video.duration);
		};

		video.addEventListener("timeupdate", updatePlaybackState);
		video.addEventListener("durationchange", updatePlaybackState);

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = videoSource;
			return () => {
				video.removeEventListener("timeupdate", updatePlaybackState);
				video.removeEventListener("durationchange", updatePlaybackState);
			};
		}

		const hls = new Hls({
			backBufferLength: 18,
			capLevelToPlayerSize: true,
			enableWorker: true,
			fragLoadingMaxRetry: 8,
			fragLoadingRetryDelay: 1200,
			fragLoadingTimeOut: 30000,
			lowLatencyMode: false,
			maxBufferLength: 18,
			maxMaxBufferLength: 36,
			startLevel: 0,
		});

		hls.loadSource(videoSource);
		hls.attachMedia(video);

		return () => {
			video.removeEventListener("timeupdate", updatePlaybackState);
			video.removeEventListener("durationchange", updatePlaybackState);
			hls.destroy();
		};
	}, [videoSource]);

	function backToRealMedia() {
		globalThis.location.assign("/real-media");
	}

	return (
		<>
			<WithMeetsScreen
				chapters={mediaItem?.chapters ?? []}
				comments={comments}
				description={mediaItem?.description ?? ""}
				gifts={gifts}
				onPlaybackToggle={() => {
					const video = videoRef.current;
					if (!video) return;
					if (video.paused) {
						void video.play();
						return;
					}
					video.pause();
				}}
				onSeek={(seconds) => {
					const video = videoRef.current;
					if (!video) return;
					video.currentTime = seconds;
				}}
				onBack={backToRealMedia}
				posterAlt={mediaItem?.imageAlt ?? title}
				posterSrc={mediaItem?.imageSrc ?? posterSrc}
				playbackDuration={playbackDuration}
				playbackTime={playbackTime}
				title={mediaItem?.title ?? title}
				videoRef={videoRef}
				videoSrc={videoSource}
			/>
			{isLoading ? <LoadingOverlay text="Loading..." /> : null}
		</>
	);
}
