import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'
import GlobalContextProvider from '~/lib/store/GlobalContextProvider'

const ScreensLayout = () => {
	return (
		<GlobalContextProvider>
			<SafeAreaView className={`bg-background `}>
				<Slot />
			</SafeAreaView>
		</GlobalContextProvider>
	)
}

export default ScreensLayout