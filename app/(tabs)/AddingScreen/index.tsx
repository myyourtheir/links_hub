import { View, Text, TextInput, TouchableOpacity, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
// import { Dropdown } from 'react-native-element-dropdown'
import TopContent from '@/components/TopContent'
import StyledTextInput from '@/components/StyledTextInput'
import BottomRoundButton from '@/components/ItemsFlatList/BottomRoundButton'
import { Plus } from 'lucide-react-native'
import {
	useForm,
	Controller
} from 'react-hook-form'
import PathSelectorTrigger from '@/components/PathSelectorTrigger'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'

const itemTypes = [
	{
		label: 'Ссылка',
		value: 'link'
	},
	{
		label: 'Папка',
		value: 'folder'
	},
]

const defaultValues = {
	title: '',
	type: 'folder',
	url: ''
}

const AddingScreen = () => {
	const { currentAddingData } = useGlobalContext()

	useEffect(() => {
		const values = currentAddingData !== null
			?
			currentAddingData
			: defaultValues
		Object.entries(values).forEach(value => {
			setValue(value[0] as any, value[1])
		})
	}, [currentAddingData])
	const { register, setValue, control, reset, formState: { errors }, getValues } = useForm({
		defaultValues: defaultValues
	})
	const hanldeSubmit = () => {
		reset()
	}
	return (
		<View className='h-[93vh]'>
			<TopContent>
				<Controller
					control={control}
					name="title"
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<TextInput
							className=' text-xl font-medium px-2 py-1 text-slate-600'
							placeholder='Название'
							value={value}
							onChangeText={onChange}
						/>
					)}
				/>

			</TopContent>
			<View className='gap-y-3'>
				<Controller
					control={control}
					name="type"
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<View className='w-full pt-4 px-4  gap-3 justify-center'>
							<Text className=' text-base'>
								Тип:
							</Text>
							<Dropdown
								style={{
									borderWidth: 1,
									borderRadius: 6,
									width: '50%'
								}}
								data={itemTypes}
								labelField={'label'}
								valueField={'value'}
								onChange={onChange}
								value={value}
								containerStyle={{
									borderRadius: 6,
								}}
								selectedTextStyle={{
									paddingHorizontal: 8,
									paddingVertical: 4,
									fontSize: 16,
									lineHeight: 24
								}}
							/>
						</View>
					)}
				/>
				<Controller
					control={control}
					name="url"
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<View className='w-full pt-4 px-4 gap-3  justify-center'>
							<Text className='text-base'>
								Ссылка:
							</Text>
							<StyledTextInput
								value={value}
								onChangeText={onChange}
								className='h-8'
							/>
						</View>
					)}
				/>

				<PathSelectorTrigger
					ContainerClassName='w-full pt-4 px-4 gap-3 justify-center'
					getValues={getValues}
				/>

			</View>
			<BottomRoundButton onPress={hanldeSubmit}>
				<Plus color={'white'} size={30} />
			</BottomRoundButton>
		</View>
	)
}

export default AddingScreen