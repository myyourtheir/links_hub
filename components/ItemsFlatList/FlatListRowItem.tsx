import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FlatListImage from './FlatListImage'
import { Item } from '~/lib/Realm/models/Item'
import { useItemsFlatListContext } from './ItemsFlatListContext'
import StyledText from '../StyledText'

const FlatListRowItem = ({ item }: { item: Item }) => {
	const { onItemClick } = useItemsFlatListContext()
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onItemClick(item)}
		>
			<View className='w-full flex flex-row gap-x-2 items-center mb-3'>
				<FlatListImage
					item={item}
					style={{
						width: 40,
						height: 40
					}}
				/>
				<StyledText additionClassName='text-base'>{item.title}</StyledText>
			</View>
		</TouchableOpacity>
	)
}

export default FlatListRowItem