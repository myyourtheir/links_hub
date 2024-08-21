import { HttpException, HttpStatus } from '@nestjs/common'
import puppeteer from 'puppeteer-extra'
const StealthPlugin = require("puppeteer-extra-plugin-stealth")

puppeteer.use(StealthPlugin())

const imageSelector = 'img.mk3_27.b916-a'
const priceSelector = '.o1m_27.mo2_27.o5m_27'
const titleSelector = '.m8o_27.tsHeadline550Medium'

export const parseOzonProduct = async (url: string) => {
	console.log('ozonParser')

	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
	try {
		const page = await browser.newPage()
		await page.goto(url)

		await page.waitForSelector(imageSelector)
		await page.waitForSelector(priceSelector)
		await page.waitForSelector(titleSelector)

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
		for (const image of data.icons) {
			const nPage = await browser.newPage()
			await nPage.goto(image)
		}
		// await browser.close()
		return data
	} catch (error) {
		console.error('Error:', error)
		browser.close()
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	} finally {
		await browser.close()
	}
}