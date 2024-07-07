import { Item } from '@/lib/Realm/models/Item'
import { useGlobalContext } from '@/lib/store/GlobalContextProvider'
import { useObject } from '@realm/react'


const useGetCurrentPath = () => {
	const { currentFolder: currentParent } = useGlobalContext()
	let currentPath: string

	if (currentParent === null) currentPath = '/'
	else {
		let pathArray = []
		let currentFolder = useObject(Item, currentParent._id)
		while (currentFolder?.parent !== null && currentFolder?._id !== null) {
			pathArray.unshift(currentFolder?.title)
			currentFolder = useObject(Item, currentFolder?._id)
		}
		currentPath = pathArray.join('/') || '/'
	}


	return [currentPath]
}

export default useGetCurrentPath