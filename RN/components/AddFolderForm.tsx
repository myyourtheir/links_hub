import { TextInput, View } from 'react-native'
import React, { forwardRef } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
const { useRealm } = RealmContext


type AddFolderFormProps = {
	parentId: string | string[]
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const schema = z.object({
	title: z.string(),
})
export type FormSchema = z.infer<typeof schema>

const defaultValues: FormSchema = {
	title: '',
}

const AddFolderForm = forwardRef(({ parentId, setOpen }: AddFolderFormProps, ref: React.Ref<TextInput>) => {
	const { t } = useTranslation()
	const realm = useRealm()
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
		// mode: ''
	})

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		try {
			schema.parse(data)
			try {
				realm.write(() => {
					realm.create('Item', {
						parentId: parentId !== 'null' ? new BSON.ObjectId(parentId as string) : null,
						type: 'folder',
						...data,
					})
				}
				)
				setOpen(false)
			} catch (e) {
				console.log('error while add data to realm', e)
			}
		} catch (e) {
			console.log('error while parsing data', e)
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
									ref={ref}
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
			</Form>
			<DialogFooter>
				{/* <DialogClose asChild> */}
				<Button onPress={form.handleSubmit(onSubmit)}>
					<Text>OK</Text>
				</Button>
				{/* </DialogClose> */}
			</DialogFooter>
		</>
	)
})

export default AddFolderForm