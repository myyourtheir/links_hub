import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const AddingLayout = () => {
	return (
		<View className='bg-primary dark:bg-darkBg  h-full'>
			<Slot />
		</View>
	)
}

export default AddingLayout