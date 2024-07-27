import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { FolderInput, Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { useTranslation } from 'react-i18next'
const { useRealm } = RealmContext

const MoveOptionButton = () => {
	const { globalState: { selected }, globalDispatch } = useGlobalContext()
	const { t } = useTranslation()
	const realm = useRealm()
	const handlePress = (e: GestureResponderEvent) => {
		globalDispatch({ type: 'setMode', value: 'move' })
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<FolderInput />} title={t('move')} />
	)
}

export default MoveOptionButton