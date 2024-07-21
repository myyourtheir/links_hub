import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { FolderInput, Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext

const MoveOptionButton = () => {
	const { t, globalState: { selected }, globalDispatch } = useGlobalContext()
	const realm = useRealm()
	const handlePress = (e: GestureResponderEvent) => {
		globalDispatch({ type: 'setMode', value: 'move' })
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<FolderInput />} title={t('move')} />
	)
}

export default MoveOptionButton