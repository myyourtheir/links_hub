import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { FlatListItemProps } from '../../app/(tabs)/HomeScreen/(components)/types'
import images from '@/constants/images'
import FlatListImage from './FlatListImage'




const FlatListGridItem = ({ item }: FlatListItemProps) => {
	return (
		<View className='flex flex-col mb-3'>
			<FlatListImage
				item={item}
				style={{
					width: 160,
					height: 160
				}}
			/>
			<Text className='w-full text-center mt-2'>{item.title}</Text>
		</View>
	)
}

export default FlatListGridItem