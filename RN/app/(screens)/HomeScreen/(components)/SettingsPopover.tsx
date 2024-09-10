
import { Link, router } from 'expo-router'
import { CircleHelp, EllipsisVertical } from 'lucide-react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import StyledIcon from '~/components/StyledIcon'
import { Button } from '~/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Text } from '~/components/ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import AddFolderDialog from './AddFolderDialog'
import AddLinkDialog from './AddLinkDialog'
import { useTranslation } from 'react-i18next'

type SettingsPopoverProps = {
	parentId: string | string[]
}

export default function SettingsPopover({ parentId }: SettingsPopoverProps) {
	const { t } = useTranslation()
	return (
		<DropdownMenu >
			<DropdownMenuTrigger asChild>
				<Button
					variant={'ghost'}
				>
					<StyledIcon>
						<EllipsisVertical />
					</StyledIcon>
				</Button >
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-48'
				sideOffset={-40}
			>
				<DropdownMenuItem>
					<Link className='w-full' href={{ pathname: 'SettingsScreen' }}>
						<Text>
							{t('settings')}
						</Text>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem className='justify-between' onPress={() => router.push({ pathname: 'TutorialScreen' })}>
					<Text>
						{t('howToUse')}
					</Text>
					<StyledIcon >
						<CircleHelp size={20} />
					</StyledIcon>

				</DropdownMenuItem>


			</DropdownMenuContent>
		</DropdownMenu>
	)
}