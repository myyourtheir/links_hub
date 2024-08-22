import { ShareIntent } from 'expo-share-intent'
import * as cheerio from 'cheerio'
import { useCallback, useRef, useState } from 'react'

export type ScrapData = {
	icons: string[],
	title: string,
	price?: number,
	currency?: string
}
const apiUrl = 'http://172.28.100.196:3010'

const useScrap = () => {
	const [parsedData, setParsedData] = useState<ScrapData>({
		icons: [],
		title: '',
		price: undefined,
		currency: undefined
	})
	const chachedUrlData = useRef<Record<string, ScrapData>>({})
	const scrap = useCallback(async (shareIntent: ShareIntent) => {

		if (shareIntent.type === 'weburl') {
			const url = shareIntent.webUrl
			if (url) {
				if (chachedUrlData.current[url]) {
					setParsedData(chachedUrlData.current[url])
				}
				fetch(`${apiUrl}/parse_url`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						},
						body: JSON.stringify({
							url,
						}),
					}
				)
					.then((response) => {
						console.log('remoteParse')
						return response.json()
					})
					.then(function (data) {
						chachedUrlData.current[url] = data
						setParsedData(data)
					})
					.catch((e) => {
						console.log('localParse', e)
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
									setParsedData(prev => {
										return {
											...prev,
											title: shareIntent.text?.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') as string
										}
									})
								} else {
									const parsedTitle = $('title').text()
									if (parsedTitle) {
										setParsedData(prev => {
											return {
												...prev,
												title: parsedTitle
											}
										})
									}
								}

								//parse icons
								const parsedIcons: {
									href: string,
									sizes: number | null,
								}[] = []
								$('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], img').each((_, el) => {
									const href = el.tagName === 'link' ? $(el).attr('href') : $(el).attr('src')
									const sizes = $(el).attr('sizes')

									if (href) {
										parsedIcons.push({
											href: href.startsWith('/') ? new URL(href, url).href : href,
											sizes: sizes ? parseInt(sizes.split('x')[0], 10) : null,
										})
									}
								})
								setParsedData(prev => {
									return {
										...prev,
										icons: Array.from(new Set(parsedIcons.map(icon => icon.href)))
									}
								})
								console.log(Array.from(new Set(parsedIcons.map(icon => icon.href))))
							})
							.catch(function (err) {
								console.log('Failed to fetch page: ', err)
							})
					})
			}
		}
		if (shareIntent.type === 'file' && shareIntent.files && shareIntent.files[0].fileName) {
			setParsedData(prev => {
				return {
					...prev,
					title: shareIntent.files![0].fileName
				}
			})
		}
		if (shareIntent.type === "media" && shareIntent.files && shareIntent.files[0].fileName) {
			const fileName = shareIntent.files[0].fileName
			if (/.(jpg|jpeg|png|bmp)$/.test(fileName)) {
				setParsedData(prev => {
					return {
						...prev,
						icons: [shareIntent.files![0].path]
					}
				})
			}
		}
	}, [])
	return { scrap, parsedData }
}

export default useScrap