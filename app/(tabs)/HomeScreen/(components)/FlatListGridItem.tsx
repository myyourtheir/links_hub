import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { FlatListItemProps } from './types'



const FlatListGridItem = ({ item }: FlatListItemProps) => {
	return (
		<View className='flex flex-col mb-3'>
			<View className='bg-gray-500 h-40 w-40 rounded-md' />
			<Text className='w-full text-center mt-2'>{item.title}</Text>
		</View>
	)
}

export default FlatListGridItem