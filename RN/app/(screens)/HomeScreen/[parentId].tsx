import { useAnimatedValue, View } from 'react-native'
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
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import BottomRoundButtonWrapper from '~/components/BottomRoundButtonWrapper'
import { PlusIcon } from 'lucide-react-native'
import StyledIcon from '~/components/StyledIcon'
import AddItemWrapper from '~/components/AddItemWrapper'
import useHandleItemClick from '~/hooks/usehandleItemClick'
import { Animated } from 'react-native'


const animationRange = 72

const { useQuery, useRealm } = RealmContext

const HomeScreen = () => {
	useRedirectWhenShareIntent()
	const scrollY = useAnimatedValue(0)
	const diffClamp = Animated.diffClamp(scrollY, 0, animationRange)
	const translateY = diffClamp.interpolate({
		inputRange: [0, animationRange],
		outputRange: [0, animationRange * 2],

	})

	const { parentId } = useLocalSearchParams()
	const { globalDispatch, globalState: { mode } } = useGlobalContext()
	const realm = useRealm()

	const items = useQuery(
		{
			type: Item,
			query: items => {
				return items
					.filtered(`parentId=${parentId !== 'null' ? 'oid(' + parentId + ')' : null}`)
					.sorted(['type', 'title'])
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

	const { handleItemClick } = useHandleItemClick()

	return (
		<AddItemWrapper parentId={parentId as string} translateY={translateY}>
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
					onScroll={(e) => {
						const yOffset = e.nativeEvent.contentOffset.y

						if (yOffset <= 0) {
							scrollY.setValue(0)
						} else {
							scrollY.setValue(yOffset)
						}
					}}

					data={items}
					ListEmptyComponent={() => <ItemsFlatListEmptyComponent parentId={parentId} />}
					onItemClick={handleItemClick}
				/>
			</BottomFlatListOptionsBarWrapper>
		</AddItemWrapper>
	)
}

export default HomeScreen


function ItemsFlatListEmptyComponent({ parentId }: { parentId?: string | string[] }) {
	const { t } = useTranslation()
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