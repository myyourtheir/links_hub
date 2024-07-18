import 'react-native-get-random-values'

import React, { useEffect } from 'react'
import { Slot } from 'expo-router'
import { RealmContext } from '~/lib/Realm'
import GlobalContextProvider from '~/lib/store/GlobalContextProvider'
import OrientationContextProvider from './(tabs)/HomeScreen/(components)/OrientationContext'
import '~/global.css'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Theme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen } from 'expo-router'
import { Platform } from 'react-native'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { PortalHost } from '@rn-primitives/portal'
const LIGHT_THEME: Theme = {
	dark: false,
	colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
	dark: true,
	colors: NAV_THEME.dark,
}

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function Root() {
	const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)
	const { RealmProvider } = RealmContext
	React.useEffect(() => {
		(async () => {
			const theme = await AsyncStorage.getItem('theme')
			if (Platform.OS === 'web') {
				// Adds the background color to the html element to prevent white background on overscroll.
				document.documentElement.classList.add('bg-background')
			}
			if (!theme) {
				AsyncStorage.setItem('theme', colorScheme)
				setIsColorSchemeLoaded(true)
				return
			}
			const colorTheme = theme === 'dark' ? 'dark' : 'light'
			if (colorTheme !== colorScheme) {
				setColorScheme(colorTheme)

				setIsColorSchemeLoaded(true)
				return
			}
			setIsColorSchemeLoaded(true)
		})().finally(() => {
			SplashScreen.hideAsync()
		})
	}, [])

	if (!isColorSchemeLoaded) {
		return null
	}

	return (

		<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
			<RealmProvider>
				<GlobalContextProvider>
					<OrientationContextProvider>
						<SafeAreaView className={`bg-background`}>
							<StatusBar backgroundColor={isDarkColorScheme ? 'black' : 'white'} style={isDarkColorScheme ? 'light' : 'dark'} />
							<Slot />
						</SafeAreaView>
						<PortalHost />
					</OrientationContextProvider>
				</GlobalContextProvider>
			</RealmProvider>
		</ThemeProvider>

	)
}