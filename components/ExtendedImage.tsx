import { View, Image, ImageStyle } from 'react-native'
import React from 'react'
import { SvgUri } from 'react-native-svg'
import { StyleProp } from 'react-native'
import { ViewStyle } from 'react-native'
import images from '~/constants/images'
import { Text } from './ui/text'

type ExtendedImageProps = {
	icon: string,
	style: StyleProp<ImageStyle | ViewStyle>
}


const ExtendedImage = ({ icon, style }: ExtendedImageProps) => {
	const [uri, setUri] = React.useState<string>(icon)
	return (
		<>
			{
				/.svg/.test(icon) ?
					<View style={style}>
						<SvgUri
							onError={(e) => {
								console.log(e)
							}}
							width="100%"
							height='100%'
							uri={uri}
							fallback={<SVGFallback style={style} />}
						/>
					</View>
					:
					<Image
						resizeMode='contain'

						style={style as StyleProp<ImageStyle>}
						source={{ uri: icon }}
					/>
			}
		</>
	)
}

export default ExtendedImage

type SVGFallbackProps = {
	style: StyleProp<ImageStyle | ViewStyle>
}

const SVGFallback = ({ style }: SVGFallbackProps) => {
	return (
		// <Image
		// 	resizeMode='contain'
		// 	style={style as StyleProp<ImageStyle>}
		// 	source={images.link}
		// />
		<View className=' items-center justify-center w-full h-full' >
			<Text className='self-center'>
				Empty icon
			</Text>
		</View>
	)
}