import Hls from "hls.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { WithMeetsScreen } from "../../../src/Components/Patterns/WithMeetsScreen";
import {
	fetchRealComments,
	fetchRealMediaItem,
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
	const [mediaItem, setMediaItem] = useState<RealMediaItem | null>(null);

	useEffect(() => {
		if (!id) return;

		void fetchRealComments(id).then(setComments);
		void fetchRealMediaItem(id).then(setMediaItem);
	}, [id]);

	useEffect(() => {
		const video = videoRef.current;

		if (!video || !hlsPath) return;

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = hlsPath;
			return;
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

		hls.loadSource(hlsPath);
		hls.attachMedia(video);

		return () => {
			hls.destroy();
		};
	}, [hlsPath]);

	function backToRealMedia() {
		globalThis.location.assign("/real-media");
	}

	return (
		<WithMeetsScreen
			chapters={mediaItem?.chapters ?? []}
			comments={comments}
			description={mediaItem?.description ?? ""}
			gifts={[]}
			onBack={backToRealMedia}
			posterAlt={mediaItem?.imageAlt ?? title}
			posterSrc={mediaItem?.imageSrc ?? posterSrc}
			title={mediaItem?.title ?? title}
			videoRef={videoRef}
			videoSrc={mediaItem?.hlsPath ?? hlsPath}
		/>
	);
}
