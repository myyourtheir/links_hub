import { View, Text, FlatList, RefreshControl, FlatListProps } from 'react-native'
import React, { useState } from 'react'

import TopLayoutComponent from './(components)/TopLayoutComponent'

import { extractOrientationDependingProps } from './utils/extractOrientationDependingProps'
import FlatListGridItem from './(components)/FlatListGridItem'
import { FlatListItemProps } from './(components)/types'
import images from '@/constants/images'

const links: Array<FlatListItemProps['item']> = [
	{
		id: 1,
		title: 'Папка 1',
		image: images.folder
	},
	{
		id: 2,
		title: 'Папка 2',
		image: images.folder
	},
	{
		id: 3,
		title: 'Папка 3',
		image: images.folder,
	},
	{
		id: 4,
		title: 'Папка 4',
		image: images.folder
	},
	{
		id: 5,
		title: 'Папка 5',
		image: images.folder
	},
	{
		id: 6,
		title: 'Папка 6',
		image: images.folder
	},
	{
		id: 7,
		title: 'Папка 5',
		image: images.folder
	},
	{
		id: 8,
		title: 'Папка 6',
		image: images.folder
	}
]


const HomeScreen = () => {
	const [orientationMode, setOrientationMode] = useState<'grid' | 'row'>('grid')

	return (
		<FlatList
			contentContainerStyle={{}}
			data={links}
			keyExtractor={(item) => item.id.toString()}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<FlatListGridItem item={item} />
			)}
			ListHeaderComponent={() => (
				<TopLayoutComponent orientationMode={orientationMode} setOrientationMode={setOrientationMode} />
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

export default HomeScreen