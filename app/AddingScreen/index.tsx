import { TextInput, View } from 'react-native'
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import TopContent from '~/components/TopContent'
import { Plus } from 'lucide-react-native'
import {
	useForm,
	Controller,
	SubmitHandler
} from 'react-hook-form'
import PathSelectorTrigger from '~/components/PathSelectorTrigger'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { z } from 'zod'
import { RealmContext } from '~/lib/Realm'
import { router } from 'expo-router'
import BottomRoundButtonWrapper from '~/components/BottomRoundButtonWrapper'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/Form'
import { useColorScheme } from '~/lib/useColorScheme'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
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
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
		// mode: ''
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
			<TopContent className='px-0'>
				<FormField
					control={form.control}
					name='title'
					render={({ field: { onChange, ...props } }) => {
						return (
							<FormItem>
								<FormControl>
									<Input
										placeholder={t('addingTitle')}
										className={`border-none `}
										cursorColor={colorScheme == 'dark' ? '#cccccc' : '#2a2d2e'}
										placeholderTextColor={colorScheme == 'dark' ? '#cccccc' : '#2a2d2e'}
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
					render={({ field: { value, onChange, ...props } }) => {
						return (
							<FormItem >
								<FormLabel nativeID={props.name} className=''>
									{t("addingType")}
								</FormLabel>
								<FormControl>
									<View>
										<Select defaultValue={{ value: 'apple', label: 'Apple' }}>
											<SelectTrigger className='w-[250px]'>
												<SelectValue
													className='text-foreground text-sm native:text-lg'
													placeholder='Select a fruit'
												/>
											</SelectTrigger>
											<SelectContent className='w-[250px]'>
												{itemTypes.map(el =>
													<SelectItem key={el.value} label={el.label} value={el.value}>
														{el.label}
													</SelectItem>
												)
												}
											</SelectContent>
										</Select>
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
								<FormLabel nativeID={props.name} className=''>
									{t("addingLink")}
								</FormLabel>
								<FormControl>
									<Input
										className=''
										aria-labelledby={props.name}
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
					<FormLabel nativeID=''>
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
	)
}

export default AddingScreen