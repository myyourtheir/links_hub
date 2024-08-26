import { apiUrl } from '../config'
import localParseSpecific from './localSpecificParsers'
import { ScrapData } from '../useScrap'
import { ShareIntent } from 'expo-share-intent'
import parseLocal from './parseLocal'

const cachedUrlData: Record<string, ScrapData> = {}
const webScrap = async (shareIntent: ShareIntent): Promise<ScrapData> => {
	const url = shareIntent.webUrl
	if (url) {
		if (cachedUrlData[url]) {
			return cachedUrlData[url]
		}
		try {
			const specificLocalData = await localParseSpecific(url)
			if (specificLocalData) {
				cachedUrlData[url] = specificLocalData
				console.log('localParseSuccess', specificLocalData)
				return specificLocalData
			}
		} catch (e) {
			console.log('localParseError', e)
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
				cachedUrlData[url] = data
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
	throw new Error('Не сработал паррсер веб-страницы')
}

export default webScrap