import { View, Text, FlatList } from 'react-native'
import React, { FC } from 'react'
import FlatListGridItem from '@/components/ItemsFlatList/FlatListGridItem'
import FlatListRowItem from '@/components/ItemsFlatList/FlatListRowItem'
import { extractOrientationDependingProps } from '@/app/(tabs)/HomeScreen/utils/extractOrientationDependingProps'

type ItemsFlatListProps = {
	data: ArrayLike<any> | null | undefined
	orientationMode?: 'grid' | 'row' | undefined
}

const ItemsFlatList: FC<ItemsFlatListProps> = ({ data, orientationMode }) => {
	return (
		<FlatList
			contentContainerStyle={{
				paddingHorizontal: 8
			}}
			data={data}
			keyExtractor={(item) => item.id.toString()}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (

				orientationMode === 'row' ?
					<FlatListRowItem item={item} />
					:
					<FlatListGridItem item={item} />
			)}
			ListEmptyComponent={() => (
				<View>
					<Text>
						No data
					</Text>
				</View>
			)}
			{...extractOrientationDependingProps({ orientationMode })}
		/>
	)
}

export default ItemsFlatList