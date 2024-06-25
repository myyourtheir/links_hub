import { FlatListProps, ListRenderItemInfo } from 'react-native'
import { FlatListItemProps } from '../(components)/types'
import FlatListGridItem from '../(components)/FlatListGridItem'
import FlatListRowItem from '../(components)/FlatListRowItem'

export const extractOrientationDependingProps = ({ orientationMode }: { orientationMode: 'grid' | 'row' }): Partial<FlatListProps<FlatListItemProps['item']>> & { key: string } => {

	if (orientationMode === 'grid') {

		return {
			key: 'gridFlatList',
			numColumns: 2,
			columnWrapperStyle: {
				justifyContent: 'space-between',
			},
			renderItem: FlatListGridItem

		}
	} else {
		return {
			key: 'rowFlatList',
			numColumns: 1,
			renderItem: FlatListRowItem
		}
	}
}