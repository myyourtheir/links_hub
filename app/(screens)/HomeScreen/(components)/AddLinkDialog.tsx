import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import AddLinkForm from '~/components/AddLinkForm'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '~/components/ui/dialog'
import { DropdownMenuItem } from '~/components/ui/dropdown-menu'
import { Text } from '~/components/ui/text'
import useFocus from '~/hooks/useFocus'


type AddLinkDialogProps = {
	parentId: string | string[]
}

function AddLinkDialog({ parentId }: AddLinkDialogProps) {
	const { t } = useTranslation()
	const [open, setOpen] = React.useState(false)
	const inputRef = React.useRef<TextInput>(null)
	useFocus({ ref: inputRef })
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem>
				<DialogTrigger className='w-full'>
					<Text>
						{t('link')}
					</Text>
				</DialogTrigger>
			</DropdownMenuItem>
			<DialogContent className='w-[350px] '>
				<AddLinkForm ref={inputRef} parentId={parentId} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}

export default AddLinkDialog