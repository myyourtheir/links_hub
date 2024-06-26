import { View, Text, FlatList, RefreshControl, FlatListProps } from 'react-native'
import React, { useState } from 'react'

import TopLayoutComponent from './(components)/TopLayoutComponent'

import { extractOrientationDependingProps } from './utils/extractOrientationDependingProps'
import FlatListGridItem from '../../../components/ItemsFlatList/FlatListGridItem'
import { FlatListItemProps } from './(components)/types'
import images from '@/constants/images'
import FlatListRowItem from '../../../components/ItemsFlatList/FlatListRowItem'
import ItemsFlatList from '@/components/ItemsFlatList/ItemsFlatList'

const links: Array<FlatListItemProps['item']> = [
	{
		id: 1,
		title: 'Папка 1',
		// image: images.folder,
		type: 'link'
	},
	{
		id: 2,
		title: 'Папка 2',
		image: images.folder,
		type: 'folder'
	},
	{
		id: 3,
		title: 'Папка 3',
		image: images.folder,
		type: 'folder'
	},
	{
		id: 4,
		title: 'Папка 4',
		image: images.folder,
		type: 'folder'
	},
	{
		id: 5,
		title: 'Папка 5',
		image: images.folder,
		type: 'folder'
	},
	{
		id: 6,
		title: 'Папка 6',
		image: images.folder,
		type: 'folder'
	},
	{
		id: 7,
		title: 'Папка 5',
		image: images.folder,
		type: 'folder'
	},
	{
		id: 8,
		title: 'Папка 6',
		image: images.folder,
		type: 'folder'
	}
]


const HomeScreen = () => {
	const [orientationMode, setOrientationMode] = useState<'grid' | 'row'>('grid')

	return (
		<View className='h-[93vh]'>
			<TopLayoutComponent
				orientationMode={orientationMode}
				setOrientationMode={setOrientationMode}
			/>
			<ItemsFlatList data={links} orientationMode={orientationMode} />
		</View>
	)
}

export default HomeScreen