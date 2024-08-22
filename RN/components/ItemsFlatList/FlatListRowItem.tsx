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
				className={`${mode === 'select' && 'ml-10'}  flex-row  items-center w-fit `}
				style={{
					columnGap: 24,
					marginBottom: 32
				}}
			>
				<FlatListImage
					item={item}
					style={{
						width: 160,
						height: 160
					}}
				/>
				<View
					style={{
						justifyContent: 'space-between',
						height: 100
					}}
				>
					<Text
						style={{
							// width: '50%',
							maxWidth: 120,
							textAlignVertical: 'top',

						}}
						numberOfLines={2}
						className='font-normal text-ellipsis whitespace-nowrap overflow-hidden text-lg'
					>{item.title}</Text>
					<Text
						numberOfLines={1}
						className='font-normal text-ellipsis whitespace-nowrap overflow-hidden text-center mt-2 text-xl'
					>
						{item.price} {item.currency}
					</Text>
				</View>
			</View>

		</TouchableOpacity>
	)
}

export default FlatListRowItem