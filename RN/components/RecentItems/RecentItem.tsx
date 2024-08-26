import { View, TouchableOpacity } from 'react-native'
import React from 'react'

import { Item } from '~/lib/Realm/models/Item'

import { Text } from '../ui/text'
import { useItemsFlatListContext } from '../ItemsFlatList/ItemsFlatListContext'
import { ItemComponentProps } from '../ItemsFlatList/types'
import FlatListImage from '../ItemsFlatList/FlatListImage'





const RecentItem = ({ item }: ItemComponentProps) => {
	const { onItemClick, onItemLongPress } = useItemsFlatListContext()
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onItemClick(item)}
			onLongPress={() => onItemLongPress(item)}
		>
			<View className='flex flex-col'>
				<FlatListImage
					className='w-full h-full'
					item={item}
					style={{
						width: 70,
						height: 70
					}}
				/>
				<Text
					numberOfLines={1}
					style={{
						width: 70
					}}
					className='font-normal text-ellipsis whitespace-nowrap overflow-hidden text-center text-sm mt-2'
				>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default RecentItem