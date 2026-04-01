import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { cn } from "../../utils";
import { RadioGroup, RadioItem } from "./structure";

export interface RadioOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface RadioFieldProps extends HTMLAttributes<HTMLDivElement> {
	label?: string;
	groupProps: Omit<ComponentPropsWithoutRef<typeof RadioGroup>, "children">;
	options: RadioOption[];
}

export function RadioField({
	className,
	groupProps,
	label,
	options,
}: RadioFieldProps) {
	return (
		<div className={cn("space-y-2", className)}>
			{label ? (
				<p className="text-[1rem] leading-none font-semibold text-ll-gray">
					{label}
				</p>
			) : null}
			<RadioGroup {...groupProps}>
				{options.map((option) => (
					<div
						key={option.value}
						className="inline-flex items-center gap-1.5 text-[1rem] leading-none font-semibold text-ll-gray data-[disabled=true]:text-ll-disabled"
						data-disabled={option.disabled ? "true" : "false"}
					>
						<RadioItem
							value={option.value}
							disabled={option.disabled}
							aria-label={option.label}
						/>
						<button
							type="button"
							disabled={option.disabled}
							className="cursor-pointer leading-none disabled:cursor-not-allowed"
							onClick={(event) => {
								const itemButton = event.currentTarget.previousElementSibling;
								if (itemButton instanceof HTMLButtonElement) {
									itemButton.click();
								}
							}}
						>
							{option.label}
						</button>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}

export interface RadioFieldRowProps extends Omit<RadioFieldProps, "className"> {
	label: string;
	rowClassName?: string;
}

export function RadioFieldRow({
	groupProps,
	label,
	options,
	rowClassName,
}: RadioFieldRowProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-[4.3rem_1fr] items-center gap-2",
				rowClassName,
			)}
		>
			<p className="text-[1rem] leading-none font-semibold text-ll-gray">
				{label}
			</p>
			<RadioField
				className="space-y-0"
				groupProps={{
					...groupProps,
					className: cn("gap-x-3", groupProps.className),
				}}
				options={options}
			/>
		</div>
	);
}
