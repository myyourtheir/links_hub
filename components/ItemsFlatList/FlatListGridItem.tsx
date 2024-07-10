import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import images from '@/constants/images'
import FlatListImage from './FlatListImage'
import { Item } from '@/lib/Realm/models/Item'




const FlatListGridItem = ({ item }: { item: Item }) => {
	return (
		<View className='flex flex-col mb-3'>
			<FlatListImage
				className='w-full h-full'
				item={item}
				style={{
					width: 160,
					height: 160
				}}
			/>
			<Text className='w-full text-center mt-0'>{item.title}</Text>
		</View>
	)
}

export default FlatListGridItem