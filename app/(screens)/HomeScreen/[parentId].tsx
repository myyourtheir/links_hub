import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import TopLayoutComponent from './(components)/TopLayoutComponent'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router, useLocalSearchParams } from 'expo-router'
import { Text } from '~/components/ui/text'
import BottomFlatListOptionsBarWrapper from '~/components/ItemsFlatList/BottomFlatListOptionsBar/BottomFlatListOptionsBarWrapper'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'




const { useQuery, useRealm } = RealmContext

const HomeScreen = () => {
	const { parentId } = useLocalSearchParams()

	const { globalDispatch } = useGlobalContext()
	const realm = useRealm()
	const items = useQuery(
		{
			type: Item,
			query: items => {
				return items
					.filtered(`parentId=${parentId !== 'null' ? 'oid(' + parentId + ')' : null}`)
					.sorted(['type', 'updatedTime'])
			}
		}, [realm])
	const renderItems = useMemo(() => {
		const newItems = [...items]
		if (items.length % 2 !== 0) {
			newItems.push({
				_id: new BSON.ObjectID,
				type: 'empty',
			} as Item)
		}
		return newItems
	}, [items])
	// if (!items.isValid()) return null
	const handleItemClick = (item: Item) => {
		if (item.type === 'folder') {
			globalDispatch({ type: 'setFolderToSetIn', value: item._id })
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
				data={renderItems as ArrayLike<Item>}
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