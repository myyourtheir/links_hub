import { HttpException, HttpStatus } from '@nestjs/common'
import { Browser } from 'puppeteer'

export const parseWbProduct = async (url: string, browser: Browser) => {
	const titleSelector = `h1.product-page__title`
	const imageSelector = `img[data-link="{on 'load' ~onImgLoad}"]`
	const priceSelector = `ins.price-block__final-price.wallet`

	const page = await browser.newPage()
	try {
		await page.goto(url, { waitUntil: 'load', timeout: 3000 })
		await page.waitForSelector(imageSelector, { timeout: 3000 })
		const data = await page.evaluate((titleSelector, imageSelector, priceSelector) => {
			const titleElement = document.querySelector(titleSelector) as HTMLElement
			const title = titleElement.innerText

			const priceString = document.querySelector(priceSelector) as HTMLElement
			const currency = priceString.innerText[priceString.innerText.length - 1]
			const price = priceString.innerText.replace(/[^0-9]/g, '')

			const images = document.querySelectorAll(imageSelector) as NodeListOf<HTMLImageElement>
			const imageSrcs = Array.from(images).map(img => img.src)
			return {
				title,
				icons: [...imageSrcs],
				price,
				currency
			}
		}, titleSelector, imageSelector, priceSelector)
		await page.close()
		return data
	} catch (error) {
		await page.close()
		console.error('Error:', error)
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	}
	// await browser.close()
}