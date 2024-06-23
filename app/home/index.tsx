import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

const HomeScreen = () => {
	return (
		<View className='w-full h-full justify-center items-center'>
			<Text>
				This is home page
			</Text>
			<Link href="/" >
				go to base page
			</Link>
		</View>
	)
}

export default HomeScreen