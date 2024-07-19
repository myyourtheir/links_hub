import { View } from 'react-native'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/Form'
import { Input } from '~/components//ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { RealmContext } from '~/lib/Realm'
import { BSON } from 'realm'
import { DialogFooter, DialogHeader } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
const { useRealm } = RealmContext


type AddLinkFormProps = {
	parentId: string | string[]
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const schema = z.object({
	title: z.string(),
	url: z.string().url()
})

type FormSchema = z.infer<typeof schema>

const AddLinkForm = ({ parentId, setOpen }: AddLinkFormProps) => {

	const defaultValues: FormSchema = {
		title: '',
		url: ''
	}
	const { t } = useTranslation()
	const form = useForm({ defaultValues })
	const realm = useRealm()

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		try {
			schema.parse(data)
		} catch (e) {
			console.log('error while parsing data', e)
		}
		try {
			realm.write(() => {
				realm.create('Item', {
					parentId: parentId !== 'null' ? new BSON.ObjectId(parentId as string) : null,
					type: 'link',
					...data,
				})
			}
			)
			setOpen(false)
		} catch (e) {
			console.log('error while add data to realm', e)
		}
	}

	return (
		<>
			<DialogHeader />
			<Form {...form}>

				<FormField
					name='title'
					render={({ field: { value, onChange } }) =>
						<FormItem className=' p-0 m-0'>
							<FormControl>
								<Input
									className=' border-0 border-b  '
									placeholder={t('addingTitle')}
									value={value}
									onChangeText={onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					}
				/>
				<FormField
					name='url'
					render={({ field: { value, onChange } }) =>
						<FormItem className=' p-0 m-0'>
							<FormControl>
								<Input
									className=' border-0 border-b  '
									placeholder={t('addingLink')}
									value={value}
									onChangeText={onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					}
				/>
			</Form>
			<DialogFooter>
				<Button onPress={form.handleSubmit(onSubmit)}>
					<Text>OK</Text>
				</Button>
			</DialogFooter>
		</>
	)
}

export default AddLinkForm