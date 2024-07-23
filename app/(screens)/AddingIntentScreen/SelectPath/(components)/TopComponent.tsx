import { View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { EllipsisVertical, Grid2X2, Rows2, Search } from 'lucide-react-native'
import TopContent from '~/components/TopContent'


import StyledIcon from '~/components/StyledIcon'
import { setAppData } from '~/lib/AsyncStorage'
import { router } from 'expo-router'

import { Button } from '~/components/ui/button'
import ChevronLeft from '~/lib/icons/ChevronLeft'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { BSON } from 'realm'
import { useOrientationContext } from '~/app/(screens)/HomeScreen/(components)/OrientationContext'
import ScrollPathArea from '~/app/(screens)/HomeScreen/(components)/ScrollPathArea'

type TopLayoutComponentProps = {

	className?: string,
	parentId: string
}

const TopComponent: FC<TopLayoutComponentProps> = ({ className, parentId }) => {
	// const { currentFolder: currentParent } = useGlobalContext()
	const { orientationMode, setOrientationMode } = useOrientationContext()
	const { globalState: { mode }, globalDispatch } = useGlobalContext()
	useEffect(() => {
		setAppData('orientationMode', orientationMode)
	}, [orientationMode])
	return (
		<TopContent className='flex-col justify-center items-start'>
			<View className=' w-full overflow-x-auto whitespace-nowrap  px-6'>
				<ScrollPathArea parentId={parentId} />
			</View>
		</TopContent >
	)
}

export default TopComponent