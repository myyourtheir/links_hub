import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import images from '@/constants/images'
import FlatListImage from './FlatListImage'
import { Item } from '@/lib/Realm/models/Item'
import { useItemsFlatListContext } from './ItemsFlatListContext'
import StyledText from '../StyledText'




const FlatListGridItem = ({ item }: { item: Item }) => {
	const { onItemClick } = useItemsFlatListContext()
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onItemClick(item)}
		>
			<View className='flex flex-col mb-3'>
				<FlatListImage
					className='w-full h-full'
					item={item}
					style={{
						width: 160,
						height: 160
					}}
				/>
				<StyledText
					className=' max-w-[160px] max-h-5 truncate hover:text-clip  text-center text-base mt-0'>{item.title}</StyledText>
			</View>
		</TouchableOpacity>
	)
}

export default FlatListGridItem