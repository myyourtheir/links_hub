import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import FlatListImage from './FlatListImage'
import { Item } from '~/lib/Realm/models/Item'
import { useItemsFlatListContext } from './ItemsFlatListContext'
import { Text } from '../ui/text'
import { ItemComponentProps } from './types'

const FlatListRowItem = ({ item }: ItemComponentProps) => {
	const { onItemClick, onItemLongPress } = useItemsFlatListContext()
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onItemClick(item)}
			onLongPress={() => onItemLongPress(item)}
		>
			<View className='w-full flex flex-row gap-x-2 items-center mb-3'>
				<FlatListImage
					item={item}
					style={{
						width: 40,
						height: 40
					}}
				/>
				<Text className='text-base'>{item.title}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default FlatListRowItem