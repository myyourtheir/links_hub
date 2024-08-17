import { router } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { useEffect } from 'react'

const useRedirectWhenShareIntent = () => {
	const { hasShareIntent } = useShareIntentContext()
	useEffect(() => {
		if (hasShareIntent) {
			router.replace({
				pathname: "/AddingIntentScreen",
			})
		}
		return
	}, [hasShareIntent])
}

export default useRedirectWhenShareIntent