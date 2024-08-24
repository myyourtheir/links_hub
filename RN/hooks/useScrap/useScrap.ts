import { ShareIntent } from 'expo-share-intent'

import { useCallback, useRef, useState } from 'react'
import parseLocal from './parseLocal'

export type ScrapData = {
	icons: string[],
	title: string,
	price?: number,
	currency?: string
}
const apiUrl = 'https://linkshub.idropfiles.com'

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
						if (response.ok) {
							response.json().then(data => {
								chachedUrlData.current[url] = data
								setParsedData(data)
							})
								.catch(e => {
									parseLocal(shareIntent)
										.then(data => {
											setParsedData(data)
										})
										.catch(e => {
											console.log('localParseError', e)
										})
								})
						}
						else {
							parseLocal(shareIntent)
								.then(data => {
									setParsedData(data)
								})
								.catch(e => {
									console.log('localParseError', e)
								})
						}
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
		return parsedData
	}, [])
	return { scrap, parsedData }
}

export default useScrap