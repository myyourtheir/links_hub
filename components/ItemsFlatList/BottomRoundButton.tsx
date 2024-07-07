import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

type BottomRoundButtonProps = {
	children: any,
} & Partial<PressableProps>

const BottomRoundButton = ({ children, ...props }: BottomRoundButtonProps) => {
	return (
		<Pressable className='rounded-full  absolute w-16 h-16 bg-slate-900 flex flex-row items-center justify-center bottom-16 right-6' {...props}>
			{children}
		</Pressable>
	)
}

export default BottomRoundButton