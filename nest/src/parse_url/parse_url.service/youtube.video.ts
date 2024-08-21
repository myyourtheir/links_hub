
import { HttpException, HttpStatus } from '@nestjs/common'
import puppeteer from 'puppeteer-extra'
const StealthPlugin = require("puppeteer-extra-plugin-stealth")

puppeteer.use(StealthPlugin())

export const parseYoutubeVideo = async (url: string) => {
	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
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
		browser.close()
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	} finally {
		await browser.close()
	}
}