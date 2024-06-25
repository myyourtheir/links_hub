import { View, Text } from 'react-native'
import React from 'react'
import { FlatListItemProps } from './types'

const FlatListRowItem = ({ item }: FlatListItemProps) => {
	return (
		<View className='w-full flex flex-row gap-x-2 items-center'>
			<View className='bg-gray-500 h-10 w-10 rounded-md' />
			<Text>{item.title}</Text>
		</View>
	)
}

export default FlatListRowItem