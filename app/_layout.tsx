import { StatusBar } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { RealmContext } from '@/lib/Realm'
import GlobalContextProvider from '@/lib/store/GlobalContextProvider'




const GlobalLayout = () => {
	const { RealmProvider } = RealmContext
	return (
		<RealmProvider>
			<GlobalContextProvider>
				<StatusBar
					barStyle={'dark-content'}
				/>
				<Slot />
			</GlobalContextProvider>
		</RealmProvider>
	)
}

export default GlobalLayout