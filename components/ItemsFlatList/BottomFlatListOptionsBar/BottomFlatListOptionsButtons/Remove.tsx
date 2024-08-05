import { View, GestureResponderEvent } from 'react-native'
import React from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { router } from 'expo-router'
import { useCascadeDelete } from '~/hooks/useCascadeDelete'
import { useTranslation } from 'react-i18next'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
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
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<BottomFlatListOptionsItem icon={<Trash2 />} title={t('remove')} />
			</AlertDialogTrigger>
			<AlertDialogContent className='w-[300px]'>
				<AlertDialogHeader>
					<AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>

				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						<Text>{t('cancel')}</Text>
					</AlertDialogCancel>
					<AlertDialogAction className='' onPress={handlePress}>
						<Text>{t('remove')}</Text>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default RemoveOptionButton