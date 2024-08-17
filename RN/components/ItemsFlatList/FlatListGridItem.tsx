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
			<View
				className='max-w-[160px]'
				style={{
					marginBottom: 32
				}}
			>
				<FlatListImage
					className='w-full h-full'
					item={item}
					style={{
						width: 160,
						height: 160
					}}
				/>
				<Text
					numberOfLines={1}
					className='font-normal text-ellipsis whitespace-nowrap overflow-hidden text-center mt-2'
				>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default FlatListGridItem