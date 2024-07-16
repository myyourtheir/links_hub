import { TextInput, View } from 'react-native'
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import TopContent from '@/components/TopContent'
import StyledTextInput from '@/components/StyledTextInput'
import { Plus } from 'lucide-react-native'
import {
	useForm,
	Controller,
	SubmitHandler
} from 'react-hook-form'
import PathSelectorTrigger from '@/components/PathSelectorTrigger'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { z } from 'zod'
import { RealmContext } from '@/lib/Realm'
import { router } from 'expo-router'
import BottomRoundButtonWrapper from '@/components/BottomRoundButtonWrapper'
import StyledText from '@/components/StyledText'
import { useColorScheme } from 'nativewind'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
const { useRealm } = RealmContext




const schema = z.object({
	title: z.string().min(3),
	type: z.string().min(3),
	url: z.string(),

})
export type FormSchema = z.infer<typeof schema>

const defaultValues: FormSchema = {
	title: '',
	type: 'folder',
	url: '',
}
const AddingScreen = () => {
	const { currentFolder, currentAddingData, setCurrentAddingData, setCurrentFolder, t } = useGlobalContext()
	const itemTypes = [
		{
			label: t('link'),
			value: 'link'
		},
		{
			label: t('folder'),
			value: 'folder'
		},
	]
	const realm = useRealm()
	// { setValue, control, formState: { errors }, getValues, handleSubmit }
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues
	})
	const { colorScheme } = useColorScheme()

	useEffect(() => {
		const values = currentAddingData !== null
			?
			currentAddingData
			: defaultValues
		Object.entries(values).forEach(value => {
			form.setValue(value[0] as any, value[1])
		})
	}, [currentAddingData])


	const onSubmit: SubmitHandler<FormSchema> = (data) => {
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
			setCurrentAddingData(defaultValues)
			setCurrentFolder(null)
		})
	}

	return (

		<Form {...form}>
			<TopContent>
				<FormField
					control={form.control}
					name='title'
					render={({ field: { onChange, ...props } }) => {
						return (
							<FormItem>
								<FormControl>
									<TextInput placeholder={t('addingTitle')}
										placeholderTextColor={colorScheme == 'dark' ? 'white' : 'black'}
										onChangeText={e => onChange(e)}
										{...props}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
			</TopContent>
			<BottomRoundButtonWrapper
				onPress={form.handleSubmit(onSubmit)}
				buttonIcon={<Plus color={'white'} size={30}
				/>}>
				<FormField
					control={form.control}
					name='type'
					render={({ field: { value, onChange } }) => {
						return (
							<FormItem >
								<FormLabel additionClassName=''>
									{t("addingType")}
								</FormLabel>
								<FormControl>
									<View>
										<Dropdown
											style={{
												borderBottomWidth: 1,
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
												paddingVertical: 2,
												fontSize: 16,
												lineHeight: 24
											}}
										/>
									</View>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name='url'
					render={({ field: { onChange, ...props } }) => {
						return (
							<FormItem>
								<FormLabel additionClassName=''>
									{t("addingLink")}
								</FormLabel>
								<FormControl>
									<StyledTextInput
										onChangeText={e => onChange(e)}
										{...props}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<FormItem>
					<FormLabel>
						{t('addingPath')}
					</FormLabel>
					<View>
						<PathSelectorTrigger
							ContainerClassName=''
							value={currentFolder}
							setValue={form.setValue}
							getValues={form.getValues}

						/>
					</View>
				</FormItem>
			</BottomRoundButtonWrapper>
		</Form>
		// <View className='h-[93vh]'>
		// 	<TopContent>
		// 		<Controller
		// 			control={control}
		// 			name="title"
		// 			rules={{ required: true }}
		// 			render={({ field: { onChange, value } }) => (
		// 				<TextInput
		// 					className={`text-xl font-medium  py-1 text-slate-600 ${colorScheme == 'dark' ? 'text-white' : 'text-black'}`}
		// placeholder={t('addingTitle')}
		// placeholderTextColor={colorScheme == 'dark' ? 'white' : 'black'}
		// 					value={value}
		// 					onChangeText={onChange}
		// 				/>
		// 			)}
		// 		/>

		// 	</TopContent>
		// 	<BottomRoundButtonWrapper
		// onPress={handleSubmit(onSubmit)}
		// buttonIcon={<Plus color={'white'} size={30} />}
		// 	>
		// 		<View className='px-4 leading-3'>
		// 			<StyledText additionClassName=' text-base'>
		// 				{t("addingType")}
		// 			</StyledText>
		// 			<Controller
		// 				control={control}
		// 				name="type"
		// 				rules={{ required: true }}
		// 				render={({ field: { onChange, value } }) => (

		// <Dropdown
		// 	style={{
		// 		borderWidth: 1,
		// 		borderRadius: 6,
		// 		width: '50%'
		// 	}}
		// 	data={itemTypes}
		// 	labelField={'label'}
		// 	valueField={'value'}
		// 	onChange={(el) => onChange(el.value)}
		// 	value={value}
		// 	containerStyle={{
		// 		borderRadius: 6,
		// 	}}
		// 	selectedTextStyle={{
		// 		paddingHorizontal: 8,
		// 		paddingVertical: 4,
		// 		fontSize: 16,
		// 		lineHeight: 24
		// 	}}
		// />

		// 				)}
		// 			/>
		// 			<StyledText additionClassName='text-base'>
		// 				{t("addingLink")}
		// 			</StyledText>
		// 			<Controller
		// 				control={control}
		// 				name="url"
		// 				rules={{ required: true }}
		// 				render={({ field: { onChange, value } }) => (
		// 					<StyledTextInput
		// 						value={value}
		// 						onChangeText={onChange}
		// 						additionClassName='h-8'
		// 					/>
		// 				)}
		// 			/>
		// 			<StyledText additionClassName='text-base'>
		// 				{t('addingPath')}
		// 			</StyledText>
		// <PathSelectorTrigger
		// 	ContainerClassName=''
		// 	value={currentFolder}
		// 	setValue={setValue}
		// 	getValues={getValues}

		// />

		// 		</View>

		// 	</BottomRoundButtonWrapper>
		// </View>
	)
}

export default AddingScreen