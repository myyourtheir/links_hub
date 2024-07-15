import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from './constants/Translation/en.json'
import ru from './constants/Translation/ru.json'

export const langResources = {
	en: {
		translation: en
	},
	ru: {
		translation: ru
	}
}
i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		compatibilityJSON: 'v3',
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false // react already safes from xss
		},
		resources: langResources,
	})

export default i18n