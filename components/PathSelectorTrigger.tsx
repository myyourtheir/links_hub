import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormSchema } from '@/app/(tabs)/AddingScreen'
import useGetCurrentPath from '@/utils/useGetCurrentPath'

export type PathSelectorTriggerProps = {
	ContainerClassName?: string,
	value: FormSchema['parentId'],
	getValues: UseFormGetValues<FormSchema>,
	setValue: UseFormSetValue<FormSchema>

}

const PathSelectorTrigger = ({ ContainerClassName, getValues, value, setValue }: PathSelectorTriggerProps) => {
	const { setCurrentAddingData } = useGlobalContext()
	const handlePress = () => {
		setCurrentAddingData(getValues())
		router.push('/PathSelector')
	}
	const [currentPath] = useGetCurrentPath({ currentParent: getValues().parentId })
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
					{currentPath}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default PathSelectorTrigger