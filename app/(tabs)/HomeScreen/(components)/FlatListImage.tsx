import { View, Text, Image, ImageStyle, StyleProp } from 'react-native'
import React, { FC } from 'react'
import { FlatListItemProps } from './types'
import images from '@/constants/images'

type FlatListImageProps = {
	item: FlatListItemProps['item'],
	style: StyleProp<ImageStyle>
}

const FlatListImage: FC<FlatListImageProps> = ({ item, style }) => {

	const getSource = () => {
		if (!item.image) {
			if (item.type === 'folder') return images.folder
			if (item.type === 'link') return images.link
		} else {
			return item.image
		}
	}

	return (
		<Image source={getSource()} resizeMode='contain' style={style} />
	)
}

export default FlatListImage