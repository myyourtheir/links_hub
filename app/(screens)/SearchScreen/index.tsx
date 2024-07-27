import { TouchableOpacity, View } from 'react-native'
import React, { useDeferredValue, useEffect, useMemo, useState } from 'react'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router } from 'expo-router'
import { Text } from '~/components/ui/text'
import BottomFlatListOptionsBarWrapper from '~/components/ItemsFlatList/BottomFlatListOptionsBar/BottomFlatListOptionsBarWrapper'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import TopBar from './(components)/TopBar'
import { useTranslation } from 'react-i18next'
const { useQuery, useRealm } = RealmContext



const SearchScreen = () => {
	const [searchText, setSearchText] = useState('')
	const defferedText = useDeferredValue(searchText)
	const { globalState: { mode } } = useGlobalContext()
	const realm = useRealm()

	const items = useQuery(
		{
			type: Item,
			query: items => {
				if (defferedText == '') {
					return items
				} else {
					return items.filtered('title CONTAINS[c] $0 OR description CONTAINS[c] $0', defferedText)
				}
			}
		}, [realm, defferedText])


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
			<ItemsFlatList
				data={items}
				ListEmptyComponent={() => <ItemsFlatListEmptyComponent />}
				onItemClick={handleItemClick}
			/>
		</BottomFlatListOptionsBarWrapper>
	)
}

export default SearchScreen


function ItemsFlatListEmptyComponent() {
	const { t } = useTranslation()
	return (
		<View
			className='w-full h-full items-center pt-10 gap-8 justify-center '
		>
			<Text className='text-md'>
				{t('nothingFound')}
			</Text>
		</View>
	)
}