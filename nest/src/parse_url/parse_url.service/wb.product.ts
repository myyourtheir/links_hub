const StealthPlugin = require("puppeteer-extra-plugin-stealth")
import { HttpException, HttpStatus } from '@nestjs/common'
import puppeteer from 'puppeteer-extra'

puppeteer.use(StealthPlugin())

export const parseWbProduct = async (url: string) => {
	const titleSelector = `h1.product-page__title`
	const imageSelector = `img[data-link="{on 'load' ~onImgLoad}"]`
	const priceSelector = `ins.price-block__final-price.wallet`


	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
	try {
		const page = await browser.newPage()
		await page.goto(url)
		await page.waitForSelector(imageSelector)
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
		return data
	} catch (error) {
		console.error('Error:', error)
		browser.close()
		throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
	} finally {
		await browser.close()
	}
	// await browser.close()
}