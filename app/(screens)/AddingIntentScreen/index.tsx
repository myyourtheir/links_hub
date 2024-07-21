import { View } from 'react-native'
import React from 'react'
import { Text } from '~/components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import BottomRoundButtonWrapper from '~/components/BottomRoundButtonWrapper'
import Plus from '~/lib/icons/Plus'
import TopContent from '~/components/TopContent'
import { Button } from '~/components/ui/button'
import StyledIcon from '~/components/StyledIcon'
import { ChevronLeft } from 'lucide-react-native'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '~/components/ui/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '~/components/ui/input'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { RealmContext } from '~/lib/Realm'
import { useShareIntentContext } from 'expo-share-intent'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
const { useRealm } = RealmContext


const schema = z.object({
	title: z.string(),
	description: z.string().nullable(),
	url: z.string().url().nullable()
})

type FormSchema = z.infer<typeof schema>

const AddLinkScreen = () => {
	const { shareIntent, resetShareIntent } = useShareIntentContext()

	const { t } = useTranslation()
	const realm = useRealm()
	const { globalState: { folderToSetIn } } = useGlobalContext()
	const defaultValues: FormSchema = {
		title: '',
		description: '',
		url: shareIntent ? shareIntent.webUrl : 'null'
	}
	const form = useForm({ defaultValues })
	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		try {
			schema.parse(data)
			try {
				realm.write(() => {
					realm.create('Item', {
						parentId: folderToSetIn,
						type: 'link',
						...data,
					})
				})
				resetShareIntent()
				router.replace({ pathname: '/HomeScreen/[parentId]', params: { parentId: folderToSetIn !== null ? folderToSetIn.toString() : 'null' } })
			} catch (e) {
				console.log('error while add data to realm', e)
			}
		} catch (e) {
			console.log('error while parsing data', e)
		}
	}
	return (
		<>
			<Form {...form}>
				<TopContent className='mb-4' withBack backIconWrapperClassName='flex-row items-start justify-start'>
					<FormField
						name='title'
						render={({ field: { value, onChange } }) =>
							<FormItem className=' p-0 m-0 flex-1'>
								<FormControl>
									<Input
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
						name='path'
						render={(field) =>
							<FormItem className='p-0 m-0 w-full gap-y-4'>
								<FormLabel nativeID='path'>
									<Text>
										{t('addingPath')}
									</Text>
								</FormLabel>
								<Input
									className=' '
									placeholder={t('addingPath')}
									{...field}
								/>
							</FormItem>
						}
					/>
				</View>


			</Form>
			<Button
				className=' m-8'
				onPress={form.handleSubmit(onSubmit)}>
				<Text>
					ОК
				</Text>
			</Button>
		</>
	)
}

export default AddLinkScreen

