
import { HttpException, HttpStatus } from '@nestjs/common'
import { Browser } from 'puppeteer'

function youtube_parse_id(url: string) {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
	var match = url.match(regExp)
	return (match && match[7].length == 11) ? match[7] : false
}

export const parseYoutubeVideo = async (url: string, browser: Browser) => {
	const page = await browser.newPage()
	try {
		await page.goto(url, { waitUntil: 'load', timeout: 0 })
		const title = await page.title()

		console.log(title)
		const videoId = youtube_parse_id(url)
		if (!videoId) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
		await page.close()
		return {
			// `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
			icons: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
			title,
			price: null,
			currency: null
		}
	} catch (error) {
		await page.close()
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	}
}