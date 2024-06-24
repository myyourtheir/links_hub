import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const HomeLayout = () => {
	return (
		<SafeAreaView className='px-4'>
			<Slot />
		</SafeAreaView>
	)
}

export default HomeLayout