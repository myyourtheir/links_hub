import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { RealmContext } from '@/lib/Realm'

const { useRealm } = RealmContext

const Main = () => {
	const realm = useRealm()
	// Get on-disk location of the Realm
	console.log(`Realm file is located at: ${realm}`)

	return <Redirect href={'/HomeScreen'} />
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