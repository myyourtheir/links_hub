import { GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { FolderInput, Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { useTranslation } from 'react-i18next'


const MoveOptionButton = () => {
	const { globalDispatch } = useGlobalContext()
	const { t } = useTranslation()
	const handlePress = (e: GestureResponderEvent) => {
		globalDispatch({ type: 'setMode', value: 'move' })
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<FolderInput />} title={t('move')} />
	)
}

export default MoveOptionButton