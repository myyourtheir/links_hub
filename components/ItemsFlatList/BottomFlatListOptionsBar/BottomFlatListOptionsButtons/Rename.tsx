import React, { useState } from 'react'
import BottomFlatListOptionsItem from '../BottomFlatListOptionsItem'
import { FolderPen, Trash2 } from 'lucide-react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { RealmContext } from '~/lib/Realm'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '~/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/Form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { useTranslation } from 'react-i18next'
const { useRealm } = RealmContext

const schema = z.object({
	title: z.string(),
})
export type FormSchema = z.infer<typeof schema>



const RenameOptionButton = () => {
	const [open, setOpen] = useState(false)
	const { globalState: { selected }, globalDispatch } = useGlobalContext()
	const { t } = useTranslation()
	const defaultValues: FormSchema = {
		title: selected[0].title,
	}
	const realm = useRealm()
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
	})
	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		realm.write(() => {
			for (const item of selected) {
				item.title = data.title
				item.updatedTime = new Date()
			}
		})
		setOpen(false)
		globalDispatch({ type: 'resetSelected' })
		globalDispatch({ type: 'setMode', value: 'view' })
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger >
				<BottomFlatListOptionsItem onPress={() => setOpen(true)} icon={<FolderPen />} title={t('rename')} />
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] min-w-[300px]'>
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

export default RenameOptionButton