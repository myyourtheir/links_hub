import { ShareIntent } from 'expo-share-intent'
import * as cheerio from 'cheerio'

const scrap = async (shareIntent: ShareIntent) => {
	let icons: string[] = []
	let title = ''
	let price = undefined
	let currency = undefined
	const url = shareIntent.webUrl
	if (shareIntent.type === 'weburl') {
		if (url) {
			fetch(`${url}/parse_url`,
				{
					method: 'POST',
					body: JSON.stringify({
						url: url,
					}),
				}
			)
				.then((response) => {
					console.log(response)
					return response.json()
				})
				.then(function (data) {
					title = data.title
					price = data.price
					currency = data.currency
					icons = data.icons
				})
				.catch((e) => {
					console.log(e)
					fetch(url,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'text/html',
							}
						}
					)
						.then((response) => {
							return response.text()
						})
						.then(function (data) {
							const $ = cheerio.load(data)

							//parse title
							if (shareIntent?.text !== shareIntent.webUrl) {
								title = shareIntent.text?.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') as string
							} else {
								const parsedTitle = $('title').text()
								if (parsedTitle) {
									title = parsedTitle
								}
							}

							//parse icons
							const parsedIcons: {
								href: string,
								sizes: number | null,
							}[] = []
							$('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], img').each((_, el) => {
								const href = el.tagName === 'link' ? $(el).attr('href') : $(el).attr('src')
								const sizes = $(el).attr('sizes')

								if (href) {
									parsedIcons.push({
										href: href.startsWith('/') ? new URL(href, url).href : href,
										sizes: sizes ? parseInt(sizes.split('x')[0], 10) : null,
									})
								}
							})
							icons = Array.from(new Set(parsedIcons.map(icon => icon.href)))
							console.log(Array.from(new Set(parsedIcons.map(icon => icon.href))))
						})
						.catch(function (err) {
							console.log('Failed to fetch page: ', err)
						})
				})
		}
	}
	if (shareIntent.type === 'file' && shareIntent.files && shareIntent.files[0].fileName) {
		title = shareIntent.files[0].fileName
	}
	if (shareIntent.type === "media" && shareIntent.files && shareIntent.files[0].fileName) {
		const fileName = shareIntent.files[0].fileName
		if (/.(jpg|jpeg|png|bmp)$/.test(fileName)) {
			icons = [shareIntent.files[0].path]
		}
	}
	return { title, icons, price, currency }
}

export default scrap