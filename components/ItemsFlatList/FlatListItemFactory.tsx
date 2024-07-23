import { View, Text } from 'react-native'
import React from 'react'
import { Item } from '~/lib/Realm/models/Item'
import FlatListRowItem from './FlatListRowItem'
import { useOrientationContext } from '~/app/(screens)/HomeScreen/(components)/OrientationContext'
import FlatListGridItem from './FlatListGridItem'
import FlatListItemSelectWrapper from './FlatListItemSelectWrapper'
import { useGlobalSearchParams } from 'expo-router'

const FlatListItemFactory = ({ item }: { item: Item, withOptionsMenu: boolean }) => {

	const { addIntent } = useGlobalSearchParams()

	if (addIntent === 'true') {
		return <OrientationDepItem item={item} />
	} else {
		if (item.type == 'empty') {
			return <OrientationDepItem item={item} />
		}
		else {
			return (
				<FlatListItemSelectWrapper item={item}>
					<OrientationDepItem item={item} />
				</FlatListItemSelectWrapper>
			)
		}
	}


}

export default React.memo(FlatListItemFactory)



const OrientationDepItem = ({ item }: { item: Item }) => {
	const { orientationMode } = useOrientationContext()
	if (orientationMode === 'row') {
		return <FlatListRowItem item={item} />
	}
	if (orientationMode === 'grid') {
		return <FlatListGridItem item={item} />
	}

}