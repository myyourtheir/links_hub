import { ScrollView, View } from 'react-native'
import React from 'react'
import { Text } from '../ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { ItemsFlatListContext } from '../ItemsFlatList/ItemsFlatListContext'
import RecentItem from './RecentItem'
import { router } from 'expo-router'
const { useQuery, useRealm } = RealmContext


const RecentItems = () => {
	const { t } = useGlobalContext()
	const realm = useRealm()
	const items = useQuery({
		type: Item,
		query: items => {
			return items
				.sorted('updatedTime', true)
		}
	}, [realm]).slice(0, 10)
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
		<View className=' h-1/6 px-4 py-2'>
			<View className=''>
				<Text
					className='text-xl'
				>
					{t('recent')}
				</Text>
			</View>
			<ScrollView
				contentContainerStyle={{
					gap: 32
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				<ItemsFlatListContext.Provider
					value={{
						onItemClick: handleItemClick,
						onItemLongPress: () => { return }
					}}
				>
					{
						items.map(item => <RecentItem key={item._id.toString()} item={item} />
						)
					}
				</ItemsFlatListContext.Provider>
			</ScrollView>
		</View>
	)
}

export default RecentItems