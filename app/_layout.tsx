import { StatusBar } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { RealmContext } from '@/lib/Realm'
import GlobalContextProvider from '@/lib/store/GlobalContextProvider'
import OrientationContextProvider from './(tabs)/HomeScreen/(components)/OrientationContext'




const GlobalLayout = () => {
	const { RealmProvider } = RealmContext

	return (
		<RealmProvider>
			<GlobalContextProvider>
				<OrientationContextProvider>
					<StatusBar
						barStyle={'dark-content'}
					/>
					<Slot />
				</OrientationContextProvider>
			</GlobalContextProvider>
		</RealmProvider>
	)
}

export default GlobalLayout