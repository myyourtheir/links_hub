import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'
type StyledTextInputProps = {
	additionClassName?: string
} & Partial<TextInputProps>

const StyledTextInput = ({ additionClassName, ...props }: StyledTextInputProps) => {
	return (
		<TextInput
			cursorColor={'black'}
			className={`border-b-[0.5px] rounded-md w-2/3 px-2  ${additionClassName}`}
			{...props}
		/>
	)
}

export default StyledTextInput