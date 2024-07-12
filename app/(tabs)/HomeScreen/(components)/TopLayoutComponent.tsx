import { View, Text, ScrollView } from 'react-native'
import React, { FC, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Grid2X2, Rows2, Search } from 'lucide-react-native'
import CustomButton from '@/components/CustomButton'
import TopContent from '@/components/TopContent'
import useGetCurrentPath from '@/utils/useGetCurrentPath'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { BSON } from 'realm'
import ScrollPathArea from './ScrollPathArea'

type TopLayoutComponentProps = {
	orientationMode: "grid" | "row",
	setOrientationMode: React.Dispatch<React.SetStateAction<"grid" | "row">>,
	className?: string,
	parentId: string
}

const TopLayoutComponent: FC<TopLayoutComponentProps> = ({ orientationMode, setOrientationMode, className, parentId }) => {
	// const { currentFolder: currentParent } = useGlobalContext()

	return (
		<TopContent >
			<View className='flex-row items-end h-1/2 max-w-[60%] overflow-x-auto whitespace-nowrap'>
				<ScrollPathArea parentId={parentId} />
			</View>
			<View className=' flex-row w-fit gap-x-8 items-end justify-center'>
				<CustomButton handlePress={() => { return }}>
					<Search size={30} strokeWidth={1.25} color={'black'} />
				</CustomButton>
				<View>
					<CustomButton handlePress={() => { setOrientationMode((prev) => prev === 'grid' ? 'row' : 'grid') }}>
						{
							orientationMode === 'row' ? (
								<Rows2 size={30} strokeWidth={1.25} color={'black'} />
							) : (
								<Grid2X2 size={30} strokeWidth={1.25} color={'black'} />
							)
						}
					</CustomButton>
				</View>

			</View>
		</TopContent>
	)
}

export default TopLayoutComponent