import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router, useLocalSearchParams } from 'expo-router'
import { Text } from '~/components/ui/text'
import BottomFlatListOptionsBarWrapper from '~/components/ItemsFlatList/BottomFlatListOptionsBar/BottomFlatListOptionsBarWrapper'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import TopComponent from './(components)/TopComponent'




const { useQuery, useRealm } = RealmContext

const SelectPathScreen = () => {
	const { parentId } = useLocalSearchParams()
	const { globalDispatch } = useGlobalContext()
	const realm = useRealm()
	const items = useQuery(
		{
			type: Item,
			query: items => {
				return items
					.filtered(`
							parentId=${parentId !== 'null' ? 'oid(' + parentId + ')' : null}  
							AND 
							type=="folder"
						`)
					.sorted(['type', 'updatedTime'])
			}
		}, [realm])
	useEffect(() => {
		globalDispatch({
			type: 'setFolderToSetIn',
			value: parentId !== 'null' ? new BSON.ObjectId(parentId as string) : null
		})
	}, [])


	// if (!items.isValid()) return null
	const handleItemClick = (item: Item) => {
		router.push({
			pathname: '/AddingIntentScreen/SelectPath/[parentId]', params: {
				parentId: item._id.toString(),
				addIntent: 'true'
			}
		})
	}

	return (
		<BottomFlatListOptionsBarWrapper>
			<TopComponent
				parentId={parentId as string}
			/>
			<ItemsFlatList
				data={items}
				ListEmptyComponent={() => <ItemsFlatListEmptyComponent parentId={parentId} />}
				onItemClick={handleItemClick}
			/>
		</BottomFlatListOptionsBarWrapper>
	)
}

export default SelectPathScreen


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