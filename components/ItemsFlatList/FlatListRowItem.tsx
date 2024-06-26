import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatListItemProps } from '../../app/(tabs)/HomeScreen/(components)/types'
import FlatListImage from './FlatListImage'

const FlatListRowItem = ({ item }: FlatListItemProps) => {
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