import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import FlatListGridItem from '@/components/ItemsFlatList/FlatListGridItem'
import FlatListRowItem from '@/components/ItemsFlatList/FlatListRowItem'
import { extractOrientationDependingProps } from '@/utils/extractOrientationDependingProps'
import { router } from 'expo-router'


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
			ListEmptyComponent={EmptyComponent}
			{...extractOrientationDependingProps({ orientationMode })}
		/>
	)
}

export default ItemsFlatList



function EmptyComponent() {
	return (
		<View
			className='w-full items-center pt-3 gap-8 justify-center '
		>
			<Text className='text-md'>
				Здесь пока ничего нет
			</Text>
			<TouchableOpacity
				onPress={() => router.push('/AddingScreen')}
				className='border rounded-md px-3 py-2'
			>
				<Text className='text-lg'>
					Добавьте элемент
				</Text>
			</TouchableOpacity>
		</View>
	)
}

