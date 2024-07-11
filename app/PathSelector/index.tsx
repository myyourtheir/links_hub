import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopContent from '@/components/TopContent'
import ItemsFlatList from '@/components/ItemsFlatList/ItemsFlatList'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { Item } from '@/lib/Realm/models/Item'
import { BSON } from 'realm'
import { RealmContext } from '@/lib/Realm'
import BottomRoundButton from '@/components/ItemsFlatList/BottomRoundButton'
import { Check } from 'lucide-react-native'
import { FormSchema } from '../(tabs)/AddingScreen'

const { useQuery } = RealmContext
const PathSelector = () => {
	const { currentFolder, setCurrentFolder, setCurrentAddingData } = useGlobalContext()
	let items = useQuery(Item, items => {
		return items
			.filtered(`parentId=${currentFolder !== null ? 'oid(' + currentFolder + ')' : null} AND type='folder'`)
			.sorted('updatedTime', false)
	}, [currentFolder])
	if (items.length % 2 !== 0) {
		items = [...items.snapshot(), {
			_id: new BSON.ObjectID,
			type: 'empty',
		}] as any
	}
	const onItemClick = (item: Item) => {
		setCurrentFolder(item._id)
	}

	const handleSubmit = () => {
		setCurrentAddingData((prev) => ({ ...prev as FormSchema, parentId: currentFolder }))
		router.replace('/AddingScreen')
	}

	return (
		<SafeAreaView>
			<TopContent className='min-h-[7vh]' />
			<ItemsFlatList
				data={items}
				onItemClick={onItemClick}
				EmptyComponent={<EmptyComponent />}
			/>
			<BottomRoundButton onPress={handleSubmit}>
				<Check color={'white'} size={30} />
			</BottomRoundButton>
		</SafeAreaView>
	)
}

const EmptyComponent = () => {
	return (
		<View className='w-full items-center pt-5'>
			<Text>
				{'Дальше ничего нет('}
			</Text>
		</View>
	)
}

export default PathSelector