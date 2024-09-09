import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const TutorialLayout = () => {
	return (
		<View className='bg-background h-full'>
			<Slot />
		</View>
	)
}

export default TutorialLayout

