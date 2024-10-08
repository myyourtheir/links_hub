
import { HttpException, HttpStatus } from '@nestjs/common'
import puppeteer from 'puppeteer'
async function parseOther(url: string) {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
	const page = await browser.newPage()
	try {
		await page.goto(url, { waitUntil: 'load', timeout: 0 })
		console.log(url)
		const data = await page.evaluate(() => {
			const title = document.title
			const images = document.querySelectorAll('img')
			const imgUrls = Array.from(images).map(img => img.src)
			return { title, imgUrls }
		})
		return data
	} catch (error) {
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	} finally {
		await page.close()
	}
}
export default parseOther