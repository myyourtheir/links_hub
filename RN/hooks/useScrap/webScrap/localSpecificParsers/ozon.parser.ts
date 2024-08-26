import { SelectorsApiResponse } from '.'
import { apiUrl } from '../../config'
import { ScrapData } from '../../useScrap'
import * as cheerio from 'cheerio'

const ozonParser = async (url: string): Promise<ScrapData> => {
	try {
		const apiResponse = await fetch(`${apiUrl}/selectors/ozon`)
		const selectors = await apiResponse.json() as SelectorsApiResponse
		const ozonResponse = await fetch(url)
		const html = await ozonResponse.text()
		const $ = cheerio.load(html)
		const title = $('title').text()
		// const title = $(selectors.titleSelector).text()
		const images = $(selectors.imageSelector) as cheerio.Cheerio<cheerio.Element>
		const imageSrcs = Array.from(images).map(img => img.attribs.src.replace(/c50/, 'c1000'))
		const priceString = $(selectors.priceSelector).text()
		const currency = priceString[priceString.length - 1]
		const price = Number(priceString.replace(/[^0-9]/g, ''))
		console.log(price)
		return {
			title,
			icons: [...imageSrcs],
			price,
			currency
		}
	} catch (error) {
		console.error('Error:', error)
		throw new Error('Не удалось распарсить страницу ozon')
	}
}
export default ozonParser