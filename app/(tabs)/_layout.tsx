import { View, Text } from 'react-native'
import React, { Children, ReactElement, ReactNode, cloneElement, useCallback } from 'react'
import { Tabs, Redirect } from 'expo-router'
import { House, LucideIcon, LucideProps, Settings, SquarePlus } from 'lucide-react-native'
import { useColorScheme } from 'nativewind'
import StyledIcon from '@/components/StyledIcon'


const defaultTabBarIconProps = {
	size: 32,
	strokeWidth: 1.5,
	focusedStrokeWidth: 2.2
}
type TabBarIconProps = {
	Icon: LucideIcon,
} & LucideProps

const TabBarIcon = ({ Icon, ...props }: TabBarIconProps) => {
	const { size } = defaultTabBarIconProps
	return (
		<StyledIcon>
			<Icon size={size} {...props} />
		</StyledIcon>
	)
}



const TabsLayout = () => {
	const { colorScheme } = useColorScheme()
	const { strokeWidth, focusedStrokeWidth } = defaultTabBarIconProps
	const extractIconProps = useCallback((focused: boolean, color: string): LucideProps => {
		return {
			strokeWidth: focused ? focusedStrokeWidth : strokeWidth,
			color: focused ? color : '',
		}
	}, [])
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: colorScheme == 'dark' ? 'white' : 'black',
					tabBarStyle: {
						backgroundColor: colorScheme == 'dark' ? '#000000' : '#FFFFFF',
						borderBlockColor: colorScheme == 'dark' ? 'black' : '#FFFFFF',
					}
				}}>
				<Tabs.Screen
					name='HomeScreen'
					options={{
						title: "Home",
						href: {
							pathname: '/HomeScreen/[parentId]',
							params: {
								parentId: 'null'
							}
						},
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								Icon={House}
								{...extractIconProps(focused, color)}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name='AddingScreen'
					options={{
						title: "Adding",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								Icon={SquarePlus}
								{...extractIconProps(focused, color)}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name='SettingsScreen'
					options={{
						title: "Settings",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								Icon={Settings}
								{...extractIconProps(focused, color)}
							/>
						)
					}}
				/>
			</Tabs>
		</>

	)
}

export default TabsLayout