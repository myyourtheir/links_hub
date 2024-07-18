import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useColorScheme } from '~/lib/useColorScheme'
import { cn } from '~/lib/utils'


type TopContentProps = {
	children?: ReactNode
	className?: string
}

const TopContent: FC<TopContentProps> = ({ children, className }) => {
	return (
		<View
			className={cn('h-[8vh] flex flex-row items-center justify-between  bg-background', className)}
		>
			{children}
		</View>
	)
}

export default TopContent