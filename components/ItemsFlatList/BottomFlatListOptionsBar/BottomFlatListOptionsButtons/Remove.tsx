import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { router } from 'expo-router'
const { useRealm } = RealmContext

const RemoveOptionButton = () => {
	const { t, globalState: { selected }, globalDispatch } = useGlobalContext()
	const realm = useRealm()
	const handlePress = () => {
		globalDispatch({ type: 'setMode', value: 'view' })
		globalDispatch({ type: 'resetSelected' })
		realm.write(() => {
			realm.delete(selected)
		})
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<Trash2 />} title={t('remove')} />
	)
}

export default RemoveOptionButton