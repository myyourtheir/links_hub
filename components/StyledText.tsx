import { Text } from 'react-native'
import React, { ReactNode } from 'react'
import { StyledComponent, useColorScheme } from 'nativewind'

const StyledText = ({ className, children }: { children: ReactNode, className: string }) => {
	const { colorScheme } = useColorScheme()
	const textColor = colorScheme == 'dark' ? 'text-white' : 'text-black'

	return (

		<Text className={`${textColor} ${className}`}>
			{children}
		</Text>


	)
}

export default StyledText