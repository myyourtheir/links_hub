import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import Video, { VideoRef } from 'react-native-video'
import videos from '~/constants/videos'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'


const TutorialScreen = () => {
	const videoRef = useRef<VideoRef>(null)
	const { t } = useTranslation()
	const goBack = () => {
		router.canGoBack()
			? router.back()
			: router.replace({ pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } })
	}

	return (
		<View className=' justify-center items-center h-full gap-8' style={{ marginHorizontal: "5%" }}>

			<View
				className='h-4/6 w-full'
			>

				<Video
					ref={videoRef}
					paused={false}
					repeat={true}
					source={{ uri: videos.how_to_add_link_video }}
					muted
					// onError={e => console.log('error')}

					style={styles.backgroundVideo}
				/>
			</View>
			<Text className='text-2xl text-center'>
				{t("tutorialText")}
			</Text>

			<Button className='w-3/4'
				onPress={goBack}
			>
				<Text >
					{t('gotIt')}
				</Text>
			</Button>
		</View>
	)
}

export default TutorialScreen


var styles = StyleSheet.create({
	backgroundVideo: {
		height: '100%',
		width: '100%'
	},
})