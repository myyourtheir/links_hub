import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import FlatListImage from './FlatListImage'
import { Item } from '~/lib/Realm/models/Item'
import { useItemsFlatListContext } from './ItemsFlatListContext'
import { Text } from '../ui/text'
import { ItemComponentProps } from './types'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import Animated, { FadeIn } from 'react-native-reanimated'

const FlatListRowItem = ({ item }: ItemComponentProps) => {
	const { onItemClick, onItemLongPress } = useItemsFlatListContext()
	const { globalState: { mode } } = useGlobalContext()

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onItemClick(item)}
			onLongPress={() => onItemLongPress(item)}
		>

			<View
				className={`${mode === 'select' && 'ml-10'}  flex-row gap-x-2 items-center mb-3`}
			>
				<FlatListImage
					item={item}
					style={{
						width: 40,
						height: 40
					}}
				/>
				<Text
					style={{
						width: '80%',
						maxWidth: 400
					}}
					numberOfLines={1}
					className='font-normal text-ellipsis whitespace-nowrap overflow-hidden'
				>{item.title}</Text>
			</View>

		</TouchableOpacity>
	)
}

export default FlatListRowItem