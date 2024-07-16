import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopContent from '@/components/TopContent'
import ItemsFlatList from '@/components/ItemsFlatList/ItemsFlatList'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { Item } from '@/lib/Realm/models/Item'
import { BSON } from 'realm'
import { RealmContext } from '@/lib/Realm'
import BottomRoundButtonWrapper from '@/components/BottomRoundButtonWrapper'
import { Check } from 'lucide-react-native'
import { FormSchema } from '../(tabs)/AddingScreen'
import StyledText from '@/components/StyledText'

const { useQuery } = RealmContext
const PathSelector = () => {
	const { setCurrentFolder } = useGlobalContext()
	const { parentId } = useLocalSearchParams()
	let items = useQuery(Item, items => {
		return items
			.filtered(`parentId=${parentId != 'null' ? 'oid(' + parentId + ')' : null} AND type='folder'`)
			.sorted('updatedTime', false)
	}, [])
	if (items.length % 2 !== 0) {
		items = [...items.snapshot(), {
			_id: new BSON.ObjectID,
			type: 'empty',
		}] as any
	}
	const onItemClick = (item: Item) => {
		router.push({ pathname: '/PathSelector/[parentId]', params: { parentId: item._id.toString() } })
	}

	const handleSubmit = () => {
		setCurrentFolder(parentId != 'null' ? new BSON.ObjectId(parentId as string) : null)
		router.replace('/AddingScreen')
	}

	return (
		< >
			<BottomRoundButtonWrapper
				onPress={handleSubmit}
				buttonIcon={<Check color={'white'} size={30} />}
			>
				<TopContent additionClassName='min-h-[7vh]' />
				<ItemsFlatList
					data={items}
					onItemClick={onItemClick}
					ListEmptyComponent={EmptyComponent}
				/>
			</BottomRoundButtonWrapper>
		</>
	)
}

const EmptyComponent = () => {
	return (
		<View className='w-full items-center pt-5'>
			<StyledText>
				{'Дальше ничего нет('}
			</StyledText>
		</View>
	)
}

export default PathSelector