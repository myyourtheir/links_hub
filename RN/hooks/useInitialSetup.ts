import { useOrientationContext } from '~/app/(screens)/HomeScreen/(components)/OrientationContext'
import { getAppData } from '~/lib/AsyncStorage'
import i18next from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from '~/lib/useColorScheme'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { useParseIconsContext } from './useParseIconsContext'


const useInitialSetup = () => {
	const { setColorScheme } = useColorScheme()
	const { setOrientationMode } = useOrientationContext()
	const { setParseIcons } = useParseIconsContext()
	const [appIsReady, setAppIsReady] = useState(false)
	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync()
			try {
				await Promise.all([getAppData('language'), getAppData('theme'), getAppData('orientationMode'), getAppData('parseIcons')])
					.then((data => {
						if (data[0]) {
							i18next.changeLanguage(data[0])
						}
						if (data[1]) {
							setColorScheme(data[1] as "light" | "dark" | "system")
						}
						if (data[2]) {
							setOrientationMode(data[2] as "grid" | "row")
						}
						if (data[3]) {
							setParseIcons(data[3] === 'true')
						}
					}))
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}
		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])


	return { appIsReady, onLayoutRootView }
}










export default useInitialSetup