import { View, Text, ImageStyle, StyleProp, Image } from 'react-native'
import React, { FC } from 'react'
import images from '~/constants/images'
import { Item } from '~/lib/Realm/models/Item'
import { useColorScheme } from '~/lib/useColorScheme'
import { useParseIconsContext } from '~/hooks/useParseIconsContext'
import { SvgUri } from 'react-native-svg'

type FlatListImageProps = {
	item: Item,
	style?: StyleProp<ImageStyle>,
	className?: string
}

const FlatListImage: FC<FlatListImageProps> = ({ item, style, className }) => {
	const { isDarkColorScheme } = useColorScheme()
	const { parseIcons } = useParseIconsContext()
	const getDefaultSource = () => {

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
	}

	return (
		<>
			{item.image && parseIcons ?
				item.image.endsWith('.svg') ?
					<View className={`${className} `} style={style}>
						<SvgUri
							width="100%"
							height='100%'
							uri={item.image}

						/>
					</View>
					:
					<Image
						defaultSource={getDefaultSource()}
						className={`${className}`}
						source={{ uri: item.image }}
						resizeMode='contain'
						style={style}
					/>
				:
				<Image className={`${className}`} source={getDefaultSource()} resizeMode='contain' style={style} />}
		</>

	)
}

export default FlatListImage