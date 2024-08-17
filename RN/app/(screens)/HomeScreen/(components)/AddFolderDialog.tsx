import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { BSON } from 'realm'
import { z } from 'zod'
import AddFolderForm from '~/components/AddFolderForm'
import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '~/components/ui/dialog'
import { DropdownMenuItem } from '~/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/Form'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import useFocus from '~/hooks/useFocus'
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext


type AddFolderDialogProps = {
	parentId: string | string[],
}



function AddFolderDialog({ parentId }: AddFolderDialogProps) {
	const [open, setOpen] = React.useState(false)
	const inputRef = React.useRef<TextInput>(null)
	useFocus({ ref: inputRef })
	const { t } = useTranslation()


	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem>
				<DialogTrigger className='w-full'>
					<Text>
						{t('section')}
					</Text>
				</DialogTrigger>
			</DropdownMenuItem>
			<DialogContent className='w-[350px]'>
				<AddFolderForm ref={inputRef} parentId={parentId} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}

export default AddFolderDialog