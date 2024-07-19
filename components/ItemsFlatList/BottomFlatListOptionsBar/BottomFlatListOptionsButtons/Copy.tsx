import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { Copy, Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext

const CopyOptionButton = () => {
	const { t, globalState: { selected } } = useGlobalContext()
	const realm = useRealm()
	const handlePress = (e: GestureResponderEvent) => {

	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<Copy />} title={t('copy')} />
	)
}

export default CopyOptionButton