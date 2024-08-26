import { ShareIntent } from 'expo-share-intent'
import * as cheerio from 'cheerio'
import { ScrapData } from '../useScrap'
import localParseSpecific from './localSpecificParsers'


const parseLocal = async (shareIntent: ShareIntent) => {
	console.log('localParse')

	const url = shareIntent.webUrl
	const specificLocalData = await localParseSpecific(url!)
	if (specificLocalData) {
		console.log('localParseSuccess', specificLocalData)
		return specificLocalData
	} else {
		return simpleParse(shareIntent)
	}

}


export default parseLocal

const simpleParse = async (shareIntent: ShareIntent) => {
	let parsedData: ScrapData = {
		icons: [],
		title: '',
		price: undefined,
		currency: undefined
	}
	const response = await fetch(shareIntent.webUrl!,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'text/html',
			}
		}
	)
	const data = await response.text()
	const $ = cheerio.load(data)

	//parse title
	if (shareIntent?.text !== shareIntent.webUrl) {
		parsedData = {
			...parsedData,
			title: shareIntent.text?.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') as string
		}

	} else {
		const parsedTitle = $('title').text()
		if (parsedTitle) {
			parsedData = {
				...parsedData,
				title: parsedTitle
			}
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
				href: href.startsWith('/') ? new URL(href, shareIntent.webUrl!).href : href,
				sizes: sizes ? parseInt(sizes.split('x')[0], 10) : null,
			})
		}
	})
	parsedData = {
		...parsedData,
		icons: Array.from(new Set(parsedIcons.map(icon => icon.href)))
	}
	return parsedData
}