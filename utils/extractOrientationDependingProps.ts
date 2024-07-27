import { Item } from '~/lib/Realm/models/Item'
import { FlatListProps, ListRenderItemInfo } from 'react-native'


export const extractOrientationDependingProps = ({ orientationMode }: { orientationMode: 'grid' | 'row' | undefined }): Partial<FlatListProps<Item>> & { key: string } => {

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