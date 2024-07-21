import { View } from 'react-native'
import React from 'react'
import MoveOptionButton from './BottomFlatListOptionsButtons/Move'
import { Text } from '~/components/ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { Button } from '~/components/ui/button'
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext
const MoveBottomBar = () => {
	const { globalState: { selected, folderToSetIn }, t, globalDispatch } = useGlobalContext()
	const realm = useRealm()
	console.log(folderToSetIn)
	return (
		<View className='border-t-[0.5px] border-foreground w-full h-full flex-row content-stretch shrink justify-between  items-center p-4'>
			<Text className='text-center'>
				Элементов: {selected.length}
			</Text>
			<View className='flex-row gap-x-3'>
				<Button
					onPress={e => {
						globalDispatch({ type: 'setMode', value: 'view' })
						globalDispatch({ type: 'resetSelected' })
					}}
					size={'sm'}
				>
					<Text >
						{t('cancel')}
					</Text>
				</Button>
				<Button
					onPress={e => {
						if (folderToSetIn !== null) {
							if (!selected.map(item => item._id.toString()).includes(folderToSetIn.toString())) {
								realm.write(() => {
									for (const item of selected) {
										item.parentId = folderToSetIn
									}
								})
							} //TODO предупреждение, что нельзя переместить в папку, которая выбрана
						} else {
							realm.write(() => {
								for (const item of selected) {
									item.parentId = folderToSetIn
								}
							})
						}
						globalDispatch({ type: 'resetSelected' })
						globalDispatch({ type: 'setMode', value: 'view' })
					}}
					size={'sm'}>
					<Text>
						{t('moveHere')}
					</Text>
				</Button>
			</View>
		</View>
	)
}

export default MoveBottomBar