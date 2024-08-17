import { View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const SearchLayout = () => {
	return (
		<View className='bg-background h-full'>
			<Slot />
		</View>
	)
}

export default SearchLayout