import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { TapEffectLayer, TapEffectRing, TapEffectRoot } from "./structure";

interface TapEffectItem {
	expiresAt: number;
	id: number;
	kind: "initial" | "trail";
	size: number;
	x: number;
	y: number;
}

interface PointerPosition {
	x: number;
	y: number;
}

function isSamePointerPosition(
	left: PointerPosition | null,
	right: PointerPosition | null,
) {
	if (!left || !right) {
		return false;
	}

	return left.x === right.x && left.y === right.y;
}

export interface TapEffectProps
	extends Omit<ComponentPropsWithoutRef<typeof TapEffectRoot>, "children"> {
	children: ReactNode;
	disabled?: boolean;
	durationMs?: number;
	intervalMs?: number;
	size?: number;
}

function isPrimaryPress(event: MouseEvent | PointerEvent) {
	return event.button === 0 || event.buttons === 1;
}

export function TapEffect({
	children,
	disabled = false,
	durationMs = 500,
	intervalMs = 20,
	size = 50,
	style,
	...props
}: TapEffectProps) {
	const [effects, setEffects] = useState<TapEffectItem[]>([]);
	const nextIdRef = useRef<number>(0);
	const isPointerDownRef = useRef<boolean>(false);
	const lastPointerPositionRef = useRef<PointerPosition | null>(null);
	const hasPendingMovementRef = useRef<boolean>(false);
	const nextTrailEffectAvailableTimeRef = useRef<number>(0);
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		if (disabled) {
			setEffects([]);
			return;
		}

		function createTapEffect(
			now: number,
			kind: TapEffectItem["kind"],
			pointerPosition: PointerPosition | null,
			effectSize: number,
		): TapEffectItem | null {
			if (!pointerPosition) {
				return null;
			}

			const nextEffect: TapEffectItem = {
				expiresAt: now + durationMs,
				id: nextIdRef.current,
				kind,
				size: effectSize,
				x: pointerPosition.x,
				y: pointerPosition.y,
			};

			nextIdRef.current += 1;

			return nextEffect;
		}

		function appendEffect(
			now: number,
			kind: TapEffectItem["kind"],
			pointerPosition: PointerPosition | null,
			effectSize: number,
		) {
			setEffects((currentEffects) => {
				const activeEffects = currentEffects.filter(
					(effect) => effect.expiresAt > now,
				);
				const nextEffect = createTapEffect(
					now,
					kind,
					pointerPosition,
					effectSize,
				);

				return nextEffect ? [...activeEffects, nextEffect] : activeEffects;
			});
		}

		function updateEffects(now: number) {
			const lastPointerPosition = lastPointerPositionRef.current;
			const shouldCreateNextEffect =
				isPointerDownRef.current &&
				hasPendingMovementRef.current &&
				lastPointerPosition !== null &&
				now >= nextTrailEffectAvailableTimeRef.current;

			setEffects((currentEffects) => {
				const activeEffects = currentEffects.filter(
					(effect) => effect.expiresAt > now,
				);

				if (!shouldCreateNextEffect || !lastPointerPosition) {
					return activeEffects;
				}

				const nextEffect = createTapEffect(
					now,
					"trail",
					lastPointerPosition,
					size,
				);

				if (!nextEffect) {
					return activeEffects;
				}

				hasPendingMovementRef.current = false;
				nextTrailEffectAvailableTimeRef.current = now + intervalMs;

				return [...activeEffects, nextEffect];
			});
		}

		function handlePointerDown(event: globalThis.PointerEvent) {
			if (!isPrimaryPress(event)) {
				return;
			}

			const now = Date.now();
			lastPointerPositionRef.current = { x: event.clientX, y: event.clientY };
			hasPendingMovementRef.current = false;
			isPointerDownRef.current = true;
			appendEffect(now, "initial", lastPointerPositionRef.current, size);
		}

		function handlePointerMove(event: globalThis.PointerEvent) {
			if (!isPointerDownRef.current) {
				return;
			}

			const nextPointerPosition = { x: event.clientX, y: event.clientY };

			if (
				!isSamePointerPosition(
					lastPointerPositionRef.current,
					nextPointerPosition,
				)
			) {
				hasPendingMovementRef.current = true;
				lastPointerPositionRef.current = nextPointerPosition;
			}
		}

		function handlePointerUp() {
			isPointerDownRef.current = false;
			hasPendingMovementRef.current = false;
			nextTrailEffectAvailableTimeRef.current = 0;
		}

		function animate() {
			updateEffects(Date.now());
			animationFrameRef.current = globalThis.requestAnimationFrame(animate);
		}

		globalThis.addEventListener("pointerdown", handlePointerDown);
		globalThis.addEventListener("pointermove", handlePointerMove);
		globalThis.addEventListener("pointerup", handlePointerUp);
		globalThis.addEventListener("pointercancel", handlePointerUp);
		globalThis.addEventListener("dragend", handlePointerUp);

		animationFrameRef.current = globalThis.requestAnimationFrame(animate);

		return () => {
			globalThis.removeEventListener("pointerdown", handlePointerDown);
			globalThis.removeEventListener("pointermove", handlePointerMove);
			globalThis.removeEventListener("pointerup", handlePointerUp);
			globalThis.removeEventListener("pointercancel", handlePointerUp);
			globalThis.removeEventListener("dragend", handlePointerUp);

			if (animationFrameRef.current !== null) {
				globalThis.cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [disabled, durationMs, intervalMs, size]);

	const tapEffectStyle = {
		"--ll-tap-effect-duration": `${durationMs}ms`,
		...style,
	} as CSSProperties;

	return (
		<TapEffectRoot style={tapEffectStyle} {...props}>
			<TapEffectLayer aria-hidden="true">
				{effects.map((effect) => (
					<div
						key={effect.id}
						className="absolute"
						style={{
							left: `${effect.x - effect.size / 2}px`,
							top: `${effect.y - effect.size / 2}px`,
						}}
					>
						<TapEffectRing
							className={
								effect.kind === "initial"
									? "animate-[ll-tap-effect-burst_var(--ll-tap-effect-duration)_ease-out_forwards] border-[8px] border-ll-white/18 blur-[6px] mix-blend-screen shadow-[0_0_10px_4px_color-mix(in_srgb,var(--color-ll-true-white)_24%,transparent),0_0_20px_8px_color-mix(in_srgb,var(--color-ll-true-white)_12%,transparent)]"
									: "animate-[ll-tap-effect_var(--ll-tap-effect-duration)_ease-out_forwards] border-[8px] border-ll-white/18 blur-[6px] mix-blend-screen shadow-[0_0_10px_4px_color-mix(in_srgb,var(--color-ll-true-white)_24%,transparent),0_0_20px_8px_color-mix(in_srgb,var(--color-ll-true-white)_12%,transparent)]"
							}
							size={effect.size}
						/>
						<TapEffectRing
							className={
								effect.kind === "initial"
									? "animate-[ll-tap-effect-burst_var(--ll-tap-effect-duration)_ease-out_forwards] border-[4.5px] border-ll-white/92 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ll-true-white)_12%,transparent)_0%,color-mix(in_srgb,var(--color-ll-true-white)_6%,transparent)_46%,transparent_70%)] mix-blend-screen shadow-[inset_0_0_8px_color-mix(in_srgb,var(--color-ll-true-white)_20%,transparent),0_0_8px_2px_color-mix(in_srgb,var(--color-ll-true-white)_38%,transparent),0_0_16px_6px_color-mix(in_srgb,var(--color-ll-true-white)_16%,transparent)]"
									: "animate-[ll-tap-effect_var(--ll-tap-effect-duration)_ease-out_forwards] border-[4.5px] border-ll-white/92 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ll-true-white)_12%,transparent)_0%,color-mix(in_srgb,var(--color-ll-true-white)_6%,transparent)_46%,transparent_70%)] mix-blend-screen shadow-[inset_0_0_8px_color-mix(in_srgb,var(--color-ll-true-white)_20%,transparent),0_0_8px_2px_color-mix(in_srgb,var(--color-ll-true-white)_38%,transparent),0_0_16px_6px_color-mix(in_srgb,var(--color-ll-true-white)_16%,transparent)]"
							}
							size={effect.size}
						/>
					</div>
				))}
			</TapEffectLayer>
			{children}
		</TapEffectRoot>
	);
}
