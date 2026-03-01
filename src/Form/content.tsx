import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";
import {
	FormInputPrimitive,
	FormSelectPrimitive,
	FormTextareaPrimitive,
} from "./primitives";
import {
	FormField,
	FormFieldErrorText,
	FormFieldHeader,
	FormFieldLabelText,
	FormFieldMeta,
	FormFieldRequiredText,
	FormSelectIndicator,
} from "./structure";

export interface FormOption {
	label: string;
	value: string;
}

export interface FormFieldLabelProps {
	errorText?: string | undefined;
	label: string;
	required?: boolean | undefined;
	requiredText?: string | undefined;
}

export function FormFieldLabel({
	errorText,
	label,
	required = false,
	requiredText = "必須項目",
}: FormFieldLabelProps) {
	return (
		<FormFieldHeader>
			<FormFieldMeta>
				<FormFieldLabelText>{label}</FormFieldLabelText>
				{required ? (
					<FormFieldRequiredText>{requiredText}</FormFieldRequiredText>
				) : null}
			</FormFieldMeta>
			{errorText ? <FormFieldErrorText>{errorText}</FormFieldErrorText> : null}
		</FormFieldHeader>
	);
}

export interface FormInputFieldProps
	extends Omit<ComponentPropsWithoutRef<typeof FormInputPrimitive>, "children">,
		FormFieldLabelProps {
	fieldClassName?: string;
}

export function FormInputField({
	errorText,
	fieldClassName,
	label,
	required,
	requiredText,
	className,
	...props
}: FormInputFieldProps) {
	return (
		<FormField className={fieldClassName}>
			<FormFieldLabel
				errorText={errorText}
				label={label}
				required={required}
				requiredText={requiredText}
			/>
			<FormInputPrimitive className={className} {...props} />
		</FormField>
	);
}

export interface FormTextareaFieldProps
	extends Omit<
			ComponentPropsWithoutRef<typeof FormTextareaPrimitive>,
			"children"
		>,
		FormFieldLabelProps {
	fieldClassName?: string;
}

export function FormTextareaField({
	errorText,
	fieldClassName,
	label,
	required,
	requiredText,
	className,
	...props
}: FormTextareaFieldProps) {
	return (
		<FormField className={fieldClassName}>
			<FormFieldLabel
				errorText={errorText}
				label={label}
				required={required}
				requiredText={requiredText}
			/>
			<FormTextareaPrimitive className={className} {...props} />
		</FormField>
	);
}

export interface FormSelectFieldProps
	extends Omit<
			ComponentPropsWithoutRef<typeof FormSelectPrimitive>,
			"children"
		>,
		FormFieldLabelProps {
	fieldClassName?: string;
	placeholder?: string;
	options: FormOption[];
}

export function FormSelectField({
	errorText,
	fieldClassName,
	label,
	required,
	requiredText,
	placeholder = "",
	options,
	className,
	value,
	defaultValue,
	...props
}: FormSelectFieldProps) {
	const selectValue = typeof value === "string" ? value : undefined;
	const hasPlaceholder = placeholder.length > 0;
	const usesPlaceholderColor = hasPlaceholder && selectValue === "";

	return (
		<FormField className={fieldClassName}>
			<FormFieldLabel
				errorText={errorText}
				label={label}
				required={required}
				requiredText={requiredText}
			/>
			<div className="relative">
				<FormSelectPrimitive
					className={cn(
						usesPlaceholderColor ? "text-ll-disabled" : "text-ll-gray",
						className,
					)}
					value={value}
					defaultValue={defaultValue}
					{...props}
				>
					{hasPlaceholder ? (
						<option value="" disabled>
							{placeholder}
						</option>
					) : null}
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</FormSelectPrimitive>
				<FormSelectIndicator />
			</div>
		</FormField>
	);
}
