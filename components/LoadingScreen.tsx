import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useColorScheme } from '~/lib/useColorScheme'

const LoadingScreen = () => {
	const { isDarkColorScheme } = useColorScheme()
	return (
		<View className='bg-background flex-1 items-center justify-center'>
			<ActivityIndicator size='large' color={isDarkColorScheme ? 'white' : 'black'} />
		</View>
	)
}

export default LoadingScreen