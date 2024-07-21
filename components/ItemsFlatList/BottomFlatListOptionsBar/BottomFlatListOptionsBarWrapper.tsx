import { ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import BottomFlatListOptionsBar from './BottomFlatListOptionsBar'
import MoveBottomBar from './MoveBottomBar'

type BottomFlatListOptionsBarWrapperProps = {
	children: ReactNode
}

const BottomFlatListOptionsBarWrapper = ({ children }: BottomFlatListOptionsBarWrapperProps) => {
	const { globalState: { mode, selected } } = useGlobalContext()
	return (
		<View className=' h-full w-full bg-transparent'>
			{children}
			{
				mode === 'select' && selected.length !== 0 &&
				<Animated.View entering={FadeInDown.duration(100)} exiting={FadeOutDown.duration(100)}>
					<View className='w-full h-16  '>
						<BottomFlatListOptionsBar />
					</View>
				</Animated.View>
			}
			{mode === 'move' &&
				// <Animated.View entering={FadeInDown.duration(100)} exiting={FadeOutDown.duration(100)}>
				<View className='w-full h-16  '>
					<MoveBottomBar />
				</View>
				// </Animated.View>

			}

		</View>
	)
}

export default BottomFlatListOptionsBarWrapper