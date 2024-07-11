import { RealmContext } from '@/lib/Realm'
import { Item } from '@/lib/Realm/models/Item'
const { useObject } = RealmContext


const useGetCurrentPath = ({ currentParent }: { currentParent: Item['_id'] | null }) => {

	let currentPath: string

	if (currentParent === null) currentPath = ''
	else {
		console.log('work')
		let pathArray = []
		let currentFolder = useObject(Item, currentParent)
		console.log(currentFolder)
		while (currentFolder?.parentId !== null) {
			pathArray.unshift(currentFolder?.title)
			currentFolder = useObject(Item, currentFolder?.parentId)
		}
		currentFolder = useObject(Item, currentFolder._id)
		pathArray.unshift(currentFolder?.title)
		currentPath = pathArray.join('>')
	}


	return [currentPath]
}

export default useGetCurrentPath