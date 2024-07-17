import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useColorScheme } from 'nativewind'

type TopContentProps = {
	children?: ReactNode
	additionClassName?: string
}

const TopContent: FC<TopContentProps> = ({ children, additionClassName }) => {
	const { colorScheme } = useColorScheme()
	return (
		<View
			className={`h-[7vh] px-4  flex flex-row items-center justify-between bg-top dark:bg-black  ${colorScheme == 'light' ? 'shadow shadow-black' : ''}  ${additionClassName}`}
		>
			{children}
		</View>
	)
}

export default TopContent