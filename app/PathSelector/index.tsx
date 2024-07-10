import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopContent from '@/components/TopContent'

const PathSelector = () => {
	return (
		<SafeAreaView>
			<TopContent className='min-h-[7vh]' />
			<TouchableOpacity
				onPress={() => router.push('/HomeScreen')}>
				<Text>PathSelector</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default PathSelector