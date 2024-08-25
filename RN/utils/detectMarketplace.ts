const detectMarketplace = (url: string): boolean => {
	if (url.includes('market.yandex.ru/product')
		|| url.includes('market.yandex.ru/cc')
		|| url.includes('wildberries.ru/catalog')
		|| url.includes('ozon.ru/product') || url.includes('ozon.ru/t')) {
		return true
	}
	return false
}

export default detectMarketplace