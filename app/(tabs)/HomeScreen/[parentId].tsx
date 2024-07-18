import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import TopLayoutComponent from './(components)/TopLayoutComponent'
import ItemsFlatList from '~/components/ItemsFlatList/ItemsFlatList'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
import { BSON } from 'realm'
import { router, useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { Text } from '~/components/ui/text'



const { useQuery } = RealmContext

const HomeScreen = () => {
	const { parentId } = useLocalSearchParams()
	let items = useQuery(Item, items => {
		return items
			.filtered(`parentId=${parentId != 'null' ? 'oid(' + parentId + ')' : null}`)
			.sorted('updatedTime', false)
	}, [])

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
		<>
			<TopLayoutComponent
				parentId={parentId as string}
			/>
			<ItemsFlatList
				data={items as ArrayLike<Item>}
				ListEmptyComponent={() => <ItemsFlatListEmptyComponent parentId={parentId} />}
				onItemClick={handleItemClick}
			/>
		</>
	)
}

export default HomeScreen


function ItemsFlatListEmptyComponent({ parentId }: { parentId?: string | string[] }) {
	const { setCurrentFolder } = useGlobalContext()
	return (
		<View
			className='w-full h-full items-center pt-10 gap-8 justify-center '
		>
			<Text className='text-md'>
				Здесь пока ничего нет...
			</Text>
			<TouchableOpacity
				onPress={() => {
					setCurrentFolder(parentId != "null" ? new BSON.ObjectId(parentId as string) : null)
					router.push({
						pathname: '/AddingScreen',
						params: {
							defaultParentId: parentId
						}
					})

				}
				}
				className='border rounded-md px-3 py-2'
			>
				<Text className='text-lg'>
					Добавьте элемент
				</Text>
			</TouchableOpacity>
		</View>
	)
}