
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
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import AddFolderDialog from './AddFolderDialog'
import { ForwardRefExoticComponent, LegacyRef, RefAttributes, useRef, useState } from 'react'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import { DropdownMenuTriggerRef } from '@rn-primitives/dropdown-menu'

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
				className='w-64 native:w-52'
				sideOffset={-40}
			>

				<DropdownMenuSub>

					<DropdownMenuSubTrigger>
						<Text>
							{t('add')}
						</Text>
					</DropdownMenuSubTrigger>

					<DropdownMenuSubContent>
						{/* <Animated.View entering={FadeIn.duration(200)}> */}
						<DropdownMenuItem>
							<AddFolderDialog parentId={parentId} />
						</DropdownMenuItem>

						<DropdownMenuItem>
							<Link
								href={{
									pathname: 'AddingScreen/AddLinkScreen',
									params: {
										parentId
									}
								}}
							>
								<Text>
									{t('link')}
								</Text>
							</Link>
						</DropdownMenuItem>

						{/* </Animated.View> */}
					</DropdownMenuSubContent>
				</DropdownMenuSub>

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