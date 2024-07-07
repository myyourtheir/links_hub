import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'

const Main = () => {
	return <Redirect href={'/HomeScreen'} />
}

export default Main