import { View, Text } from 'react-native'
import React from 'react'
import { Item } from '~/lib/Realm/models/Item'
import FlatListRowItem from './FlatListRowItem'
import { useOrientationContext } from '~/app/(screens)/HomeScreen/(components)/OrientationContext'
import FlatListGridItem from './FlatListGridItem'
import FlatListItemSelectWrapper from './FlatListItemSelectWrapper'

const FlatListItemFactory = ({ item }: { item: Item, withOptionsMenu: boolean }) => {
	const { orientationMode } = useOrientationContext()
	return (
		<>

			{
				item.type == 'empty'
					? (
						orientationMode === 'row' ?
							<FlatListRowItem item={item} />
							:
							<FlatListGridItem item={item} />
					) : (

						<FlatListItemSelectWrapper item={item}>
							{
								orientationMode === 'row' ?
									<FlatListRowItem item={item} />
									:
									<FlatListGridItem item={item} />
							}
						</FlatListItemSelectWrapper>
					)


			}
		</>

	)

}

export default React.memo(FlatListItemFactory)