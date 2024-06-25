import { View, Text } from 'react-native'
import React, { Children, ReactElement, ReactNode, cloneElement } from 'react'
import { Tabs, Redirect } from 'expo-router'
import { House, LucideIcon, LucideProps, Settings, SquarePlus } from 'lucide-react-native'


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
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: {
						height: '7%'
					}
				}}>
				<Tabs.Screen
					name='HomeScreen'
					options={{
						title: "Home",
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