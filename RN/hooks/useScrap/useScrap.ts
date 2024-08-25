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
	const chachedUrlData = useRef<Record<string, ScrapData>>({})
	const scrap = useCallback(async (shareIntent: ShareIntent) => {

		if (shareIntent.type === 'weburl') {
			const url = shareIntent.webUrl
			if (url) {
				if (chachedUrlData.current[url]) {
					//setParsedData(chachedUrlData.current[url])
					return chachedUrlData.current[url]
				}
				const response = await fetch(`${apiUrl}/parse_url`,
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
				if (response.ok) {
					try {
						const data = await response.json()
						chachedUrlData.current[url] = data
						console.log(data)
						//setParsedData(data)
						return data
					} catch (e) {
						try {
							const data = await parseLocal(shareIntent)
							parseLocal(shareIntent)
							//setParsedData(data)
							return data

						} catch (e) {
							console.log('localParseError', e)
						}
					}
				}
				else {
					try {
						const data = await parseLocal(shareIntent)
						return data
					} catch (e) {
						console.log('localParseError', e)
					}
				}
			}
		}
		if (shareIntent.type === 'file' && shareIntent.files && shareIntent.files[0].fileName) {
			return {
				icons: [],
				title: shareIntent.files![0].fileName,
				price: undefined,
				currency: undefined
			}
		}
		if (shareIntent.type === "media" && shareIntent.files && shareIntent.files[0].fileName) {
			const fileName = shareIntent.files[0].fileName
			if (/.(jpg|jpeg|png|bmp)$/.test(fileName)) {

				return {
					icons: [shareIntent.files![0].path],
					title: '',
					price: undefined,
					currency: undefined
				}
			}
		}
		throw new Error('Не удалось определить тип файла')
	}, [])
	return { scrap }
}

export default useScrap