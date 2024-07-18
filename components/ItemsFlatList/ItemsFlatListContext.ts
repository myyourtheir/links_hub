import { Item } from '~/lib/Realm/models/Item'
import { createContext, useContext } from 'react'

type ItemsFlatListContextProps = {
	onItemClick: (item: Item) => void
}

export const ItemsFlatListContext = createContext<ItemsFlatListContextProps | null>(null)

export const useItemsFlatListContext = () => {
	const context = useContext(ItemsFlatListContext) as ItemsFlatListContextProps
	return context
}