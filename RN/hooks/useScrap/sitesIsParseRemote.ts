const isParseRemote = (url: string): boolean => {
	if (url.includes('market.yandex.ru/product')
		|| url.includes('market.yandex.ru/cc')
		|| url.includes('wildberries.ru/catalog')
		|| url.includes('youtube.com/watch')) {
		return true
	}
	return false
}