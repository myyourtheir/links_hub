import { View, Text, Pressable, PressableProps } from 'react-native'
import React, { ReactNode } from 'react'

type BottomRoundButtonProps = {
	children: ReactNode,
	buttonIcon: ReactNode
} & Partial<PressableProps>

const BottomRoundButtonWrapper = ({ children, buttonIcon, ...props }: BottomRoundButtonProps) => {
	return (
		<View className='relative h-full w-full bg-transparent'>
			{children}
			<Pressable className='rounded-full z-50  absolute w-16 h-16 bg-slate-900 flex flex-row items-center justify-center bottom-16 right-6' {...props}>
				{buttonIcon}
			</Pressable>
		</View>
	)
}

export default BottomRoundButtonWrapper