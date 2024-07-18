import { View, Text } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useColorScheme } from '~/lib/useColorScheme'
import { cn } from '~/lib/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from './ui/button'
import { router } from 'expo-router'
import StyledIcon from './StyledIcon'
import { ChevronLeft } from 'lucide-react-native'


type TopContentProps = {
	withBack?: boolean
	children?: ReactNode
	className?: string,
	backIconWrapperClassName?: string
}

const TopContent: FC<TopContentProps> = ({ children, className, withBack = false, backIconWrapperClassName }) => {
	return (
		<View className={cn('h-[8vh] flex flex-row items-center justify-between  bg-background mb-5', className)}>
			{
				withBack ? (
					<View className={cn('flex-row items-start', backIconWrapperClassName)}>
						<Button
							className=''
							variant={'ghost'}
							onPress={() => {
								if (router.canGoBack()) {
									router.back()
								} else {
								}
							}}>
							<StyledIcon>
								<ChevronLeft />
							</StyledIcon>
						</Button>
						{children}
					</View>
				)
					:
					children
			}
		</View>
	)
}

export default TopContent