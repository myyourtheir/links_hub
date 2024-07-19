import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import FlatListImage from './FlatListImage'
import { Item } from '~/lib/Realm/models/Item'
import { useItemsFlatListContext } from './ItemsFlatListContext'
import { Text } from '../ui/text'
import { ItemComponentProps } from './types'




const FlatListGridItem = ({ item }: ItemComponentProps) => {
	const { onItemClick, onItemLongPress } = useItemsFlatListContext()
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onItemClick(item)}
			onLongPress={() => onItemLongPress(item)}
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
				<Text
					className={"max-w-[160px] max-h-5 truncate hover:text-clip text-center text-base mt-0"}
				>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default FlatListGridItem