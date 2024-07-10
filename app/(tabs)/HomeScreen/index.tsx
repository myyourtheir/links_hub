import { View } from 'react-native'
import React, { useState } from 'react'

import TopLayoutComponent from './(components)/TopLayoutComponent'

import images from '@/constants/images'
import ItemsFlatList from '@/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '@/lib/Realm'
import { Item } from '@/lib/Realm/models/Item'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { BSON } from 'realm'



const items: Array<Partial<Item>> = [
	{
		_id: new BSON.ObjectID,
		title: 'Папка 1',
		// image: images.folder,
		type: 'link'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 2',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 3',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 4',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 5',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 6',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 7',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 8',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 9',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 10',
		image: images.folder,
		type: 'folder'
	},
	{
		_id: new BSON.ObjectID,
		title: 'Папка 11',
		image: images.folder,
		type: 'folder'
	},

]

const { useQuery } = RealmContext

const HomeScreen = () => {
	const { currentFolder } = useGlobalContext()
	// const items = useQuery(Item, items => {
	// 	return items
	// 		.filtered(`parent=${currentFolder}`)
	// 		.sorted('updatedTime', false)
	// }, [])
	const [orientationMode, setOrientationMode] = useState<'grid' | 'row'>('grid')
	if (items.length % 2 !== 0) {
		items.push({
			_id: new BSON.ObjectID,
			type: 'empty'
		})
	}
	return (
		<View className='h-full'>
			<TopLayoutComponent
				orientationMode={orientationMode}
				setOrientationMode={setOrientationMode}
			/>
			<ItemsFlatList data={items as Item[]} orientationMode={orientationMode} />
		</View>
	)
}

export default HomeScreen