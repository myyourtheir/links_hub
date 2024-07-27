import { router } from 'expo-router'
import { z } from 'zod'
import { Item } from '~/lib/Realm/models/Item'
import FileViewer from "react-native-file-viewer"

const handleItemClick = (item: Item) => {

	if (item.type === 'folder') {
		router.push({ pathname: '/HomeScreen/[parentId]', params: { parentId: item._id.toString() } })
	}

	if (item.type === 'link') {
		const zodSchema = z.string().url()

		if (item.url && zodSchema.parse(item.url)) {
			console.log('open link', item.url)
			try {
				router.push(item.url)
			} catch (e) {
				console.log('error while open link', e)
			}
		}
		else {
			throw new Error('No link in item')
		}
	}
	if (item.type === 'media') {
		if (!item.url) {
			throw new Error('No link in item')
		}
		FileViewer.open(item.url, { showOpenWithDialog: true })
	}
}
export default handleItemClick