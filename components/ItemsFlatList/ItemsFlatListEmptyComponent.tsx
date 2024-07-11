import { router } from 'expo-router'
import { View } from 'lucide-react-native'
import { Text, TouchableOpacity } from 'react-native'

function ItemsFlatListEmptyComponent() {
	return (
		<View
			className='w-full items-center pt-3 gap-8 justify-center '
		>
			<Text className='text-md'>
				Здесь пока ничего нет
			</Text>
			<TouchableOpacity
				onPress={() => router.push('/AddingScreen')}
				className='border rounded-md px-3 py-2'
			>
				<Text className='text-lg'>
					Добавьте элемент
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ItemsFlatListEmptyComponent