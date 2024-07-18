import { View } from 'react-native'
import React from 'react'
import { Text } from '~/components/ui/text'
import { useLocalSearchParams } from 'expo-router'

const AddLinkScreen = () => {
	const { parentId } = useLocalSearchParams()
	console.log(parentId)
	return (
		<View>
			<Text>AddLinkScreen</Text>
		</View>
	)
}

export default AddLinkScreen