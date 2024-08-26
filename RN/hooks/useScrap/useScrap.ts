import { ShareIntent } from 'expo-share-intent'
import { useCallback, useRef, useState } from 'react'
import webScrap from './webScrap'

export type ScrapData = {
	icons: string[],
	title: string,
	price?: number,
	currency?: string
}



const useScrap = () => {
	const scrap = useCallback(async (shareIntent: ShareIntent): Promise<ScrapData> => {
		if (shareIntent.type === 'weburl') {
			return webScrap(shareIntent)
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