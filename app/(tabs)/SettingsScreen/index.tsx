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
	const { t } = useTranslation()
	const onChange = (lang: LangDataType) => {
		i18next.changeLanguage(lang.value)
		setAppData('language', lang.value)
	}
	const { toggleColorScheme, isDarkColorScheme } = useColorScheme()
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
							defaultValue={langData.find(lang => getAppData('language').then(data => data == lang.value))}
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
							className='text-lg'>
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
			</List>
		</View>
	)
}

export default SettingsScreen