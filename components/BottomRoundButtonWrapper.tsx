import { View, Text, Pressable, PressableProps, KeyboardAvoidingView } from 'react-native'
import React, { ReactNode } from 'react'

type BottomRoundButtonProps = {
	children: ReactNode,
	buttonIcon: ReactNode
} & Partial<PressableProps>

const BottomRoundButtonWrapper = ({ children, buttonIcon, ...props }: BottomRoundButtonProps) => {
	return (
		<View className='relative h-full w-full bg-transparent'>
			{children}
			<KeyboardAvoidingView className='absolute bottom-32 right-6'>
				<Pressable className='rounded-full   w-16 h-16 bg-slate-900 flex flex-row items-center justify-center' {...props}>
					{buttonIcon}
				</Pressable>
			</KeyboardAvoidingView>
		</View>
	)
}

export default BottomRoundButtonWrapper