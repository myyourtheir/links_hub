import { ImageStyle, StyleProp, Image } from 'react-native'
import React, { FC, useCallback } from 'react'
import images from '~/constants/images'
import { Item } from '~/lib/Realm/models/Item'
import { useColorScheme } from '~/lib/useColorScheme'
import { useParseIconsContext } from '~/hooks/useParseIconsContext'
import ExtendedImage from '../ExtendedImage'
import ImageMarketPlaceWrapper from './ImageMarketPlaceWrapper'

type FlatListImageProps = {
	item: Item,
	style?: StyleProp<ImageStyle>,
	className?: string
}

const FlatListImage: FC<FlatListImageProps> = ({ item, style, className }) => {
	const { isDarkColorScheme } = useColorScheme()
	const { parseIcons } = useParseIconsContext()
	const getDefaultSource = useCallback(() => {

		if (isDarkColorScheme) {
			if (item.type === 'folder') return images.folder
			if (item.type === 'link') return images.whiteLink
			if (item.type === 'media') {
				switch (true) {
					case /.docx?$/.test(item.url as string): return images.docFile
					case /.xlsx?$/.test(item.url as string): return images.xlsFile
					case /pdf$/.test(item.url as string): return images.pdfFile
					default: return images.whiteFile
				}
			}
		} else {
			if (item.type === 'folder') return images.folder
			if (item.type === 'link') return images.link
			if (item.type === 'media') {
				switch (true) {
					case /.docx?$/.test(item.url as string): return images.docFile
					case /.xlsx?$/.test(item.url as string): return images.xlsFile
					case /pdf$/.test(item.url as string): return images.pdfFile

					default: return images.file
				}
			}
		}
	}, [])

	return (
		<ImageMarketPlaceWrapper item={item}>

			{item.image && parseIcons ?
				<ExtendedImage icon={item.image} style={style} />
				:
				<Image className={`${className}`} source={getDefaultSource()} resizeMode='contain' style={style} />}

		</ImageMarketPlaceWrapper>

	)
}

export default FlatListImage