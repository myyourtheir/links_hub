import { ShareIntent } from 'expo-share-intent'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import * as cheerio from 'cheerio'
import { FadingTransition } from 'react-native-reanimated'

const useParseUrl = (shareIntent: ShareIntent) => {
	const [parsedTitle, setParsedTitle] = useState('')
	const [parsedIcon, setParsedIcon] = useState<string | null>('')
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

	useEffect(() => {
		if (shareIntent.type === 'weburl') {
			if (shareIntent?.text !== shareIntent.webUrl) {
				setParsedTitle(shareIntent.text?.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') as string)
			} else {
				if (url) {
					fetch(url)
						.then((response) => {
							return response.text()
						})
						.then(function (data) {

							const $ = cheerio.load(data)
							const title = $('title').text()
							console.log(title)
							if (title) {
								setParsedTitle(title)
							}
							const icons: {
								href: string,
								sizes: number | null,
							}[] = []
							$('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], img').each((_, el) => {
								const href = $(el).attr('href') || $(el).attr('src')
								const sizes = $(el).attr('sizes')

								if (href) {
									icons.push({
										href: href.startsWith('/') ? new URL(href, url).href : href,
										sizes: sizes ? parseInt(sizes.split('x')[0], 10) : null,
									})
								}
							})

							// Sort icons by size descending, null sizes last
							icons.sort((a, b) => (b.sizes || 0) - (a.sizes || 0))

							// Use the largest icon available
							const highQualityIcon = icons.length > 0 ? icons[0].href : null

							setParsedIcon(highQualityIcon)
							console.log(highQualityIcon)
						})
						.catch(function (err) {
							console.log('Failed to fetch page: ', err)
						})
				}
			}
		}
		if (shareIntent.type === 'file' && shareIntent.files && shareIntent.files[0].fileName) {
			setParsedTitle(shareIntent.files[0].fileName)
		}
	}
		, [url])

	return { parsedTitle, parsedIcon, getUrl }
}

export default useParseUrl