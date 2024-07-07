import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { UseFormGetValues } from 'react-hook-form'

export type PathSelectorTriggerProps = {
	ContainerClassName?: string,
	getValues: UseFormGetValues<any>
}

const PathSelectorTrigger = ({ ContainerClassName, getValues }: PathSelectorTriggerProps) => {
	const { setCurrentAddingData } = useGlobalContext()
	const handlePress = () => {
		setCurrentAddingData(getValues())
		router.push('/PathSelector')
	}
	return (
		<View className={ContainerClassName}>
			<Text className='text-base'>
				Путь:
			</Text>
			<TouchableOpacity
				className={`border rounded-md w-2/3 px-2 py-1 h-8`}
				onPress={handlePress}
			>
				<Text>
					path
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default PathSelectorTrigger