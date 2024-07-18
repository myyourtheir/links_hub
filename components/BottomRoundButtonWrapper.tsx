import { View, Text, Pressable, PressableProps, KeyboardAvoidingView, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react'

type BottomRoundButtonProps = {
	children: ReactNode,
	buttonIcon: ReactNode
} & Partial<TouchableOpacityProps>

const BottomRoundButtonWrapper = ({ children, buttonIcon, ...props }: BottomRoundButtonProps) => {
	return (
		<View className='relative h-full w-full bg-transparent'>
			{children}
			<KeyboardAvoidingView className='absolute bottom-32 right-6'>
				<TouchableOpacity className='rounded-full   w-16 h-16 bg-foreground flex flex-row items-center justify-center' {...props}>
					{React.cloneElement(buttonIcon as ReactElement<any, string | JSXElementConstructor<any>>, {
						className: 'text-background',
						size: 32
					})}
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
}

export default BottomRoundButtonWrapper