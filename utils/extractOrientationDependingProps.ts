import { FlatListProps, ListRenderItemInfo } from 'react-native'
import { FlatListItemProps } from '../(components)/types'
import FlatListGridItem from '../../../../components/ItemsFlatList/FlatListGridItem'
import FlatListRowItem from '../../../../components/ItemsFlatList/FlatListRowItem'

export const extractOrientationDependingProps = ({ orientationMode }: { orientationMode: 'grid' | 'row' | undefined }): Partial<FlatListProps<FlatListItemProps['item']>> & { key: string } => {

	switch (orientationMode) {

		case 'grid':
			return {
				key: 'gridFlatList',
				numColumns: 2,
				columnWrapperStyle: {
					justifyContent: 'space-between',
				},
			}

		// renderItem: FlatListGridItem
		case 'row':
			return {
				key: 'rowFlatList',
				numColumns: 1,
				// renderItem: FlatListRowItem
			}
		default:
			return {
				key: 'gridFlatList',
				numColumns: 2,
				columnWrapperStyle: {
					justifyContent: 'space-between',
				},
			}
	}
}