import { Browser } from 'puppeteer'
import extractUrl from './utils/extractUrl'
import { HttpException, HttpStatus } from '@nestjs/common'


export const parseDefault = async (url: string, browser: Browser) => {

	const imageSelector = `img`

	console.log('defaultParser')
	try {
		const page = await browser.newPage()
		await page.goto(url)
		await page.waitForSelector(imageSelector)
		const title = await page.title()

		const data = await page.evaluate(() => {
			const icons = document.querySelectorAll(`link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]`) as NodeListOf<HTMLLinkElement>
			const images = document.querySelectorAll(`img`) as NodeListOf<HTMLImageElement>
			const iconsSrcs = Array.from(icons).map(icon => icon.href)
			const imageSrcs = Array.from(images).map(img => img.src)
			console.log(iconsSrcs)
			return {
				icons: [...imageSrcs, ...iconsSrcs],
				price: null,
				currensy: null,
			}
		})
		await page.close()
		console.log(data.icons.length)
		for (const image of data.icons) {
			const nPage = await browser.newPage()
			await nPage.goto(image)
		}
		const preparedIcons = data.icons.map(icon => extractUrl(icon, url))
		// await browser.close()
		return {
			...data,
			icons: preparedIcons,
			title
		}
	}
	catch (error) {
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	}
}