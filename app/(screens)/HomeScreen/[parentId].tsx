import { View } from 'react-native'
import React, { useEffect } from 'react'
import TopLayoutComponent from './(components)/TopLayoutComponent'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router, useLocalSearchParams } from 'expo-router'
import { Text } from '~/components/ui/text'
import BottomFlatListOptionsBarWrapper from '~/components/ItemsFlatList/BottomFlatListOptionsBar/BottomFlatListOptionsBarWrapper'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import useRedirectWhenShareIntent from '~/hooks/useRedirectWhenShareIntent'
import RecentItems from '~/components/RecentItems'
import useHandleBack from '~/hooks/useHanldeBack'




const { useQuery, useRealm } = RealmContext

const HomeScreen = () => {
	useRedirectWhenShareIntent()
	const { parentId } = useLocalSearchParams()
	const { globalDispatch, globalState: { mode } } = useGlobalContext()
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

	useEffect(() => {
		globalDispatch({
			type: 'setFolderToSetIn',
			value: parentId !== 'null' ? new BSON.ObjectId(parentId as string) : null
		})
	}, [])

	useHandleBack(() => {
		if (mode === 'select') {
			globalDispatch({ type: 'setMode', value: 'view' })
			globalDispatch({ type: 'resetSelected' })
			return true
		} else {
			return false
		}
	}, [mode, parentId])

	const renderItems = [...items]

	if (renderItems.length % 2 !== 0) {
		renderItems.push({
			_id: new BSON.ObjectId,
			type: 'empty',
		} as Item)
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
			{
				parentId === 'null'
				&&
				<RecentItems />
			}
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
	const { t } = useGlobalContext()
	return (
		<View
			className='w-full h-full items-center pt-10 gap-8 justify-center '
		>
			<Text className='text-md'>
				{t('nothing')}
			</Text>
		</View>
	)
}