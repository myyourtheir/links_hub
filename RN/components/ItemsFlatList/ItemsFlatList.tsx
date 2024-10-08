import { View, Text, FlatList, TouchableOpacity, FlatListProps } from 'react-native'
import React, { FC, ReactElement, ReactNode } from 'react'
import FlatListGridItem from '~/components/ItemsFlatList/FlatListGridItem'
import FlatListRowItem from '~/components/ItemsFlatList/FlatListRowItem'
import { extractOrientationDependingProps } from '~/utils/extractOrientationDependingProps'
import { Item } from '~/lib/Realm/models/Item'
import { ItemsFlatListContext } from './ItemsFlatListContext'
import FlatListItemWrapper from './FlatListItemSelectWrapper'
import FlatListItemFactory from './FlatListItemFactory'
import { useOrientationContext } from '~/app/(screens)/HomeScreen/(components)/OrientationContext'



type ItemsFlatListProps = {
	data: ArrayLike<Item> | null | undefined
	onItemClick: (item: Item) => void,
	withOptionsMenu?: boolean
} & Partial<FlatListProps<Item>>

const ItemsFlatList: FC<ItemsFlatListProps> = ({ data, onItemClick, withOptionsMenu = true, ...props }) => {
	const { orientationMode } = useOrientationContext()
	return (
		<ItemsFlatListContext.Provider value={{
			onItemClick,
			onItemLongPress: () => { return }
		}}>
			<FlatList
				className='mt-6'
				contentContainerStyle={{
					marginHorizontal: '5%',
				}}
				horizontal={false}
				data={data}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <FlatListItemFactory item={item} withOptionsMenu />}
				{...extractOrientationDependingProps({ orientationMode })}
				{...props}
			/>
		</ItemsFlatListContext.Provider>
	)
}

export default ItemsFlatList





