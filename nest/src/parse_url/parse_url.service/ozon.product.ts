import { HttpException, HttpStatus } from '@nestjs/common'
import { Browser } from 'puppeteer'

const imageSelector = 'img.mk3_27.b916-a'
const priceSelector = '.o1m_27.mo2_27.o5m_27'
const titleSelector = '.m8o_27.tsHeadline550Medium'

export const parseOzonProduct = async (url: string, browser: Browser) => {
	console.log('ozonParser')

	const page = await browser.newPage()
	try {
		await page.goto(url, { waitUntil: 'load', timeout: 3000 })

		await page.waitForSelector(imageSelector, { timeout: 3000 })
		await page.waitForSelector(priceSelector, { timeout: 3000 })
		await page.waitForSelector(titleSelector, { timeout: 3000 })

		await page.waitForSelector(imageSelector)
		const data = await page.evaluate((imageSelector, priceSelector, titleSelector) => {
			const titleElement = document.querySelector(titleSelector) as HTMLElement
			const title = titleElement.innerText

			const images = document.querySelectorAll(imageSelector) as NodeListOf<HTMLImageElement>
			const imageSrcs = Array.from(images).map(img => img.src.replace(/wc50/, 'wc1000'))

			const priceString = document.querySelector(priceSelector) as HTMLElement
			const currency = priceString.innerText[priceString.innerText.length - 1]
			const price = priceString.innerText.replace(/[^0-9]/g, '')

			return {
				title,
				icons: [...imageSrcs],
				price,
				currency
			}
		}, imageSelector, priceSelector, titleSelector)
		await page.close()

		return data
	} catch (error) {
		await page.close()
		console.error('Error:', error)

		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	}
}