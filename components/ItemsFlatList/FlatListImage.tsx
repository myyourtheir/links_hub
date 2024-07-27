import { View, Text, Image, ImageStyle, StyleProp } from 'react-native'
import React, { FC } from 'react'
import images from '~/constants/images'
import { Item } from '~/lib/Realm/models/Item'
import { useColorScheme } from '~/lib/useColorScheme'

type FlatListImageProps = {
	item: Item,
	style?: StyleProp<ImageStyle>,
	className?: string
}

const FlatListImage: FC<FlatListImageProps> = ({ item, style, className }) => {
	const { isDarkColorScheme } = useColorScheme()
	const getSource = () => {
		if (!item.image) {
			if (isDarkColorScheme) {
				if (item.type === 'folder') return images.folder
				if (item.type === 'link') return images.whiteLink
				if (item.type === 'media') return images.whiteFile
			} else {
				if (item.type === 'folder') return images.folder
				if (item.type === 'link') return images.link
				if (item.type === 'media') return images.file
			}
		} else {
			return item.image
		}
	}

	return (
		<Image className={`${className}`} source={getSource()} resizeMode='contain' style={style} />
	)
}

export default FlatListImage