import { View } from 'react-native'
import React, { useCallback } from 'react'
import { Item } from '~/lib/Realm/models/Item'
import detectMarketplace from '~/utils/detectMarketplace'
import { Image } from 'react-native'
import images from '~/constants/images'

export type ImageMarketPlaceWrapperProps = {
	children: React.ReactNode,
	item: Item,
}


const ImageMarketPlaceWrapper = ({ children, item }: ImageMarketPlaceWrapperProps) => {
	const getDefaultSource = useCallback(() => {
		if (item.url)
			switch (true) {
				case item.url.includes('wildberries.ru/catalog'):
					return images.wbLogo
				case item.url.includes('market.yandex.ru/product') || item.url.includes('market.yandex.ru/cc'):
					return images.yaMarketLogo
				case item.url.includes('ozon.ru/product') || item.url.includes('ozon.ru/t'):
					return images.ozonLogo
			}
		else return null
	}, [])
	return (
		<>
			{item.url && detectMarketplace(item.url as string)
				? <View className='relative'>
					{children}
					<View
						style={{
							position: 'absolute',
							left: 4,
							bottom: 4,
						}}>
						<Image
							source={getDefaultSource()}
							resizeMode='contain'
							style={{
								width: 30,
								height: 30
							}}
						/>
					</View>
				</View>
				: children
			}
		</>
	)
}

export default ImageMarketPlaceWrapper