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
	Controller,
	SubmitHandler
} from 'react-hook-form'
import PathSelectorTrigger from '@/components/PathSelectorTrigger'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { string, z } from 'zod'
import { RealmContext } from '@/lib/Realm'
import { router } from 'expo-router'
import { Item } from '@/lib/Realm/models/Item'
import { BSON } from 'realm'
const { useRealm } = RealmContext


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

const schema = z.object({
	title: z.string(),
	type: z.string(),
	url: z.string().url(),

})
export type FormSchema = z.infer<typeof schema>

const defaultValues: FormSchema = {
	title: '',
	type: 'folder',
	url: '',
}
const AddingScreen = () => {
	const { currentFolder, currentAddingData } = useGlobalContext()
	const realm = useRealm()
	const { register, setValue, control, reset, formState: { errors }, getValues, handleSubmit } = useForm({
		defaultValues: defaultValues
	})

	useEffect(() => {
		const values = currentAddingData !== null
			?
			currentAddingData
			: defaultValues
		Object.entries(values).forEach(value => {
			setValue(value[0] as any, value[1])
		})
	}, [currentAddingData])


	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		console.log(data)
		try {
			schema.parse(data)
		} catch (e) {
			console.log('error while parsing data', e)
		}
		const promise = new Promise((res) => {
			res(realm.write(() => {
				realm.create('Item', { ...data, parentId: currentFolder })
			}))
		})
		promise.then(_ => {
			router.replace({ pathname: '/HomeScreen/[parentId]', params: { parentId: currentFolder != null ? currentFolder.toString() : 'null' } })
		})
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
								onChange={(el) => onChange(el.value)}
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
					value={currentFolder}
					setValue={setValue}
					getValues={getValues}

				/>

			</View>
			<BottomRoundButton onPress={handleSubmit(onSubmit)}>
				<Plus color={'white'} size={30} />
			</BottomRoundButton>
		</View>
	)
}

export default AddingScreen