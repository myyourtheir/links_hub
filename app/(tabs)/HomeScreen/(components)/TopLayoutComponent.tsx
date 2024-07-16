import { View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Grid2X2, Rows2, Search } from 'lucide-react-native'
import CustomButton from '@/components/CustomButton'
import TopContent from '@/components/TopContent'
import ScrollPathArea from './ScrollPathArea'
import { useOrientationContext } from './OrientationContext'
import StyledIcon from '@/components/StyledIcon'
import { setAppData } from '@/lib/AsyncStorage'

type TopLayoutComponentProps = {

	className?: string,
	parentId: string
}

const TopLayoutComponent: FC<TopLayoutComponentProps> = ({ className, parentId }) => {
	// const { currentFolder: currentParent } = useGlobalContext()
	const { orientationMode, setOrientationMode } = useOrientationContext()
	useEffect(() => {
		setAppData('orientationMode', orientationMode)
	}, [orientationMode])
	return (
		<TopContent >
			<View className='flex-row items-end h-1/2 max-w-[60%] overflow-x-auto whitespace-nowrap'>
				<ScrollPathArea parentId={parentId} />
			</View>
			<View className=' flex-row w-fit gap-x-8 items-end justify-center'>
				<CustomButton handlePress={() => { return }}>
					<StyledIcon>
						<Search size={30} strokeWidth={1.25} />
					</StyledIcon>
				</CustomButton>
				<View>
					<CustomButton handlePress={() => {
						setOrientationMode((prev) => prev === 'grid' ? 'row' : 'grid')
					}}>
						<StyledIcon>
							{
								orientationMode === 'row' ? (
									<Rows2 size={30} strokeWidth={1.25} />
								) : (
									<Grid2X2 size={30} strokeWidth={1.25} />
								)
							}
						</StyledIcon>
					</CustomButton>
				</View>

			</View>
		</TopContent>
	)
}

export default TopLayoutComponent