var URL = require('url').URL
export function extractUrl(url: string, path: string) {
	const base = new URL(path).origin
	if (url.startsWith('/')) {
		return new URL(url, base).href
	}
	return url
}

export default extractUrl