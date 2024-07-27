import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { BSON } from 'realm'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '~/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/Form'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import useFocus from '~/hooks/useFocus'
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext


type AddFolderDialogProps = {
	parentId: string | string[]
}

const schema = z.object({
	title: z.string(),
})
export type FormSchema = z.infer<typeof schema>

const defaultValues: FormSchema = {
	title: '',
}

function AddFolderDialog({ parentId }: AddFolderDialogProps) {
	const [open, setOpen] = React.useState(false)
	const inputRef = React.useRef<TextInput>(null)
	useFocus({ ref: inputRef })
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger >
				<Text>
					{t('section')}
				</Text>
			</DialogTrigger>
			<DialogContent className='w-[350px]'>
				<DialogHeader />
				<Form {...form}>
					<FormField
						name='title'
						render={({ field: { value, onChange } }) =>
							<FormItem className=' p-0 m-0'>
								<FormControl>
									<Input
										ref={inputRef}
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
			</DialogContent>
		</Dialog>
	)
}

export default AddFolderDialog