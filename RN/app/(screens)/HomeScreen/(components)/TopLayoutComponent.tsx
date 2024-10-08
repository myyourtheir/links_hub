import { View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { EllipsisVertical, Grid2X2, Rows2, Search } from 'lucide-react-native'
import TopContent from '~/components/TopContent'
import ScrollPathArea from './ScrollPathArea'
import { useOrientationContext } from './OrientationContext'
import StyledIcon from '~/components/StyledIcon'
import { setAppData } from '~/lib/AsyncStorage'
import { router } from 'expo-router'
import SettingsPopover from './SettingsPopover'
import { Button } from '~/components/ui/button'
import ChevronLeft from '~/lib/icons/ChevronLeft'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { BSON } from 'realm'

type TopLayoutComponentProps = {

	className?: string,
	parentId: string
}

const TopLayoutComponent: FC<TopLayoutComponentProps> = ({ className, parentId }) => {
	// const { currentFolder: currentParent } = useGlobalContext()
	const { orientationMode, setOrientationMode } = useOrientationContext()
	const { globalState: { mode }, globalDispatch } = useGlobalContext()
	useEffect(() => {
		setAppData('orientationMode', orientationMode)
	}, [orientationMode])
	return (
		<TopContent className='flex-col justify-start items-center'>
			<View className='w-full flex-row justify-between'>
				{
					mode === 'view' && parentId !== 'null' ?
						<Button
							className=''
							variant={'ghost'}
							onPress={() => {
								if (router.canGoBack()) {
									router.back()
								}

							}}>
							<StyledIcon>
								<ChevronLeft />
							</StyledIcon>
						</Button>
						:
						<View />
				}
				<View className=' flex-row w-fit '>
					<Button
						variant={'ghost'}
						onPress={() => {
							router.push('/SearchScreen')
						}}
					>
						<StyledIcon>
							<Search />
						</StyledIcon>
					</Button>
					<Button
						variant={'ghost'}
						onPress={() => {
							setOrientationMode((prev) => prev === 'grid' ? 'row' : 'grid')
						}}>
						<StyledIcon>
							{
								orientationMode === 'row' ? (
									<Rows2 strokeWidth={1.25} />
								) : (
									<Grid2X2 strokeWidth={1.25} />
								)
							}
						</StyledIcon>
					</Button>
					<SettingsPopover parentId={parentId} />
				</View>
			</View>

			<View className=' w-full overflow-x-auto whitespace-nowrap mt-3 px-6'>
				<ScrollPathArea parentId={parentId} />
			</View>
		</TopContent >
	)
}

export default TopLayoutComponent