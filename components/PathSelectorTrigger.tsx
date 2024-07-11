import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormSchema } from '@/app/(tabs)/AddingScreen'
import useGetCurrentPath from '@/utils/useGetCurrentPath'
import { BSON } from 'realm'

export type PathSelectorTriggerProps = {
	ContainerClassName?: string,
	value: BSON.ObjectId | null,
	getValues: UseFormGetValues<FormSchema>,
	setValue: UseFormSetValue<FormSchema>

}

const PathSelectorTrigger = ({ ContainerClassName, getValues, value, setValue }: PathSelectorTriggerProps) => {
	const { setCurrentAddingData } = useGlobalContext()
	const handlePress = () => {
		setCurrentAddingData(getValues())
		router.push({ pathname: '/PathSelector/[parentId]', params: { parentId: 'null' } })
	}
	const [currentPath] = useGetCurrentPath({ currentParent: value })
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