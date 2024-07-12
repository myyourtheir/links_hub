import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'
import OrientationContextProvider from './(components)/OrientationContext'

const HomeLayout = () => {
	return (
		<SafeAreaView className='bg-top'>
			<OrientationContextProvider>
				<View className='bg-primary'>

					<Slot />
				</View>
			</OrientationContextProvider>
		</SafeAreaView>
	)
}

export default HomeLayout