import React from 'react'
import { Redirect, router } from 'expo-router'
import 'react-native-get-random-values'

const Main = () => {

	return <Redirect href={{ pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } }} />
}

export default Main