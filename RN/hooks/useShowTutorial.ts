import { useCallback, useEffect, useState } from 'react'
import { boolean } from 'zod'
import { getShowTutorial, setShowTutorial as setShowAsyncStorage } from '~/lib/AsyncStorage'

function useShareTutorial() {
	const [showTutorial, setShowTutorial] = useState<boolean>()
	useEffect(() => {
		getShowTutorial().then((value) => {
			setShowTutorial(value)
		})
			.catch(e => {
				console.log(e)
			})
	}, [])

	const setDontShowTutorialInAsyncStorage = useCallback(() => {
		setShowAsyncStorage(true)
	}, [])


	return { showTutorial, setDontShowTutorialInAsyncStorage }
}

export default useShareTutorial