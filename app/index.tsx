import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Main = () => {
	return <Redirect href={'HomeScreen'} />
}

export default Main