import { ScrollView, Share, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text } from '~/components/ui/text'
import { router } from 'expo-router'
import TopContent from '~/components/TopContent'
import { Button } from '~/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '~/components/ui/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '~/components/ui/input'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { RealmContext } from '~/lib/Realm'
import { useShareIntentContext } from 'expo-share-intent'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { BSON } from 'realm'
import useGetCurrentPath from '~/hooks/useGetCurrentPath'
import useFocus from '~/hooks/useFocus'
import { ShareIntent } from 'expo-share-intent/build/ExpoShareIntentModule.types'
import ImagePicker from './ImagePicker'
import getUrl from '~/utils/getUrl'
import scrap from '~/utils/scrap'
import useScrap from '~/hooks/useScrap/useScrap'
const { useRealm } = RealmContext


const schema = z.object({
	title: z.string(),
	description: z.string().nullable(),
	image: z.string().nullable(),
	url: z.string().nullable(),
	parentId: z.instanceof(BSON.ObjectId).nullable(),
	price: z.number().optional(),
	currency: z.string().optional()
})

export type FormAddLinkSchema = z.infer<typeof schema>

const AddLinkScreen = () => {
	const titleInputRef = useRef<TextInput>(null)
	const descriptionInputRef = useRef<TextInput>(null)
	// useFocus({ ref: descriptionInputRef })
	const { shareIntent, resetShareIntent } = useShareIntentContext()
	const { t } = useTranslation()
	const realm = useRealm()
	const { globalState: { folderToSetIn, addingData }, globalDispatch } = useGlobalContext()
	const { scrap, parsedData } = useScrap()
	useEffect(() => {
		scrap(shareIntent)
	}, [shareIntent])

	const defaultValues: FormAddLinkSchema = addingData ? addingData : {
		title: '',
		description: '',
		image: parsedData?.icons ? parsedData?.icons[0] : null,
		url: getUrl(shareIntent),
		parentId: null,
		price: undefined,
		currency: undefined,
	}
	const form = useForm({ defaultValues })
	const { currentPathText } = useGetCurrentPath({ currentParent: folderToSetIn })
	useEffect(() => {
		if ((shareIntent.type == 'weburl' || shareIntent.type == 'file') && !form.getFieldState('title').isDirty && !addingData) {
			form.setValue('title', parsedData?.title)
		}
	}, [parsedData?.title])



	const onSubmit: SubmitHandler<FormAddLinkSchema> = (data) => {
		try {
			schema.parse(data)
			try {
				realm.write(() => {
					realm.create('Item', {
						// parentId: folderToSetIn,
						...data,
						type: shareIntent.type == 'weburl' ? 'link' : 'media',
						parentId: folderToSetIn
					})
				})
				resetShareIntent()
				globalDispatch({ type: 'setAddingData', value: null })
				globalDispatch({ type: 'setMode', value: 'view' })
				router.replace({ pathname: '/HomeScreen/[parentId]', params: { parentId: folderToSetIn !== null ? folderToSetIn.toString() : 'null' } })
			} catch (e) {
				console.log('error while add data to realm', e)
			}
		} catch (e) {
			console.log('error while parsing data', e)
		}
	}
	return (
		<ScrollView>
			<Form {...form}>
				<TopContent
					className='mb-4'
					withBack
					backIconWrapperClassName='flex-row items-start justify-start'
					onBackPress={() => {
						resetShareIntent()
						router.replace({
							pathname: "/HomeScreen/[parentId]",
							params: {
								parentId: 'null'
							}
						})
					}}
				>
					<FormField
						name='title'
						render={({ field: { value, onChange } }) =>
							<FormItem className=' p-0 m-0 flex-1'>
								<FormControl>
									<Input
										ref={titleInputRef}
										className=' border-0 border-b mr-4'
										placeholder={t('addingTitle')}
										value={value}
										onChangeText={onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						}
					/>
				</TopContent>
				<View className='px-4 items-start w-full justify-start flex-1 gap-y-8 h-full'>
					<FormField
						name='url'
						render={({ field: { value, onChange } }) =>
							<FormItem className='p-0 m-0 w-full gap-y-4' >
								<FormLabel nativeID='url'>
									<Text>
										{t('addingLink')}
									</Text>
								</FormLabel>
								<Input
									nativeID='url'
									className=' '
									value={value}
									onChangeText={onChange}
								/>
							</FormItem>
						}
					/>
					<FormField
						name='description'
						render={({ field: { value, onChange } }) =>
							<FormItem className='p-0 m-0 w-full gap-y-4' >
								<FormLabel nativeID='description'>
									<Text>
										{t('addingDescription')}
									</Text>
								</FormLabel>
								<Input
									ref={descriptionInputRef}
									multiline
									nativeID='description'
									className='py-2'
									style={{
										height: 80,
										textAlignVertical: 'top'
									}}
									value={value}
									onChangeText={onChange}
								/>
							</FormItem>
						}
					/>
					<FormField
						name='parentId'
						render={({ field: { onChange } }) =>
							<FormItem className='p-0 m-0 w-full gap-y-4'>
								<FormLabel nativeID='path'>
									<Text>
										{t('addingPath')}
									</Text>
								</FormLabel>
								<Button
									variant={'outline'}
									onPress={
										() => {
											globalDispatch({ type: 'setAddingData', value: form.getValues() })
											globalDispatch({ type: 'setMode', value: 'move' })
											router.push({
												pathname: '/AddingIntentScreen/SelectPath/[parentId]', params: {
													parentId: 'null',
													addIntent: 'true'
												}
											})
										}
									}

								>
									<Text
										className=' w-full'
									>
										{currentPathText}
									</Text>
								</Button>
							</FormItem>
						}
					/>
					{
						shareIntent.type == 'weburl' && parsedData.icons && parsedData.icons.length > 0 ?
							parsedData.icons ?
								<FormField
									name='image'
									render={({ field: { value, onChange } }) =>
										<FormItem className='p-0 m-0 w-full gap-y-4' >
											<FormLabel nativeID='image'>
												<Text>
													{t('icon')}
												</Text>
											</FormLabel>
											<ImagePicker icons={parsedData.icons} value={value} onChange={onChange} />
										</FormItem>
									}
								/> :
								<Text> {t('noParsedIcons')}</Text> :
							null
					}
				</View>
				<View className='h-10' />


			</Form>
			<Button
				className=' m-8'
				onPress={form.handleSubmit(onSubmit)}>
				<Text>
					ОК
				</Text>
			</Button>
		</ScrollView>
	)
}

export default AddLinkScreen

