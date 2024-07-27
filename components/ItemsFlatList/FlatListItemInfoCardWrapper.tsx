import { View } from 'react-native'
import React, { ReactNode } from 'react'
import { Text } from '~/components/ui/text'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import StyledIcon from '../StyledIcon'
import { Info } from 'lucide-react-native'
import { Item } from '~/lib/Realm/models/Item'
import { Form, FormField, FormItem, FormLabel } from '~/components/ui/Form'
import { Input } from '~/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RealmContext } from '~/lib/Realm'
import { useTranslation } from 'react-i18next'
const { useRealm } = RealmContext


const FlatListItemInfoCardWrapper = ({ children, item }: { children: ReactNode, item: Item }) => {
	return (
		<View className='relative'>
			{children}
			<Dialog className='absolute top-1 right-2'>
				<DialogTrigger className=''>
					<StyledIcon>
						<Info strokeWidth={1.5} />
					</StyledIcon>
				</DialogTrigger>
				<InfoDialogContent item={item} />
			</Dialog>
		</View>
	)
}

export default FlatListItemInfoCardWrapper


const schema = z.object({
	description: z.string().nullable()
})

type FormSchema = z.infer<typeof schema>


const InfoDialogContent = ({ item }: { item: Item }) => {
	const from = useForm({
		defaultValues: {
			description: item.description || null
		},
		resolver: zodResolver(schema),
	})
	const realm = useRealm()
	const { t } = useTranslation()

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		try {
			schema.parse(data)
			try {
				realm.write(() => {
					item.description = data.description as string | undefined
					item.updatedTime = new Date()
				}
				)
			} catch (e) {
				console.log('error while add data to realm', e)
			}
		} catch (e) {
			console.log('error while parsing data', e)
		}
	}
	return (
		<DialogContent
			className='w-[350px]'
		>
			<DialogHeader>
				<DialogTitle>
					{item.title}
				</DialogTitle>

			</DialogHeader>
			<Form {...from}>
				<FormField
					name='description'
					render={({ field: { value, onChange } }) =>
						<FormItem className='p-0 m-0 w-full gap-y-4' >
							<FormLabel nativeID='description'>
								{t('addingDescription')}
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
			</Form>
			<DialogFooter>
				<DialogClose asChild>
					<Button onPress={from.handleSubmit(onSubmit)}>
						<Text>OK</Text>
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}