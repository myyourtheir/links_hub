import { ImageSourcePropType } from 'react-native'

export type FlatListItemProps = {
	item: {
		id: number,
		title: string,
		image: ImageSourcePropType
	}
}