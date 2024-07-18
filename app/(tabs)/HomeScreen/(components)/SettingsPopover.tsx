
import { Link } from 'expo-router'
import { EllipsisVertical } from 'lucide-react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import StyledIcon from '~/components/StyledIcon'
import { Button } from '~/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Text } from '~/components/ui/text'

export default function SettingsPopover() {

	return (
		<DropdownMenu>
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
				className='w-64 native:w-52'
				sideOffset={-40}
			>

				<DropdownMenuSub>

					<DropdownMenuSubTrigger>
						<Text>Добавить</Text>
					</DropdownMenuSubTrigger>

					<DropdownMenuSubContent>
						<Animated.View entering={FadeIn.duration(200)}>

							<DropdownMenuItem>
								<Text>Категорию</Text>
							</DropdownMenuItem>

							<DropdownMenuItem>
								<Text>Ссылку</Text>
							</DropdownMenuItem>

						</Animated.View>
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Link href={{ pathname: 'SettingsScreen' }}>
						<Text>Настройки</Text>
					</Link>
				</DropdownMenuItem>


			</DropdownMenuContent>
		</DropdownMenu>
	)
}