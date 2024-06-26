import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'

type TopContentProps = {
	children: ReactNode
	className?: string
}

const TopContent: FC<TopContentProps> = ({ children, className }) => {
	return (
		<View
			className={`h-[7vh] px-4  flex flex-row items-center justify-between bg-top border-b-[0.5px] ${className}`}
		>
			{children}
		</View>
	)
}

export default TopContent