import { RealmContext } from '@/lib/Realm'
import { Item } from '@/lib/Realm/models/Item'
const { useObject } = RealmContext


const useGetCurrentPath = ({ currentParent }: { currentParent: Item['_id'] | null }) => {

	let currentPath: string

	if (currentParent === null) currentPath = ''
	else {
		let pathArray = []
		let currentFolder = useObject(Item, currentParent)
		while (currentFolder?.parent !== null && currentFolder?._id !== null) {
			pathArray.unshift(currentFolder?.title)
			currentFolder = useObject(Item, currentFolder?.parent)
		}
		currentPath = pathArray.join('>')
	}


	return [currentPath]
}

export default useGetCurrentPath