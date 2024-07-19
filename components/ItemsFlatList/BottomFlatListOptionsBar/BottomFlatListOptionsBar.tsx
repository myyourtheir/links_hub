import { View } from 'react-native'
import React, { cloneElement, ReactElement, ReactNode } from 'react'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import RemoveOptionButton from './BottomFlatListOptionsButtons/Remove'
import MoveOptionButton from './BottomFlatListOptionsButtons/Move'
import CopyOptionButton from './BottomFlatListOptionsButtons/Copy'
import ShareOptionButton from './BottomFlatListOptionsButtons/Share'
import RenameOptionButton from './BottomFlatListOptionsButtons/Rename'




const BottomFlatListOptionsBar = () => {
	const { t } = useGlobalContext()
	return (
		<View className=' w-full h-full flex-row content-stretch shrink justify-around items-center'>
			<MoveOptionButton />
			<CopyOptionButton />
			<ShareOptionButton />
			<RemoveOptionButton />
			<RenameOptionButton />
		</View>
	)
}


export default BottomFlatListOptionsBar
