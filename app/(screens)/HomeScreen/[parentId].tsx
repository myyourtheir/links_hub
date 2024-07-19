import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import TopLayoutComponent from './(components)/TopLayoutComponent'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router, useLocalSearchParams } from 'expo-router'
import { Text } from '~/components/ui/text'
import BottomFlatListOptionsBarWrapper from '~/components/ItemsFlatList/BottomFlatListOptionsBar/BottomFlatListOptionsBarWrapper'




const { useQuery } = RealmContext

const HomeScreen = () => {
	const { parentId } = useLocalSearchParams()
	let items = useQuery(Item, items => {
		return items
			.filtered(`parentId=${parentId != 'null' ? 'oid(' + parentId + ')' : null}`)
			.sorted('updatedTime', false)
	}, [parentId])

	if (items.length % 2 !== 0) {
		items = [...items.snapshot(), {
			_id: new BSON.ObjectID,
			type: 'empty',
		}] as any
	}
	const handleItemClick = (item: Item) => {
		if (item.type === 'folder') {
			router.push({ pathname: '/HomeScreen/[parentId]', params: { parentId: item._id.toString() } })
		}
		if (item.type === 'link') {
			if (item.url) {
				router.push(item.url)
			}
			else {
				throw new Error('No link in item')
			}
		}

	}

	return (
		<BottomFlatListOptionsBarWrapper>
			<TopLayoutComponent
				parentId={parentId as string}
			/>
			<ItemsFlatList
				data={items as ArrayLike<Item>}
				ListEmptyComponent={() => <ItemsFlatListEmptyComponent parentId={parentId} />}
				onItemClick={handleItemClick}
			/>
		</BottomFlatListOptionsBarWrapper>
	)
}

export default HomeScreen


function ItemsFlatListEmptyComponent({ parentId }: { parentId?: string | string[] }) {
	return (
		<View
			className='w-full h-full items-center pt-10 gap-8 justify-center '
		>
			<Text className='text-md'>
				Здесь пока ничего нет...
			</Text>
		</View>
	)
}