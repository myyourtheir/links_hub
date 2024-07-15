import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useColorScheme } from 'nativewind'

type TopContentProps = {
	children?: ReactNode
	className?: string
}

const TopContent: FC<TopContentProps> = ({ children, className }) => {
	const { colorScheme } = useColorScheme()
	return (
		<View
			className={`h-[7vh] px-4  flex flex-row items-center justify-between bg-top dark:bg-neutral-900 shadow ${colorScheme == 'light' ? 'shadow-black' : ' border-b-[0.5px] '}  ${className}`}
		>
			{children}
		</View>
	)
}

export default TopContent