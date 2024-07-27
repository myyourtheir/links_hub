import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { router } from 'expo-router'
import { useCascadeDelete } from '~/hooks/useCascadeDelete'
import { useTranslation } from 'react-i18next'
const { useRealm } = RealmContext

const RemoveOptionButton = () => {
	const { globalState: { selected }, globalDispatch } = useGlobalContext()
	const { t } = useTranslation()
	const realm = useRealm()
	const { deleteItemWithCascade } = useCascadeDelete()
	const handlePress = () => {
		globalDispatch({ type: 'setMode', value: 'view' })
		globalDispatch({ type: 'resetSelected' })
		for (const item of selected) {
			deleteItemWithCascade(item._id)
		}
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<Trash2 />} title={t('remove')} />
	)
}

export default RemoveOptionButton