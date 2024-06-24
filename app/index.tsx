import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Main = () => {
	return (
		<SafeAreaView className='items-center justify-center h-full md:max-w-[400px] md:flex md:flex-row md:justify-center'>
			<Link href={'/HomeScreen'}>
				Home
			</Link>
			<StatusBar />
		</SafeAreaView>
	)
}

export default Main