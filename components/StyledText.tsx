import { Text, TextProps } from 'react-native'
import React, { forwardRef, ReactNode } from 'react'
import { StyledComponent, useColorScheme } from 'nativewind'


const StyledText = forwardRef<
	Text, { children?: ReactNode, additionClassName?: string } & TextProps
>(({ children, additionClassName, ...props }, ref) => {
	const { colorScheme } = useColorScheme()
	const textColor = colorScheme == 'dark' ? 'text-white' : 'text-black'
	return (
		<Text ref={ref} className={`${textColor} ${additionClassName}`} {...props}>
			{children}
		</Text>
	)
})

export default StyledText