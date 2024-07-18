import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'
import TopContent from '~/components/TopContent'
import StyledText from '~/components/StyledText'
import { t } from 'i18next'


const SettingsLayout = () => {
	return (
		<View className='  h-full'>
			<TopContent>
				<StyledText additionClassName='text-xl'>
					{t('settings')}
				</StyledText>
			</TopContent>
			<Slot />
		</View>
	)
}

export default SettingsLayout