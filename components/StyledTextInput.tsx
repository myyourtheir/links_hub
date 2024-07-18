import { TextInput, TextInputProps } from 'react-native'
import React, { forwardRef } from 'react'
import { useColorScheme } from '~/lib/useColorScheme'

type StyledTextInputProps = {
	additionClassName?: string
} & Partial<TextInputProps>

const StyledTextInput = forwardRef<
	TextInput, StyledTextInputProps & TextInputProps>
	(({ additionClassName, ...props }, ref) => {
		const { colorScheme } = useColorScheme()
		return (
			<TextInput
				ref={ref}
				cursorColor={colorScheme === 'dark' ? 'white' : 'black'}
				className={`border-b-[0.5px] ${colorScheme === 'dark' ? 'border-white' : 'border-black'} dark:text-white rounded-md w-2/3 px-2  ${additionClassName}`}
				{...props}
			/>
		)
	})
export default StyledTextInput