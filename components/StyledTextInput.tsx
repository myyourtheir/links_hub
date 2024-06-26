import { View, Text, TextInput } from 'react-native'
import React from 'react'
type StyledTextInputProps = {
	className?: string
} & Partial<TextInput>

const StyledTextInput = ({ className, ...props }: StyledTextInputProps) => {
	return (
		<TextInput
			cursorColor={'black'}
			className={`border rounded-md w-2/3 px-2 py-1 ${className}`}
			{...props}
		/>
	)
}

export default StyledTextInput