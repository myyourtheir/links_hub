import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'


const Main = () => {

	return <Redirect href={{ pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } }} />
}

export default Main

// import { Text } from 'react-native'
// import { useRouter, useFocusEffect } from 'expo-router'

// function App() {
// 	const router = useRouter()

// 	useFocusEffect(() => {
// 		// Call the replace method to redirect to a new route without adding to the history.
// 		// We do this in a useFocusEffect to ensure the redirect happens every time the screen
// 		// is focused.
// 		router.replace('/HomeScreen')
// 	})

// 	return <Text>My Screen</Text>
// }

// export default App