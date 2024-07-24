import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router, useLocalSearchParams } from 'expo-router'
import { Text } from '~/components/ui/text'
import BottomFlatListOptionsBarWrapper from '~/components/ItemsFlatList/BottomFlatListOptionsBar/BottomFlatListOptionsBarWrapper'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import useRedirectWhenShareIntent from '~/hooks/useRedirectWhenShareIntent'
import TopBar from './(components)/TopBar'




const { useQuery, useRealm } = RealmContext

const SearchScreen = () => {
	const [searchText, setSearchText] = useState('')
	const { globalDispatch } = useGlobalContext()
	const realm = useRealm()
	// const items = useQuery(
	// 	{
	// 		type: Item,
	// 		query: items => {
	// 			return items
	// 				.filtered(`parentId=${parentId !== 'null' ? 'oid(' + parentId + ')' : null}`)
	// 				.sorted(['type', 'updatedTime'])
	// 		}
	// 	}, [realm])

	// const renderItems = [...items]
	// if (items?.length % 2 !== 0) {
	// 	renderItems.push({
	// 		_id: new BSON.ObjectID,
	// 		type: 'empty',
	// 	} as Item)
	// }

	// if (!items.isValid()) return null
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
			<TopBar
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			{/* <ItemsFlatList
				data={renderItems as ArrayLike<Item>}
				ListEmptyComponent={() => <ItemsFlatListEmptyComponent />}
				onItemClick={handleItemClick}
			/> */}
		</BottomFlatListOptionsBarWrapper>
	)
}

export default SearchScreen


function ItemsFlatListEmptyComponent() {
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