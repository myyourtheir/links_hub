import { View, Text } from 'react-native'
import React from 'react'
import { Item } from '@/lib/Realm/models/Item'
import FlatListItemWrapper from './FlatListItemWrapper'
import FlatListRowItem from './FlatListRowItem'
import { useOrientationContext } from '@/app/(tabs)/HomeScreen/(components)/OrientationContext'
import FlatListGridItem from './FlatListGridItem'

const FlatListItemFactory = ({ item }: { item: Item }) => {
	const { orientationMode } = useOrientationContext()
	return (
		<>
			{
				item.type !== 'empty'
					? (
						<FlatListItemWrapper>
							{
								orientationMode === 'row' ?
									<FlatListRowItem item={item} />
									:
									<FlatListGridItem item={item} />
							}
						</FlatListItemWrapper>
					)
					:
					<>
						{
							orientationMode === 'row' ?
								<FlatListRowItem item={item} />
								:
								<FlatListGridItem item={item} />
						}
					</>
			}
		</>
	)

}

export default FlatListItemFactory