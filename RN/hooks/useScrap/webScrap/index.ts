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
	throw new Error('Не сработал парсер веб-страницы')
}

export default webScrap