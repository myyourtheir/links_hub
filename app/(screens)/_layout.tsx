import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const ScreensLayout = () => {
	return (
		<SafeAreaView className={`bg-background `}>
			<Slot />
		</SafeAreaView>
	)
}

export default ScreensLayout