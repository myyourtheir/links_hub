import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormSchema } from '@/app/(tabs)/AddingScreen'
import useGetCurrentPath from '@/hooks/useGetCurrentPath'
import { BSON } from 'realm'
import StyledText from './StyledText'

export type PathSelectorTriggerProps = {
	ContainerClassName?: string,
	value: BSON.ObjectId | null,
	getValues: UseFormGetValues<FormSchema>,
	setValue: UseFormSetValue<FormSchema>

}

const PathSelectorTrigger = ({ ContainerClassName, getValues, value, setValue }: PathSelectorTriggerProps) => {
	const { setCurrentAddingData, t } = useGlobalContext()
	const handlePress = () => {
		setCurrentAddingData(getValues())
		router.push({ pathname: '/PathSelector/[parentId]', params: { parentId: 'null' } })
	}
	const { currentPathText } = useGetCurrentPath({ currentParent: value })
	return (
		<TouchableOpacity
			className={`border-b-[0.5px] rounded-md w-2/3 px-2 py-1 h-fit ${ContainerClassName}`}
			onPress={handlePress}
		>
			<StyledText additionClassName=''>
				{currentPathText}
			</StyledText>
		</TouchableOpacity>

	)
}

export default PathSelectorTrigger