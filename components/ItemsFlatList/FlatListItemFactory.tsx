import { View, Text } from 'react-native'
import React from 'react'
import { Item } from '~/lib/Realm/models/Item'
import FlatListItemWrapper from './FlatListItemWrapper'
import FlatListRowItem from './FlatListRowItem'
import { useOrientationContext } from '~/app/(screens)/HomeScreen/(components)/OrientationContext'
import FlatListGridItem from './FlatListGridItem'

const FlatListItemFactory = ({ item, withOptionsMenu }: { item: Item, withOptionsMenu: boolean }) => {
	const { orientationMode } = useOrientationContext()
	return (
		<>
			{
				orientationMode === 'row' ?
					<FlatListRowItem item={item} />
					:
					<FlatListGridItem item={item} />
			}
		</>

	)

}

export default FlatListItemFactory