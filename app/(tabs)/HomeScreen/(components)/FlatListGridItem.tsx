import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { FlatListItemProps } from './types'
import images from '@/constants/images'



const FlatListGridItem = ({ item }: FlatListItemProps) => {
	return (
		<View className='flex flex-col mb-3'>
			<Image source={item.image} resizeMode='contain' className='w-40 h-40' />
			<Text className='w-full text-center mt-2'>{item.title}</Text>
		</View>
	)
}

export default FlatListGridItem