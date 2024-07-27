import { useLayoutEffect, useState } from 'react'
const useParseUrl = (url: string | null) => {
	const [parsedTitle, setParsedTitle] = useState('')
	useLayoutEffect(() => {
		if (url) {
			fetch(url)
				.then(function (response) {
					return response.text()
				})
				.then(function (html) {
					const titles = html.match('<title>.+</title>')
					if (titles && titles?.length !== 0) {
						const titleTag = titles[0]
						const title = titleTag.replace(/<\/?title>/g, '')
						setParsedTitle(title)
					}
				})
				.catch(function (err) {
					console.log('Failed to fetch page: ', err)
				})
		}
	}, [url])
	return { parsedTitle }
}

export default useParseUrl