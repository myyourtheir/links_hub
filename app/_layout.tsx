import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { RealmContext } from '@/lib/Realm'

const GlobalLayout = () => {
	const { RealmProvider } = RealmContext
	return (
		<RealmProvider >
			<StatusBar
				barStyle={'dark-content'}
			/>
			<Slot />
		</RealmProvider>
	)
}

export default GlobalLayout