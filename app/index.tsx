import '../i18n'
import React, { useEffect } from 'react'
import { Redirect, router, useRouter } from 'expo-router'
import useInitialSetup from '~/hooks/useInitialSetup'
import { useColorScheme, View } from 'react-native'
import { useShareIntentContext } from 'expo-share-intent'


export default function App() {
	const router = useRouter()

	const { hasShareIntent } = useShareIntentContext()

	useEffect(() => {
		if (hasShareIntent) {
			// we want to handle share intent event in a specific page
			router.replace({
				pathname: "AddingIntentScreen",
			})
		}
	}, [hasShareIntent])
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
