import avitoParser from './avito.parser'
import ozonParser from './ozon.parser'
export type SelectorsApiResponse = {
	titleSelector: string,
	imageSelector: string,
	priceSelector: string,
	currencySelector: string
}


const localParseSpecific = async (url: string) => {
	switch (true) {
		case url.includes('ozon.ru/product') || url.includes('ozon.ru/t'):
			return ozonParser(url)
		// case /.*avito.*_\d{10}/.test(url):
		// 	return avitoParser(url)
		default:
			return false
	}
}
export default localParseSpecific