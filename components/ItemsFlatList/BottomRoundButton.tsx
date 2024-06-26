import { View, Text, Pressable } from 'react-native'
import React from 'react'

type BottomRoundButtonProps = {
	children: any
}

const BottomRoundButton = ({ children }: BottomRoundButtonProps) => {
	return (
		<Pressable className='rounded-full  absolute w-16 h-16 bg-slate-900 flex flex-row items-center justify-center bottom-10 right-6'>
			{children}
		</Pressable>
	)
}

export default BottomRoundButton