import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useColorScheme } from '~/lib/useColorScheme'


type TopContentProps = {
	children?: ReactNode
	additionClassName?: string
}

const TopContent: FC<TopContentProps> = ({ children, additionClassName }) => {
	return (
		<View
			className={`h-[7vh] px-4  flex flex-row items-center justify-between    ${additionClassName}`}
		>
			{children}
		</View>
	)
}

export default TopContent