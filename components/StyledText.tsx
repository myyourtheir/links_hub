import { Text, TextProps } from 'react-native'
import React, { ReactNode } from 'react'
import { StyledComponent, useColorScheme } from 'nativewind'

const StyledText = ({ children, additionClassName, ...props }: { children: ReactNode, additionClassName?: string } & TextProps) => {
	const { colorScheme } = useColorScheme()
	const textColor = colorScheme == 'dark' ? 'text-white' : 'text-black'
	console.log(additionClassName)
	return (
		<Text className={`${textColor} ${additionClassName}`}>
			{children}
		</Text>
	)
}

export default StyledText