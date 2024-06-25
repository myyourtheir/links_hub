import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatListItemProps } from './types'
import images from '@/constants/images'

const FlatListRowItem = ({ item }: FlatListItemProps) => {
	return (
		<View className='w-full flex flex-row gap-x-2 items-center mb-3'>
			<Image source={item.image} resizeMode='contain' className='w-10 h-10' />
			<Text>{item.title}</Text>
		</View>
	)
}

export default FlatListRowItem