import { GestureResponderEvent, Share } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { Share2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { useTranslation } from 'react-i18next'
const { useRealm } = RealmContext

const ShareOptionButton = () => {
	const { globalState: { selected }, globalDispatch } = useGlobalContext()
	const { t } = useTranslation()
	const realm = useRealm()
	const handlePress = (e: GestureResponderEvent) => {
		if (selected[0].url) {
			Share.share({
				message: selected[0].url,
				url: selected[0].url
			})
		}
		globalDispatch({ type: 'resetSelected' })
		globalDispatch({ type: 'setMode', value: 'view' })
	}
	return (
		<BottomFlatListOptionsItem onPress={handlePress} icon={<Share2 />} title={t('share')} />
	)
}

export default ShareOptionButton