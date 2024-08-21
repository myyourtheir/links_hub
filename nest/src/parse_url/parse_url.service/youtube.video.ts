
import { HttpException, HttpStatus } from '@nestjs/common'
import { Browser } from 'puppeteer'


export const parseYoutubeVideo = async (url: string, browser: Browser) => {
	try {
		const page = await browser.newPage()
		await page.goto(url, { waitUntil: 'load', timeout: 0 })
		const title = await page.title()

		const videoId = url.split('=')[1]
		console.log(videoId)
		return {
			// `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
			icons: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
			title,
			price: null,
			currency: null
		}
	} catch (error) {
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	}
}