import '../i18n'
import React from 'react'
import { Redirect, router } from 'expo-router'
import useInitialSetup from '@/hooks/useInitialSetup'
const App = () => {
	useInitialSetup()
	return <Redirect href={{ pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } }} />
}

export default App