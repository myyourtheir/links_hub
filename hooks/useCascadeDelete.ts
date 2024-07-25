import { BSON } from 'realm'
import { RealmContext } from '~/lib/Realm'
import { Item } from '~/lib/Realm/models/Item'
const { useRealm, useQuery, useObject } = RealmContext
import { Realm } from '@realm/react'
export function useCascadeDelete() {
	const realm = useRealm()

	const cascadeDelete = (realm: Realm, itemId: BSON.ObjectId) => {
		const itemsToDelete: Item[] = []

		const recursiveAdd = (itemId: BSON.ObjectId) => {
			const itemToDelete = realm.objectForPrimaryKey<Item>('Item', itemId)
			if (itemToDelete) {
				itemsToDelete.push(itemToDelete)
				const childItems = realm.objects<Item>('Item').filtered('parentId == $0', itemId)
				childItems.forEach(childItem => {
					recursiveAdd(childItem._id)
				})
			}
		}
		recursiveAdd(itemId)
		realm.write(() => {
			realm.delete(itemsToDelete)
		})
	}
	const deleteItemWithCascade = (itemId: BSON.ObjectID) => {
		cascadeDelete(realm, itemId)
	}

	return { deleteItemWithCascade }
}