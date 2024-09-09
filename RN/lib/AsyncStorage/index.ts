import AsyncStorage from '@react-native-async-storage/async-storage'

type AppDataKeys = {
	theme: 'light' | 'dark',
	language: 'en' | 'ru'
	orientationMode: 'grid' | 'row',
	parseIcons: 'true' | 'false'
}


export const setAppData = async <T extends keyof AppDataKeys>(key: T, value: AppDataKeys[T]) => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (e) {
		console.log(`while trying to setAppData(${[key, key]}) following error occured`)
		console.log(e)
	}
}

export const getAppData = async (key: keyof AppDataKeys) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			return value
		}
	} catch (e) {
		console.log(`while trying to getAppData(${key}) following error occured`)
		console.log(e)
	}
}
export const getShowTutorial = async () => {
	try {
		const value = await AsyncStorage.getItem('showTutorial')
		if (value !== null) {
			return Boolean(value)
		}
	} catch (e) {
		console.log(`while trying to getAppData(${'showTutorial'}) following error occured`)
		console.log(e)
	}
}


export const setShowTutorial = async (value: boolean) => {
	try {
		const valueToSet = value ? '1' : ''
		await AsyncStorage.setItem('showTutorial', valueToSet)
	} catch (e) {
		console.log(`while trying to setAppData(${['showTutorial', 'showTutorial']}) following error occured`)
		console.log(e)
	}
}