
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

type SettingsPopoverProps = {
	parentId: string | string[]
}

export default function SettingsPopover({ parentId }: SettingsPopoverProps) {
	const { t } = useGlobalContext()
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
				<Animated.View entering={FadeIn.duration(200)}>
					<DropdownMenuSub>

						<DropdownMenuSubTrigger>
							<Text>
								{t('add')}
							</Text>
						</DropdownMenuSubTrigger>

						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<AddFolderDialog parentId={parentId} />
							</DropdownMenuItem>

							<DropdownMenuItem>
								<AddLinkDialog parentId={parentId} />
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</Animated.View>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Link href={{ pathname: 'SettingsScreen' }}>
						<Text>
							{t('settings')}
						</Text>
					</Link>
				</DropdownMenuItem>


			</DropdownMenuContent>
		</DropdownMenu>
	)
}