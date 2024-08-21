import { HttpException, HttpStatus } from '@nestjs/common'
import { Browser } from 'puppeteer'

export const parseYaProduct = async (url: string, browser: Browser) => {

	const imageSelector = `li[role="tab"] button img`
	const titleSelector = `h1[data-additional-zone="title"]`
	const priceSelector = `h3.Jdxhz[data-auto="snippet-price-current"]`
	const currencySelector = `span._2MxwE`

	console.log('yaParser')

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
		return data

	} catch (error) {
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	}
	// await browser.close()
}