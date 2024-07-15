import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'
type StyledTextInputProps = {
	additionClassName?: string
} & Partial<TextInputProps>

const StyledTextInput = ({ additionClassName, ...props }: StyledTextInputProps) => {
	return (
		<TextInput
			cursorColor={'black'}
			className={`border rounded-md w-2/3 px-2 py-1 ${additionClassName}`}
			{...props}
		/>
	)
}

export default StyledTextInput