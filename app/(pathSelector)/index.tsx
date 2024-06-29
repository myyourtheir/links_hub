import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const PathSelector = () => {
	return (
		<View>
			<Text>PathSelector</Text>
			<TouchableOpacity
				onPress={() => router.push('/HomeScreen')}>

			</TouchableOpacity>
		</View>
	)
}

export default PathSelector