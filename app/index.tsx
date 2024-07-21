import '../i18n'
import React from 'react'
import { Redirect, router } from 'expo-router'
import useInitialSetup from '~/hooks/useInitialSetup'
import { useColorScheme, View } from 'react-native'


export default function App() {
	const { appIsReady, onLayoutRootView } = useInitialSetup()
	if (!appIsReady) return null
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			onLayout={onLayoutRootView}
		>
			<Redirect href={{ pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } }} />
		</View>
	)
}
