import { ItemType } from '@/types/itemType'
import { Realm } from '@realm/react'
import { ObjectSchema, BSON, index } from 'realm'

export class Item extends Realm.Object<Item> {
	_id: BSON.ObjectID = new BSON.ObjectID();
	title!: string
	url?: string
	image?: string
	price?: number
	currency?: string
	type!: 'link' | 'folder'
	parent?: Item['_id']
	children?: Item['_id']
	createdTime: Date = new Date()
	updatedTime: Date = new Date()

	static schema: ObjectSchema = {
		name: 'Item',
		properties: {
			_id: { type: 'objectId', default: () => new BSON.ObjectID },
			title: { type: 'string', indexed: 'full-text' },
			url: { type: 'string', optional: true },
			image: { type: 'string', optional: true },
			price: { type: 'float', optional: true },
			currency: { type: 'string', optional: true },
			type: { type: 'string' },
			parent: 'Item',
			children: 'Item[]',
			createdTime: { type: 'int', default: () => new Date() },
			updatedTime: { type: 'int', default: () => new Date() },
		},
		primaryKey: '_id'
	}
}