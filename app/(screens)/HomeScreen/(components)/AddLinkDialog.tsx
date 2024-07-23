import { zodResolver } from '@hookform/resolvers/zod'
import { DropdownMenuTriggerRef } from '@rn-primitives/dropdown-menu'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BSON } from 'realm'
import { z } from 'zod'
import AddLinkForm from '~/components/AddLinkForm'
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
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext


type AddLinkDialogProps = {
	parentId: string | string[]
}

function AddLinkDialog({ parentId }: AddLinkDialogProps) {
	const { t } = useTranslation()
	const [open, setOpen] = React.useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger >
				<Text>
					{t('link')}
				</Text>
			</DialogTrigger>
			<DialogContent className='w-[350px] '>
				<AddLinkForm parentId={parentId} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}

export default AddLinkDialog