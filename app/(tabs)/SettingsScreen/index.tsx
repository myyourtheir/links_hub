import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import i18next from 'i18next'
import { langResources } from '@/i18n'
import TopContent from '@/components/TopContent'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'nativewind'
import StyledText from '@/components/StyledText'

const langData = [
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
	}
	const { colorScheme, toggleColorScheme } = useColorScheme()
	return (
		<>

			<TopContent>
				<StyledText additionClassName='text-xl'>
					{t('settings')}
				</StyledText>
			</TopContent>
			<View className='px-4 mt-3 gap-3'>
				<View className='gap-3 w-full'>
					<StyledText additionClassName='text-lg w-fit'>
						{t('language') + ":"}
					</StyledText>
					<Dropdown
						style={{
							borderWidth: 1,
							borderRadius: 6,
							width: 140
						}}
						data={langData}
						labelField={'title'}
						valueField={'value'}
						onChange={(el) => onChange(el)}
						value={i18next.language}
						containerStyle={{
							borderRadius: 6,
						}}
						selectedTextStyle={{
							paddingHorizontal: 8,
							paddingVertical: 4,
							fontSize: 16,
							lineHeight: 24
						}}
					/>
				</View>
				<View className=' flex-row gap-3 w-full'>
					<StyledText additionClassName='text-lg w-fit'>
						{t('darkmode') + ":"}
					</StyledText>
					<Switch value={colorScheme == 'dark'} onChange={toggleColorScheme} />
				</View>

			</View>
		</>

	)
}

export default SettingsScreen