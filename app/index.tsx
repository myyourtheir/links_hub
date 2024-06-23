import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

const BasePage = () => {
	return (
		<View className='h-full w-full justify-center items-center'>
			<Link href="home" >
				go to	home page
			</Link>
		</View >
	)
}

export default BasePage