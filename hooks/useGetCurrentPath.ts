import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
const { useObject } = RealmContext


const useGetCurrentPath = ({ currentParent }: { currentParent: Item['_id'] | null }) => {

	let currentPathText: string
	let pathArray: (Item | null)[] = []
	if (currentParent === null) currentPathText = '>'
	else {
		let currentFolder = useObject(Item, currentParent)
		while (currentFolder?.parentId !== null) {
			pathArray.unshift(currentFolder)
			currentFolder = useObject(Item, currentFolder?.parentId)
		}
		currentFolder = useObject(Item, currentFolder._id)
		pathArray.unshift(currentFolder)
		currentPathText = '> ' + pathArray.map(item => item?.title).join(' > ')
	}
	if (currentParent !== null) pathArray.unshift(null)


	return { currentPathText, pathArray }
}

export default useGetCurrentPath