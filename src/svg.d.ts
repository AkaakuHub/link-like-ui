declare module "*.svg" {
	import type { FC, SVGProps } from "react";

	const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

interface ImportMeta {
	readonly env: Record<string, string | undefined>;
}
