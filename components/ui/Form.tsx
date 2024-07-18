import { View } from 'react-native'
import React from 'react'
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { Slot } from "@radix-ui/react-slot"
import { Text } from './text'
import { Label } from './label'
import { cn } from '~/lib/utils'


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
	ViewProps & { className?: string }
>(({ className, ...props }, ref) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<View ref={ref} className={cn(`px-4 space-y-2 my-4`, className)} {...props} />
		</FormItemContext.Provider>
	)
})

const FormLabel = React.forwardRef<
	React.ElementRef<typeof Label>,
	React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField()

	return (
		<Label
			ref={ref}
			className={cn(error && "text-destructive", 'text-base', className)}
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
	React.ElementRef<typeof Text>,
	React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField()

	return (
		<Text
			ref={ref}
			id={formDescriptionId}
			className={cn(`text-sm text-muted-foreground`, className)}
			{...props}
		/>
	)
})


const FormMessage = React.forwardRef<
	React.ElementRef<typeof Text>,
	React.ComponentPropsWithoutRef<typeof Text>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	// if (!body) {
	// 	return (
	// 		<View
	// 			className={cn(`text-sm font-medium text-destructive`, className)}
	// 		>
	// 			{' '}
	// 		</View>
	// 	)
	// }

	return (
		<Text
			ref={ref}
			id={formMessageId}
			className={cn(`text-sm font-medium text-destructive`, className)}
			{...props}
		>
			{body || ''}
		</Text>
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