import { View, Text, ScrollView } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Grid2X2, Rows2, Search } from 'lucide-react-native'
import CustomButton from '@/components/CustomButton'
import TopContent from '@/components/TopContent'

type TopLayoutComponentProps = {
	orientationMode: "grid" | "row",
	setOrientationMode: React.Dispatch<React.SetStateAction<"grid" | "row">>,
	className?: string
}

const TopLayoutComponent: FC<TopLayoutComponentProps> = ({ orientationMode, setOrientationMode, className }) => {
	return (
		<TopContent >

			<CustomButton handlePress={() => { return }}>
				<Text className='text-blue-500'>Current path</Text>
			</CustomButton>
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