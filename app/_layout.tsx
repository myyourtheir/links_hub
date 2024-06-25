import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const GlobalLayout = () => {
	return (
		<>
			<StatusBar
				barStyle={'dark-content'}
				translucent={true}
			/>
			<Slot />
		</>
	)
}

export default GlobalLayout