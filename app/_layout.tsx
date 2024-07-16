import 'react-native-get-random-values'

import React, { useEffect } from 'react'
import { Slot } from 'expo-router'
import { RealmContext } from '@/lib/Realm'
import GlobalContextProvider from '@/lib/store/GlobalContextProvider'
import OrientationContextProvider from './(tabs)/HomeScreen/(components)/OrientationContext'


import StyledSafeAreaView from '@/components/StyledSafeAreaView'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'



const GlobalLayout = () => {
	const { RealmProvider } = RealmContext
	const { colorScheme } = useColorScheme()


	return (

		<RealmProvider>
			<GlobalContextProvider>
				<OrientationContextProvider>
					<StyledSafeAreaView>
						<Slot />
						<StatusBar
							style={
								colorScheme == 'dark' ? 'light' : "dark"
							}
						/>
					</StyledSafeAreaView>


				</OrientationContextProvider>
			</GlobalContextProvider>
		</RealmProvider>
	)
}

export default GlobalLayout