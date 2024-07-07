import { View } from 'react-native'
import React, { useState } from 'react'

import TopLayoutComponent from './(components)/TopLayoutComponent'
import { FlatListItemProps } from './(components)/types'
import images from '@/constants/images'
import ItemsFlatList from '@/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '@/lib/Realm'
import { Item } from '@/lib/Realm/models/Item'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'



const items: Array<FlatListItemProps['item']> = [
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

const { useQuery } = RealmContext

const HomeScreen = () => {
	const { currentFolder } = useGlobalContext()
	const items = useQuery(Item, items => {
		return items
			.filtered(`parent=${currentFolder}`)
			.sorted('updatedTime', false)
	}, [])
	const [orientationMode, setOrientationMode] = useState<'grid' | 'row'>('grid')
	return (
		<View className='h-[93vh]'>
			<TopLayoutComponent
				orientationMode={orientationMode}
				setOrientationMode={setOrientationMode}
			/>
			<ItemsFlatList data={items} orientationMode={orientationMode} />
		</View>
	)
}

export default HomeScreen