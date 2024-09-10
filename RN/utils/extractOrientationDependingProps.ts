import { Item } from '~/lib/Realm/models/Item'
import { Dimensions, FlatListProps, ListRenderItemInfo } from 'react-native'

const width = Dimensions.get('window').width
export const gridColumnsCount = Math.floor((0.9 * width) / 160)
export const extractOrientationDependingProps = ({ orientationMode }: { orientationMode: 'grid' | 'row' | undefined }): Partial<FlatListProps<Item>> & { key: string } => {

	switch (orientationMode) {

		case 'grid':
			return {
				key: 'gridFlatList',
				numColumns: gridColumnsCount,
				columnWrapperStyle: {
					columnGap: ((0.9 * width) % 160) / (gridColumnsCount - 1)
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
				numColumns: gridColumnsCount,
				columnWrapperStyle: {
					columnGap: ((0.9 * width) % 160) / (gridColumnsCount - 1)
				},
			}
	}
}