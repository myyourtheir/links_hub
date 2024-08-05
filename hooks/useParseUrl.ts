import { ShareIntent } from 'expo-share-intent'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import * as cheerio from 'cheerio'
import { FadingTransition } from 'react-native-reanimated'

const useParseUrl = (shareIntent: ShareIntent) => {
	const [parsedTitle, setParsedTitle] = useState('')
	const [parsedIcons, setParsedIcons] = useState<string[] | null>(null)
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
	console.log(parsedIcons)
	useEffect(() => {
		if (shareIntent.type === 'weburl') {
			if (url) {
				fetch(url,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'text/html',
						}
					}
				)
					.then((response) => {
						return response.text()
					})
					.then(function (data) {
						const $ = cheerio.load(data)

						//parse title
						if (shareIntent?.text !== shareIntent.webUrl) {
							setParsedTitle(shareIntent.text?.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') as string)
						} else {
							const title = $('title').text()
							if (title) {
								setParsedTitle(title)
							}
						}

						//parse icons
						const icons: {
							href: string,
							sizes: number | null,
						}[] = []
						$('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], img').each((_, el) => {
							const href = el.tagName === 'link' ? $(el).attr('href') : $(el).attr('src')
							const sizes = $(el).attr('sizes')

							if (href) {
								icons.push({
									href: href.startsWith('/') ? new URL(href, url).href : href,
									sizes: sizes ? parseInt(sizes.split('x')[0], 10) : null,
								})
							}
						})
						setParsedIcons(Array.from(new Set(icons.map(icon => icon.href))))
					})
					.catch(function (err) {
						console.log('Failed to fetch page: ', err)
					})
			}

		}
		if (shareIntent.type === 'file' && shareIntent.files && shareIntent.files[0].fileName) {
			setParsedTitle(shareIntent.files[0].fileName)
		}
	}
		, [url])

	return { parsedTitle, parsedIcons, getUrl }
}

export default useParseUrl