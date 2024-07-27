
import { Link } from 'expo-router'
import { EllipsisVertical } from 'lucide-react-native'
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
				<DropdownMenuSub>

					<DropdownMenuSubTrigger>
						<Text>
							{t('add')}
						</Text>
					</DropdownMenuSubTrigger>

					<Animated.View entering={FadeIn.duration(200)}>
						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<AddFolderDialog parentId={parentId} />
							</DropdownMenuItem>

							<DropdownMenuItem>
								<AddLinkDialog parentId={parentId} />
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</Animated.View>
				</DropdownMenuSub>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Link className='w-full' href={{ pathname: 'SettingsScreen' }}>
						<Text>
							{t('settings')}
						</Text>
					</Link>
				</DropdownMenuItem>


			</DropdownMenuContent>
		</DropdownMenu>
	)
}