import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { FC, ReactNode } from 'react'
import FlatListGridItem from '@/components/ItemsFlatList/FlatListGridItem'
import FlatListRowItem from '@/components/ItemsFlatList/FlatListRowItem'
import { extractOrientationDependingProps } from '@/utils/extractOrientationDependingProps'
import { router } from 'expo-router'
import { Item } from '@/lib/Realm/models/Item'
import { ItemsFlatListContext } from './ItemsFlatListContext'



type ItemsFlatListProps = {
	data: ArrayLike<Item> | null | undefined
	orientationMode?: 'grid' | 'row' | undefined
	onItemClick: (item: Item) => void
	EmptyComponent: ReactNode
}

const ItemsFlatList: FC<ItemsFlatListProps> = ({ data, orientationMode, onItemClick, EmptyComponent }) => {
	return (
		<ItemsFlatListContext.Provider value={{
			onItemClick
		}}>
			<FlatList
				contentContainerStyle={{
					paddingHorizontal: 8
				}}
				data={data}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					orientationMode === 'row' ?
						<FlatListRowItem item={item} />
						:
						<FlatListGridItem item={item} />
				)}
				ListEmptyComponent={() => EmptyComponent}
				{...extractOrientationDependingProps({ orientationMode })}
			/>
		</ItemsFlatListContext.Provider>
	)
}

export default ItemsFlatList





