import { View } from 'react-native'
import React from 'react'
import { router, Slot } from 'expo-router'
import TopContent from '~/components/TopContent'
import { Text } from '~/components/ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { Button } from '~/components/ui/button'
import StyledIcon from '~/components/StyledIcon'
import { ChevronLeft } from 'lucide-react-native'


const SettingsLayout = () => {
	const { t } = useGlobalContext()
	return (
		<View className='bg-background  h-full'>
			<TopContent>
				<View className='flex-row items-start'>
					<Button
						variant={'ghost'}
						onPress={() => {
							if (router.canGoBack()) {
								router.back()
							} else {

							}
						}}>
						<StyledIcon>
							<ChevronLeft />
						</StyledIcon>
					</Button>
					<Text className='self-center text-2xl'>
						{t('settings')}
					</Text>
				</View>
			</TopContent >
			<Slot />
		</View >
	)
}

export default SettingsLayout