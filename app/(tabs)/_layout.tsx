import { View, Text } from 'react-native'
import React, { Children, ReactElement, ReactNode, cloneElement } from 'react'
import { Tabs, Redirect } from 'expo-router'
import { House, LucideIcon, LucideProps, Settings, SquarePlus } from 'lucide-react-native'
import { useColorScheme } from 'nativewind'


const defaultTabBarIconProps = {
	size: 32,
	strokeWidth: 1.5
}
type TabBarIconProps = {
	Icon: LucideIcon,
	color: string,
}

const TabBarIcon = ({ Icon, color }: TabBarIconProps) => {
	const { size, strokeWidth } = defaultTabBarIconProps
	return (
		<View >
			<Icon color={color} size={size} strokeWidth={strokeWidth} />
		</View>
	)
}



const TabsLayout = () => {
	const { colorScheme } = useColorScheme()
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: colorScheme == 'dark' ? '#171717' : '#FFFFFF',
						borderBlockColor: colorScheme == 'dark' ? 'black' : '#FFFFFF'
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
							<TabBarIcon Icon={House} color={`${focused ? color : 'black'}`} />
						)
					}}
				/>
				<Tabs.Screen
					name='AddingScreen'
					options={{
						title: "Adding",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon Icon={SquarePlus} color={`${focused ? color : 'black'}`} />
						)
					}}
				/>
				<Tabs.Screen
					name='SettingsScreen'
					options={{
						title: "Settings",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon Icon={Settings} color={`${focused ? color : 'black'}`} />
						)
					}}
				/>
			</Tabs>
		</>

	)
}

export default TabsLayout