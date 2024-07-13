import { View, Text, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import { EllipsisVertical } from 'lucide-react-native'

type FlatListItemWrapperProps = {
	children: ReactNode
}


const FlatListItemWrapper = ({ children }: FlatListItemWrapperProps) => {
	return (
		<View className='relative'>
			<View className='absolute right-1 top-2 z-10'>
				<Pressable
					onPress={() => console.log('3dots was pressed')}
				>
					<EllipsisVertical color={'black'} />
				</Pressable>
			</View>
			{children}
		</View>
	)
}

export default FlatListItemWrapper