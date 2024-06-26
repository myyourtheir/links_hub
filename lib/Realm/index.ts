import { createRealmContext } from '@realm/react'
import { Item } from './Item'

export const ItemRealmContext = createRealmContext({
	schema: [Item]
})