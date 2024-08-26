import { SelectorsApiResponse } from '.'
import { apiUrl } from '../../config'
import { ScrapData } from '../../useScrap'
import * as cheerio from 'cheerio'

const avitoParser = async (url: string): Promise<ScrapData> => {
	try {
		// const apiResponse = await fetch(`${apiUrl}/selectors/avito`)
		// const selectors = await apiResponse.json() as SelectorsApiResponse
		const selectors = {
			titleSelector: 'h1[itemprop="name"]',
			imageSelector: 'img',
			priceSelector: 'span[itemprop="price"]',
			currencySelector: null,
		}
		const newUrl = new URL(url)
		const avitoResponse = await fetch(`https://${newUrl.hostname}${newUrl.pathname}`, {})
		const html = await avitoResponse.text()
		const $ = cheerio.load(html)
		const title = $('title').text()
		// const title = $(selectors.titleSelector).text()
		const images = $(selectors.imageSelector) as cheerio.Cheerio<cheerio.Element>
		const imageSrcs = Array.from(images).map(img => img.attribs.src.replace(/c50/, 'c1000'))
		const priceString = $(selectors.priceSelector).text()
		console.log(priceString)
		if (!priceString) {
			throw new Error('Не удалось определить цену avito')
		}
		const currency = priceString[priceString.length - 1]
		const price = Number(priceString?.replace(/[^0-9]/g, ''))
		console.log(price)
		return {
			title,
			icons: [...imageSrcs],
			price,
			currency
		}
	} catch (error) {
		console.error('Error:', error)
		throw new Error('Не удалось распарсить страницу avito')
	}
}

export default avitoParser