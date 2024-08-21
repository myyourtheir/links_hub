import { HttpException, HttpStatus } from '@nestjs/common'
import puppeteer from 'puppeteer-extra'
const StealthPlugin = require("puppeteer-extra-plugin-stealth")

puppeteer.use(StealthPlugin())

export const parseYaProduct = async (url: string) => {

	const imageSelector = `li[role="tab"] button img`
	const titleSelector = `h1[data-additional-zone="title"]`
	const priceSelector = `h3.Jdxhz[data-auto="snippet-price-current"]`
	const currencySelector = `span._2MxwE`

	console.log('yaParser')
	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
	try {
		const page = await browser.newPage()
		await page.goto(url)
		await page.waitForSelector(`li[role="tab"] button img`)

		const data = await page.evaluate((titleSelector, imageSelector, priceSelector, currencySelector) => {
			const titleElement = document.querySelector(titleSelector) as HTMLHeadingElement
			const title = titleElement.innerText

			const images = document.querySelectorAll(imageSelector) as NodeListOf<HTMLImageElement>
			const imageSrcs = Array.from(images).map(img => img.src.replace(/90x120/, '450x600'))

			const priceElement = document.querySelector(priceSelector) as HTMLHeadingElement
			const price = priceElement.innerText.replace(/[^0-9]/g, '')

			const currencyElement = document.querySelector(currencySelector) as HTMLHeadingElement
			const currency = currencyElement.innerText
			return {
				title,
				icons: [...imageSrcs],
				price,
				currency
			}
		}, titleSelector, imageSelector, priceSelector, currencySelector)
		await page.close()
		// console.log(images)
		console.log(data.icons.length)
		for (const image of data.icons) {
			const nPage = await browser.newPage()
			await nPage.goto(image)
		}
		return data
	} catch (error) {
		browser.close()
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	} finally {
		await browser.close()
	}
	// await browser.close()
}