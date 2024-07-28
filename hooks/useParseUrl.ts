import { ShareIntent } from 'expo-share-intent'
import { useCallback, useLayoutEffect, useState } from 'react'
const useParseUrl = (shareIntent: ShareIntent) => {
	const [parsedTitle, setParsedTitle] = useState('')
	const url = shareIntent.webUrl

	const getUrl = useCallback(() => {
		if (shareIntent.type == 'weburl') {
			return shareIntent.webUrl
		}
		if ((shareIntent.type == 'media' || shareIntent.type == 'file') && shareIntent.files) {
			return shareIntent.files[0].path
		}
		return 'null'
	}, [])

	useLayoutEffect(() => {
		if (shareIntent?.text !== shareIntent.webUrl) {
			setParsedTitle(shareIntent.text?.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') as string)
		} else {
			if (url) {
				fetch(url)
					.then(function (response) {
						return response.text()
					})
					.then(function (html) {
						const titles = html.match('<title>.+</title>')
						if (titles && titles?.length !== 0) {
							const titleTag = titles[0]
							const title = titleTag.replace(/<\/?title>/g, '')
							setParsedTitle(title)
						}
					})
					.catch(function (err) {
						console.log('Failed to fetch page: ', err)
					})
			}
		}
	}, [url])

	return { parsedTitle, getUrl }
}

export default useParseUrl