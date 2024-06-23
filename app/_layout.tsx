import { Link, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Pressable } from 'react-native'

const App = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='home/index' options={{ headerShown: false }} />
			</Stack>
			<StatusBar style='auto' />
		</>
	)
}

export default App