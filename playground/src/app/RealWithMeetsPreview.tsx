import Hls from "hls.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WithMeetsScreen } from "../../../src/Components/Patterns/WithMeetsScreen";
import { Button } from "../../../src/Components/System/Button";
import { LoadingOverlay } from "../../../src/Components/System/Loading";
import { RadioField } from "../../../src/Components/System/Radio";
import {
	SystemModal,
	SystemModalActionGrid,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalFooter,
	SystemModalHeader,
	SystemModalHeading,
	SystemModalPanel,
	SystemModalTitle,
} from "../../../src/Components/System/SystemModal";
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

interface HlsVideoLevelOption {
	bitrate: number;
	height: number | null;
	index: number;
	label: string;
	uri: string | null;
	width: number | null;
}

interface HlsAudioTrackOption {
	groupId: string | null;
	index: number;
	label: string;
	language: string | null;
	name: string | null;
	uri: string | null;
}

export function RealWithMeetsPreview() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const hlsRef = useRef<Hls | null>(null);
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
	const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
	const [selectedAudioTrack, setSelectedAudioTrack] = useState<number>(-1);
	const [selectedVideoLevel, setSelectedVideoLevel] = useState<number>(-1);
	const [audioTracks, setAudioTracks] = useState<readonly HlsAudioTrackOption[]>([]);
	const [videoLevels, setVideoLevels] = useState<readonly HlsVideoLevelOption[]>([]);
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
		hlsRef.current = null;
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
			abrMaxWithRealBitrate: true,
			abrEwmaSlowVoD: 9,
			backBufferLength: 30,
			capLevelToPlayerSize: false,
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
			testBandwidth: true,
		});

		hlsRef.current = hls;
		setVideoLoading(true);
		video.autoplay = true;
		video.muted = true;
		video.playsInline = true;
		hls.attachMedia(video);
		hls.on(Hls.Events.MEDIA_ATTACHED, () => {
			hls.loadSource(videoSource);
		});
		hls.on(Hls.Events.MANIFEST_PARSED, () => {
			setVideoLevels(
				hls.levels.map((level, index) => ({
					bitrate: level.bitrate,
					height: typeof level.height === "number" ? level.height : null,
					index,
					label: formatVideoLevelLabel(level, index),
					uri: level.url[0] ?? null,
					width: typeof level.width === "number" ? level.width : null,
				})),
			);
			hls.autoLevelCapping = -1;
			hls.currentLevel = -1;
			setSelectedVideoLevel(-1);
			video.muted = true;
			setIsMuted(true);
			void startPlayback();
		});
		hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, () => {
			setAudioTracks(
				hls.audioTracks.map((track, index) => ({
					groupId: typeof track.groupId === "string" ? track.groupId : null,
					index,
					label: formatAudioTrackLabel(track, index),
					language: typeof track.lang === "string" ? track.lang : null,
					name: typeof track.name === "string" ? track.name : null,
					uri: typeof track.url === "string" ? track.url : null,
				})),
			);
			setSelectedAudioTrack(hls.audioTrack);
		});
		hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, () => {
			setSelectedAudioTrack(hls.audioTrack);
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
			hlsRef.current = null;
			hls.destroy();
		};
	}, [mediaItem, startPlayback, videoSource]);

	useEffect(() => {
		if (!videoSource) return;

		let isDisposed = false;
		setAudioTracks([]);
		setVideoLevels([]);
		setSelectedAudioTrack(-1);
		setSelectedVideoLevel(-1);
		void fetch(videoSource)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to load HLS master: ${response.status}`);
				}
				return response.text();
			})
			.then((text) => {
				if (isDisposed) return;
				const manifestOptions = parseHlsMasterPlaylist(text);
				if (manifestOptions.videoLevels.length > 0) {
					setVideoLevels(manifestOptions.videoLevels);
				}
				if (manifestOptions.audioTracks.length > 0) {
					setAudioTracks(manifestOptions.audioTracks);
					setSelectedAudioTrack((currentTrack) =>
						currentTrack >= 0 ? currentTrack : manifestOptions.audioTracks[0]?.index ?? -1,
					);
				}
			})
			.catch(() => {});

		return () => {
			isDisposed = true;
		};
	}, [videoSource]);

	function selectVideoLevel(value: string) {
		const level = Number(value);
		setSelectedVideoLevel(level);
		if (hlsRef.current) {
			const selectedLevel = videoLevels.find((videoLevel) => videoLevel.index === level);
			const hlsLevelIndex =
				level < 0
					? -1
					: hlsRef.current.levels.findIndex((hlsLevel) =>
							isSameVideoLevel(hlsLevel, selectedLevel),
						);
			const nextLevel = hlsLevelIndex >= 0 ? hlsLevelIndex : level;
			hlsRef.current.autoLevelCapping = -1;
			hlsRef.current.currentLevel = nextLevel;
			hlsRef.current.nextLevel = nextLevel;
			hlsRef.current.nextLoadLevel = nextLevel;
			hlsRef.current.loadLevel = nextLevel;
			hlsRef.current.startLoad(videoRef.current?.currentTime ?? -1);
		}
	}

	function selectAudioTrack(value: string) {
		const audioTrack = Number(value);
		setSelectedAudioTrack(audioTrack);
		if (hlsRef.current) {
			const selectedTrack = audioTracks.find((track) => track.index === audioTrack);
			const hlsTrack = hlsRef.current.audioTracks.find((track) =>
				isSameAudioTrack(track, selectedTrack),
			);
			if (hlsTrack) {
				hlsRef.current.setAudioOption(hlsTrack);
				setSelectedAudioTrack(hlsRef.current.audioTrack);
				return;
			}
			hlsRef.current.audioTrack = audioTrack;
		}
	}

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
				onSettingsOpen={() => {
					setSettingsOpen(true);
				}}
				title={mediaItem.title}
				videoRef={videoRef}
				videoMuted={isMuted}
				videoSrc={videoSource}
				showSupportSummary={false}
			/>
			<RealPlaybackSettingsModal
				audioTracks={audioTracks}
				onAudioTrackChange={selectAudioTrack}
				onOpenChange={setSettingsOpen}
				onVideoLevelChange={selectVideoLevel}
				open={isSettingsOpen}
				selectedAudioTrack={selectedAudioTrack}
				selectedVideoLevel={selectedVideoLevel}
				videoLevels={videoLevels}
			/>
			{isLoading ? <LoadingOverlay text="Loading..." /> : null}
		</div>
	);
}

function RealPlaybackSettingsModal({
	audioTracks,
	onAudioTrackChange,
	onOpenChange,
	onVideoLevelChange,
	open,
	selectedAudioTrack,
	selectedVideoLevel,
	videoLevels,
}: {
	audioTracks: readonly HlsAudioTrackOption[];
	onAudioTrackChange: (value: string) => void;
	onOpenChange: (open: boolean) => void;
	onVideoLevelChange: (value: string) => void;
	open: boolean;
	selectedAudioTrack: number;
	selectedVideoLevel: number;
	videoLevels: readonly HlsVideoLevelOption[];
}) {
	return (
		<SystemModal open={open} onOpenChange={onOpenChange}>
			<SystemModalContent width="md">
				<SystemModalHeader>
					<SystemModalTitle>再生設定</SystemModalTitle>
				</SystemModalHeader>
				<SystemModalBody>
					<SystemModalPanel>
						<SystemModalHeading size="compact" tone="label" withoutTopMargin>
							画質
						</SystemModalHeading>
						<RadioField
							groupProps={{
								onValueChange: onVideoLevelChange,
								value: String(selectedVideoLevel),
							}}
							options={[
								{ label: "自動", value: "-1" },
								...videoLevels.map((level) => ({
									label: level.label,
									value: String(level.index),
								})),
							]}
						/>
						<SystemModalHeading size="compact" tone="label">
							音声チャネル
						</SystemModalHeading>
						<RadioField
							groupProps={{
								onValueChange: onAudioTrackChange,
								value: String(selectedAudioTrack),
							}}
							options={
								audioTracks.length > 0
									? audioTracks.map((track) => ({
											label: track.label,
											value: String(track.index),
										}))
									: [{ disabled: true, label: "音声トラック情報なし", value: "-1" }]
							}
						/>
					</SystemModalPanel>
				</SystemModalBody>
				<SystemModalFooter>
					<SystemModalActionGrid className="grid-cols-1">
						<SystemModalClose asChild>
							<Button radius="dialog" size="modal">
								閉じる
							</Button>
						</SystemModalClose>
					</SystemModalActionGrid>
				</SystemModalFooter>
			</SystemModalContent>
		</SystemModal>
	);
}

function formatVideoLevelLabel(level: Hls["levels"][number], index: number) {
	const resolution =
		typeof level.width === "number" && typeof level.height === "number"
			? `${level.width}x${level.height}`
			: `Level ${index + 1}`;
	const bitrateMbps =
		level.bitrate > 0 ? `${(level.bitrate / 1_000_000).toFixed(1)}Mbps` : "";
	return bitrateMbps ? `${resolution} ${bitrateMbps}` : resolution;
}

function isSameVideoLevel(
	hlsLevel: Hls["levels"][number],
	selectedLevel: HlsVideoLevelOption | undefined,
) {
	if (!selectedLevel) return false;

	if (
		selectedLevel.uri !== null &&
		hlsLevel.url.some((url) => url.endsWith(selectedLevel.uri ?? ""))
	) {
		return true;
	}

	if (
		selectedLevel.width !== null &&
		selectedLevel.height !== null &&
		hlsLevel.width === selectedLevel.width &&
		hlsLevel.height === selectedLevel.height
	) {
		return true;
	}

	return hlsLevel.bitrate === selectedLevel.bitrate;
}

function formatAudioTrackLabel(track: Hls["audioTracks"][number], index: number) {
	const name =
		typeof track.name === "string" && track.name ? track.name : `Track ${index + 1}`;
	const language =
		typeof track.lang === "string" && track.lang ? ` / ${track.lang}` : "";
	const groupId =
		typeof track.groupId === "string" && track.groupId ? ` / ${track.groupId}` : "";
	return `${name}${language}${groupId}`;
}

function parseHlsMasterPlaylist(text: string): {
	audioTracks: readonly HlsAudioTrackOption[];
	videoLevels: readonly HlsVideoLevelOption[];
} {
	const lines = text.split(/\r?\n/);
	const audioTracks: HlsAudioTrackOption[] = [];
	const parsedVideoLevels: Omit<HlsVideoLevelOption, "index">[] = [];

	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index] ?? "";

		if (line.startsWith("#EXT-X-MEDIA:") && line.includes("TYPE=AUDIO")) {
			const attributes = parseHlsAttributes(line.replace("#EXT-X-MEDIA:", ""));
			const trackIndex = audioTracks.length;
			const name = attributes.get("NAME") ?? null;
			const language = attributes.get("LANGUAGE") ?? null;
			const groupId = attributes.get("GROUP-ID") ?? null;
			const uri = attributes.get("URI") ?? null;
			audioTracks.push({
				groupId,
				index: trackIndex,
				label: [`Track ${trackIndex + 1}`, name, language, groupId, uri]
					.filter((value): value is string => Boolean(value))
					.join(" / "),
				language,
				name,
				uri,
			});
		}

		if (line.startsWith("#EXT-X-STREAM-INF:")) {
			const attributes = parseHlsAttributes(line.replace("#EXT-X-STREAM-INF:", ""));
			const levelIndex = parsedVideoLevels.length;
			const resolution = attributes.get("RESOLUTION") ?? "";
			const [widthText, heightText] = resolution.split("x");
			const width = widthText ? Number(widthText) : Number.NaN;
			const height = heightText ? Number(heightText) : Number.NaN;
			const bitrate = Number(attributes.get("AVERAGE-BANDWIDTH") ?? attributes.get("BANDWIDTH") ?? 0);
			const widthValue = Number.isFinite(width) ? width : null;
			const heightValue = Number.isFinite(height) ? height : null;
			const resolutionLabel =
				widthValue !== null && heightValue !== null
					? `${widthValue}x${heightValue}`
					: `Level ${levelIndex + 1}`;
			const bitrateLabel =
				bitrate > 0 ? `${(bitrate / 1_000_000).toFixed(1)}Mbps` : "";
			parsedVideoLevels.push({
				bitrate,
				height: heightValue,
				label: bitrateLabel ? `${resolutionLabel} ${bitrateLabel}` : resolutionLabel,
				uri: lines[index + 1]?.trim() || null,
				width: widthValue,
			});
		}
	}

	const videoLevels = parsedVideoLevels
		.toSorted((left, right) => left.bitrate - right.bitrate)
		.map((level, index) => ({ ...level, index }));

	return { audioTracks, videoLevels };
}

function parseHlsAttributes(text: string) {
	const attributes = new Map<string, string>();
	const pattern = /([A-Z0-9-]+)=("[^"]*"|[^,]*)/g;
	let match = pattern.exec(text);

	while (match) {
		const key = match[1];
		const rawValue = match[2];
		if (key && rawValue !== undefined) {
			attributes.set(key, rawValue.replace(/^"|"$/g, ""));
		}
		match = pattern.exec(text);
	}

	return attributes;
}

function isSameAudioTrack(
	hlsTrack: Hls["audioTracks"][number],
	selectedTrack: HlsAudioTrackOption | undefined,
) {
	if (!selectedTrack) return false;

	const hlsTrackUrl = typeof hlsTrack.url === "string" ? hlsTrack.url : "";
	return (
		(selectedTrack.uri !== null && hlsTrackUrl.endsWith(selectedTrack.uri)) ||
		(selectedTrack.name !== null &&
			hlsTrack.name === selectedTrack.name &&
			selectedTrack.groupId !== null &&
			hlsTrack.groupId === selectedTrack.groupId)
	);
}
