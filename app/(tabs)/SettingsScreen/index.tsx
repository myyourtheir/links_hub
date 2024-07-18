import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import i18next from 'i18next'
import { langResources } from '~/i18n'
import TopContent from '~/components/TopContent'
import { useTranslation } from 'react-i18next'

import StyledText from '~/components/StyledText'
import StyledDropdown from '~/components/StryledDropdown'
import { FormItem } from '~/components/Form'
import { setAppData } from '~/lib/AsyncStorage'
import { useColorScheme } from '~/lib/useColorScheme'

type LangDataType = {
	title: 'Русский' | 'English',
	value: 'en' | 'ru'
}

const langData: LangDataType[] = [
	{
		title: 'Русский',
		value: 'ru'
	},
	{
		title: 'English',
		value: 'en'
	}
]

const SettingsScreen = () => {
	const { t } = useTranslation()
	const onChange = (lang: typeof langData[0]) => {
		i18next.changeLanguage(lang.value)
		setAppData('language', lang.value)
	}
	const { colorScheme, toggleColorScheme } = useColorScheme()
	return (

		<View className=''>
			<FormItem additionClassName=''>
				<StyledText additionClassName='mb-4'>
					{t('language') + ":"}
				</StyledText>
				<StyledDropdown
					style={{
						width: '40%',
					}}
					data={langData}
					labelField={'title'}
					valueField={'value'}
					onChange={(el) => onChange(el)}
					value={i18next.language}
				/>
			</FormItem>
			<FormItem className='flex-row items-center '>
				<StyledText additionClassName=''>
					{t('darkmode') + ":"}
				</StyledText>
				<Switch
					value={colorScheme == 'dark'}
					onValueChange={(value) => {
						toggleColorScheme()
						setAppData('theme', value == true ? 'dark' : 'light')
					}} />
			</FormItem>
		</View>
	)
}

export default SettingsScreen