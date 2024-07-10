import { View, Text, Image, ImageStyle, StyleProp } from 'react-native'
import React, { FC } from 'react'
import images from '@/constants/images'
import { Item } from '@/lib/Realm/models/Item'

type FlatListImageProps = {
	item: Item,
	style?: StyleProp<ImageStyle>,
	className?: string
}

const FlatListImage: FC<FlatListImageProps> = ({ item, style, className }) => {

	const getSource = () => {
		if (!item.image) {
			if (item.type === 'folder') return images.folder
			if (item.type === 'link') return images.link
			if (item.type === 'empty') return images.emptyItemImage
		} else {
			return item.image
		}
	}

	return (
		<Image className={`${className}`} source={getSource()} resizeMode='contain' style={style} />
	)
}

export default FlatListImage