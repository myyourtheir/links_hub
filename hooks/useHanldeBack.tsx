import { useEffect } from 'react'
import { BackHandler } from 'react-native'

const useHandleBack = (callback: () => boolean | null | undefined, deps: any[] = []) => {
	useEffect(() => {
		const backAction = () => {
			return callback()
		}

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		)
		return () => backHandler.remove()
	}, [...deps])
}

export default useHandleBack