import { useEffect, useState } from "react";

export interface LayoutBatteryState {
	charging: boolean;
	level: number;
}

interface LayoutBatteryManager {
	charging: boolean;
	level: number;
	onchargingchange: ((this: LayoutBatteryManager, event: Event) => void) | null;
	onlevelchange: ((this: LayoutBatteryManager, event: Event) => void) | null;
}

interface LayoutBatteryNavigator extends Navigator {
	getBattery?: () => Promise<LayoutBatteryManager>;
}

export function useBatteryState(): LayoutBatteryState {
	const [battery, setBattery] = useState<LayoutBatteryState>({
		charging: false,
		level: 0,
	});

	useEffect(() => {
		const batteryNavigator = navigator as LayoutBatteryNavigator;
		let batteryManager: LayoutBatteryManager | null = null;
		let isSubscribed = true;

		const updateBattery = (currentBattery: LayoutBatteryManager) => {
			setBattery({
				charging: currentBattery.charging,
				level: currentBattery.level,
			});
		};

		void batteryNavigator.getBattery?.().then((currentBattery) => {
			if (!isSubscribed) {
				return;
			}

			batteryManager = currentBattery;
			updateBattery(currentBattery);
			currentBattery.onlevelchange = () => {
				updateBattery(currentBattery);
			};
			currentBattery.onchargingchange = () => {
				updateBattery(currentBattery);
			};
		});

		return () => {
			isSubscribed = false;
			if (batteryManager !== null) {
				batteryManager.onlevelchange = null;
				batteryManager.onchargingchange = null;
			}
		};
	}, []);

	return battery;
}
