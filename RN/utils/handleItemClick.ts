import { router } from 'expo-router'
import { z } from 'zod'
import { Item } from '~/lib/Realm/models/Item'
import FileViewer from "react-native-file-viewer"
import { RealmContext } from '~/lib/Realm'
const { useRealm } = RealmContext


const useHandleItemClick = () => {
	const realm = useRealm()
	const handleItemClick = (item: Item) => {

		if (item.type === 'folder') {
			router.push({ pathname: '/HomeScreen/[parentId]', params: { parentId: item._id.toString() } })
		}

		if (item.type === 'link') {
			realm.write(() => {
				item.updatedTime = new Date()
			})
			const zodSchema = z.string().url()

			if (item.url && zodSchema.parse(item.url)) {
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
			realm.write(() => {
				item.updatedTime = new Date()
			})
			if (!item.url) {
				throw new Error('No link in item')
			}
			FileViewer.open(item.url, { showOpenWithDialog: true })
		}
	}
	return { handleItemClick }
}
export default useHandleItemClick