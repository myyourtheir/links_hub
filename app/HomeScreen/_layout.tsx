import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const HomeLayout = () => {
	return (
		<View className='bg-background h-full'>
			<Slot />
		</View>
	)
}

export default HomeLayout