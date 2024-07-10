import { View, Text } from 'react-native'
import React from 'react'
import FlatListImage from './FlatListImage'
import { Item } from '@/lib/Realm/models/Item'

const FlatListRowItem = ({ item }: { item: Item }) => {
	return (
		<View className='w-full flex flex-row gap-x-2 items-center mb-3'>
			<FlatListImage
				item={item}
				style={{
					width: 40,
					height: 40
				}}
			/>
			<Text>{item.title}</Text>
		</View>
	)
}

export default FlatListRowItem