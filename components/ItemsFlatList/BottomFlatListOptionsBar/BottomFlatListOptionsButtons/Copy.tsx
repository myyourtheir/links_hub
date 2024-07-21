import { GestureResponderEvent } from 'react-native'
import React from 'react'
import * as Clipboard from 'expo-clipboard'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { Copy, Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'

const CopyOptionButton = () => {
	const { t, globalState: { selected }, globalDispatch } = useGlobalContext()
	const handlePress = (e: GestureResponderEvent) => {
		if (selected[0].url) {
			Clipboard.setStringAsync(selected[0].url)
				.then(value => {
					console.log('value copied', value)
				})
				.catch(error => {
					console.log('error occured while coping', error)
				})
				.finally(() => {
					globalDispatch({ type: 'resetSelected' })
					globalDispatch({ type: 'setMode', value: 'view' })
				}
				)

		}
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<Copy />} title={t('copy')} />
	)
}

export default CopyOptionButton