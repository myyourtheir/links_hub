import { View } from 'react-native'
import React, { } from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { getAppData, setAppData } from '~/lib/AsyncStorage'
import { useColorScheme } from '~/lib/useColorScheme'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import { Option, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { List, ListItem, ListItemTitle, ListItemValue } from '~/components/ui/list'
import { Switch } from '~/components/ui/switch'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { useParseIconsContext } from '~/hooks/useParseIconsContext'


type LangDataType = {
	label: 'Русский' | 'English',
	value: 'en' | 'ru'
}

const langData: LangDataType[] = [
	{
		label: 'Русский',
		value: 'ru'
	},
	{
		label: 'English',
		value: 'en'
	}
]

const SettingsScreen = () => {
	const { t, i18n: { language } } = useTranslation()
	const onChange = (lang: LangDataType) => {
		i18next.changeLanguage(lang.value)
		setAppData('language', lang.value)
	}
	const { toggleColorScheme, isDarkColorScheme } = useColorScheme()
	const { setParseIcons, parseIcons } = useParseIconsContext()
	console.log(parseIcons)
	return (

		<View className='w-full px-4'>
			<List>
				<ListItem>
					<ListItemTitle>
						<Text
							className='text-xl'
						>
							{t('language')}
						</Text>
					</ListItemTitle>
					<ListItemValue>
						<Select

							onValueChange={onChange as (option: Option) => void}
							defaultValue={langData.find(lang => language == lang.value)}
						>
							<SelectTrigger style={{ width: 150 }}>
								<SelectValue
									className='text-foreground text-sm native:text-lg'
									placeholder='Select a fruit'
								/>
							</SelectTrigger>
							<SelectContent
								style={{ width: 150 }}
							>
								{langData.map(el =>
									<SelectItem key={el.value} label={el.label} value={el.value}>
										{el.label}
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</ListItemValue>
				</ListItem>
				<ListItem>
					<ListItemTitle>
						<Text
							nativeID='darkmode'
							className='text-xl'>
							{t('darkmode')}
						</Text>
					</ListItemTitle>
					<ListItemValue >
						<Switch
							checked={isDarkColorScheme}
							onCheckedChange={(value) => {
								toggleColorScheme()
								setAppData('theme', value === true ? 'dark' : 'light')
							}}
							nativeID='darkmode'
						/>
					</ListItemValue>
				</ListItem>
				<ListItem>
					<ListItemTitle>
						<Text
							nativeID='pareseIcons'
							className='text-xl'>
							{t('pasrseIcons')}
						</Text>
					</ListItemTitle>
					<ListItemValue >
						<Switch
							checked={parseIcons}
							onCheckedChange={(value) => {
								setParseIcons(value)
								setAppData('parseIcons', value === true ? 'true' : 'false')
							}}
							nativeID='pareseIcons'
						/>
					</ListItemValue>
				</ListItem>
			</List>
		</View>
	)
}

export default SettingsScreen