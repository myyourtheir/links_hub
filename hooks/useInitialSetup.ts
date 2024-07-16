import { useOrientationContext } from '@/app/(tabs)/HomeScreen/(components)/OrientationContext'
import { getAppData } from '@/lib/AsyncStorage'
import i18next from 'i18next'
import { useColorScheme } from 'nativewind'
import { ColorSchemeSystem } from 'nativewind/dist/style-sheet/color-scheme'

const useInitialSetup = () => {
	const { setColorScheme } = useColorScheme()
	const { setOrientationMode } = useOrientationContext()
	Promise.all([getAppData('language'), getAppData('theme'), getAppData('orientationMode')]).then((data => {
		if (data[0]) {
			i18next.changeLanguage(data[0])
		}
		if (data[1]) {
			setColorScheme(data[1] as ColorSchemeSystem)
		}
		if (data[2]) {
			setOrientationMode(data[2] as "grid" | "row")
		}
	}))


}










export default useInitialSetup