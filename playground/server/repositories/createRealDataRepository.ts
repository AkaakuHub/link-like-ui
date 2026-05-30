import type { RealDataConfig, RealDataRepository } from "../domain/realData";
import { PostgresDockerRealDataRepository } from "./postgresDockerRealDataRepository";
import { StaticRealDataRepository } from "./staticRealDataRepository";

export function createRealDataRepository(
	config: RealDataConfig,
): RealDataRepository {
	if (config.source === "postgresDocker") {
		return new PostgresDockerRealDataRepository(config);
	}

	return new StaticRealDataRepository(config);
}
