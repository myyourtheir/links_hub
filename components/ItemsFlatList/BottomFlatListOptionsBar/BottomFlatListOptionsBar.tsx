import { View } from 'react-native'
import React, { cloneElement, ReactElement, ReactNode } from 'react'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import RemoveOptionButton from './BottomFlatListOptionsButtons/Remove'
import MoveOptionButton from './BottomFlatListOptionsButtons/Move'
import CopyOptionButton from './BottomFlatListOptionsButtons/Copy'
import ShareOptionButton from './BottomFlatListOptionsButtons/Share'
import RenameOptionButton from './BottomFlatListOptionsButtons/Rename'




const BottomFlatListOptionsBar = () => {
	const { t, globalState: { selected } } = useGlobalContext()
	const isOneItemSelected = selected?.length === 1
	return (
		<View className=' w-full h-full flex-row content-stretch shrink justify-around items-center'>
			<MoveOptionButton />
			{isOneItemSelected && selected[0].type === 'link' && <CopyOptionButton />}
			{isOneItemSelected && selected[0].type === 'link' && <ShareOptionButton />}
			<RemoveOptionButton />
			{isOneItemSelected && <RenameOptionButton />}
		</View>
	)
}


export default BottomFlatListOptionsBar
