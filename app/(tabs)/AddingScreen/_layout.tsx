import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const AddingLayout = () => {
	return (
		<SafeAreaView className='bg-primary'>
			<Slot />
		</SafeAreaView>
	)
}

export default AddingLayout