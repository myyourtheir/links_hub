import React, { useEffect, useState } from 'react'
import { useShareIntentContext } from 'expo-share-intent'
import getUrl from '~/utils/getUrl'
import useScrap from '~/hooks/useScrap/useScrap'
import AddScreenSkeleton from './AddScreenSkeleton'
import AddIntentForm, { FormAddLinkSchema } from './AddIntentForm'
import { router } from 'expo-router'




const AddLinkScreen = () => {
	const [defaultValues, setDefaultValues] = useState<FormAddLinkSchema | null>(null)
	const [parsedIcons, setParsedIcons] = useState<string[]>([])
	const { shareIntent } = useShareIntentContext()
	const { scrap } = useScrap()
	useEffect(() => {

		scrap(shareIntent)
			.then((data) => {
				setParsedIcons(data?.icons || [])
				setDefaultValues({
					title: data?.title,
					description: '',
					image: data?.icons ? data?.icons[0] : null,
					url: getUrl(shareIntent),
					parentId: null,
					price: data?.price,
					currency: data?.currency
				})
			})
			.catch(e => {
				setDefaultValues({
					title: '',
					description: 'Parse error',
					image: null,
					url: getUrl(shareIntent),
					parentId: null,
					price: 0,
					currency: ''
				})
				console.log('error', e)
			})
	}, [shareIntent])

	if (!defaultValues) {
		return <AddScreenSkeleton />
	}
	return (
		<AddIntentForm defaultValues={defaultValues} icons={parsedIcons} />
	)
}
export default AddLinkScreen