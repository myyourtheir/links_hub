import { View, Text } from 'react-native'
import React from 'react'
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import StyledText from './StyledText'
import { Slot } from "@radix-ui/react-slot"


const Form = FormProvider
type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)


const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

const FormItem = React.forwardRef<
	View,
	ViewProps & { additionClassName?: string }
>(({ additionClassName, ...props }, ref) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<View ref={ref} className={`px-4 space-y-2 my-4 ${additionClassName}`} {...props} />
		</FormItemContext.Provider>
	)
})

const FormLabel = React.forwardRef<
	React.ElementRef<typeof StyledText>,
	React.ComponentPropsWithoutRef<typeof StyledText>
>(({ additionClassName, ...props }, ref) => {
	const { error, formItemId } = useFormField()

	return (
		<StyledText
			ref={ref}
			additionClassName={`${error && "text-destructive"}  text-base ${additionClassName}`}
			{...props}
			key={formItemId}
		/>
	)
})

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
})


const FormDescription = React.forwardRef<
	React.ElementRef<typeof StyledText>,
	React.ComponentPropsWithoutRef<typeof StyledText>
>(({ additionClassName, ...props }, ref) => {
	const { formDescriptionId } = useFormField()

	return (
		<StyledText
			ref={ref}
			id={formDescriptionId}
			additionClassName={`text-sm text-muted-foreground ${additionClassName}`}
			{...props}
		/>
	)
})


const FormMessage = React.forwardRef<
	React.ElementRef<typeof StyledText>,
	React.ComponentPropsWithoutRef<typeof StyledText>
>(({ additionClassName, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<StyledText
			ref={ref}
			id={formMessageId}
			additionClassName={`text-sm font-medium text-destructive ${additionClassName}`}
			{...props}
		>
			{body}
		</StyledText>
	)
})


export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
}