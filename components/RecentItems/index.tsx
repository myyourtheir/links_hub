import { ScrollView, View } from 'react-native'
import React from 'react'
import { Text } from '../ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { ItemsFlatListContext } from '../ItemsFlatList/ItemsFlatListContext'
import RecentItem from './RecentItem'
import { router } from 'expo-router'
import useHandleItemClick from '~/utils/handleItemClick'
import { useTranslation } from 'react-i18next'
const { useQuery, useRealm } = RealmContext


const RecentItems = () => {
	const { t } = useTranslation()
	const realm = useRealm()
	const items = useQuery({
		type: Item,
		query: items => {
			return items
				.sorted('updatedTime', true)
		}
	}, [realm]).slice(0, 10)
	const { handleItemClick } = useHandleItemClick()
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