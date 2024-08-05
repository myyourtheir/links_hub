import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '~/components/ui/text'
import { t } from 'i18next'
import Animated from 'react-native-reanimated'
import { List, ListItem, ListItemTitle, ListItemValue } from '~/components/ui/list'
import { Switch } from '~/components/ui/switch'
import { SvgUri } from 'react-native-svg'



type ImagePickerProps = {
	icons: string[],
	value: string,
	onChange: (value: string | null) => void
}


const ImagePicker = ({ icons, onChange }: ImagePickerProps) => {
	const [showIcon, setShowIcon] = useState(true)
	function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
		const index = Math.floor(event.nativeEvent.contentOffset.x / 192)
		onChange(icons[index])
	}
	return (
		<>
			<List>
				<ListItem>
					<ListItemTitle>
						<Text
							nativeID='showIcon'
							className=''>
							{t('showIcon')}
						</Text>
					</ListItemTitle>
					<ListItemValue >
						<Switch
							checked={showIcon}
							onCheckedChange={(value) => {
								setShowIcon(value)
								if (value === false) {
									onChange(null)
								} else {
									onChange(icons[0])
								}
							}}
							nativeID='showIcon'
						/>
					</ListItemValue>
				</ListItem>
			</List>
			{
				showIcon &&

				<View
					style={{
						alignSelf: 'center',
						width: 192,
					}}
				>
					<ScrollView
						scrollEventThrottle={5}
						pagingEnabled
						horizontal
						disableIntervalMomentum
						showsHorizontalScrollIndicator={false}
						onMomentumScrollEnd={handleOnScroll}
					>
						{icons && icons.map(icon => (
							icon.endsWith('.svg') ?
								<View key={icon} style={{ width: 160, height: 160, marginHorizontal: 16 }}>
									<SvgUri
										width="100%"
										height='100%'
										uri={icon}
									/>
								</View>
								:
								<Image
									resizeMode='contain'
									key={icon}
									style={{ width: 160, height: 160, marginHorizontal: 16 }}
									source={{ uri: icon }}
								/>
						))}
					</ScrollView>
					<Text className='self-center'>
						{t('scrollIt')}
					</Text>
				</View>
			}
		</>
	)
}

export default ImagePicker