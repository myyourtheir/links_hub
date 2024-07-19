import { ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import BottomFlatListOptionsBar from './BottomFlatListOptionsBar'

type BottomFlatListOptionsBarWrapperProps = {
	children: ReactNode
}

const BottomFlatListOptionsBarWrapper = ({ children }: BottomFlatListOptionsBarWrapperProps) => {
	const { globalState: { mode } } = useGlobalContext()
	return (
		<View className=' h-full w-full bg-transparent'>
			{children}
			{
				mode === 'select' &&
				<Animated.View entering={FadeInDown.duration(100)} exiting={FadeOutDown.duration(100)}>
					<View className='w-full h-16  '>
						<BottomFlatListOptionsBar />
					</View>
				</Animated.View>
			}

		</View>
	)
}

export default BottomFlatListOptionsBarWrapper