import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import i18next from 'i18next'
import { langResources } from '@/i18n'
import TopContent from '@/components/TopContent'
import { useTranslation } from 'react-i18next'

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
	return (
		<>

			<TopContent>
				<Text className='text-xl'>
					{t('settings')}
				</Text>
			</TopContent>
			<View className='px-4 mt-3'>
				<View className='gap-3 w-full'>
					<Text className='text-lg w-fit'>
						{t('language') + ":"}
					</Text>
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
				{/* <View className='gap-3 w-full'>
					<Text className='text-lg w-fit'>
						{t('language') + ":"}
					</Text>
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
				</View> */}

			</View>
		</>

	)
}

export default SettingsScreen