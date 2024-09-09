import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import Video, { VideoRef } from 'react-native-video'
import videos from '~/constants/videos'


const TutorialScreen = () => {
	const videoRef = useRef<VideoRef>(null)
	return (
		<View className=' justify-center items-center h-full gap-8'>
			<Text>
				This is tutorial
			</Text>
			<Video
				ref={videoRef}
				source={videos.how_to_add_link_video}
				// onError={e => console.log('error')}

				style={styles.backgroundVideo}
			/>

			<Button className='w-3/4'>
				<Text >
					Next
				</Text>
			</Button>
		</View>
	)
}

export default TutorialScreen


var styles = StyleSheet.create({
	backgroundVideo: {
		height: 300
	},
})