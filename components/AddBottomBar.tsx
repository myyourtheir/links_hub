import { View } from 'react-native'
import React from 'react'
import { Text } from '~/components/ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { Button } from '~/components/ui/button'
import { RealmContext } from '~/lib/Realm'
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
const { useRealm } = RealmContext


const AddBottomBar = () => {
	const { globalDispatch } = useGlobalContext()
	const { t } = useTranslation()

	const handleAddPress = () => {
		globalDispatch({ type: 'setMode', value: 'view' })
		router.replace({ pathname: "/AddingIntentScreen" })
	}

	return (
		<View className='border-t-[0.5px] border-foreground w-full h-full flex-row content-stretch shrink justify-center  items-center p-4'>

			<Button
				onPress={handleAddPress}
				size={'sm'}>
				<Text>
					{t('addHere')
					}
				</Text>
			</Button>
		</View>
	)
}

export default AddBottomBar