import '../i18n'
import React from 'react'
import { Redirect, router } from 'expo-router'
const App = () => {

	return <Redirect href={{ pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } }} />
}

export default App