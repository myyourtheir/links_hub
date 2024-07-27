import { Realm } from '@realm/react'
import { ObjectSchema, BSON } from 'realm'
import 'react-native-get-random-values'


export class Item extends Realm.Object<Item> {
	_id!: BSON.ObjectID
	title!: string
	description?: string
	url?: string
	image?: string
	price?: number
	currency?: string
	type!: 'link' | 'folder' | 'empty' | 'media'
	parentId?: Item['_id'] | null
	createdTime!: Date
	updatedTime!: Date

	static schema: ObjectSchema = {
		name: 'Item',
		properties: {
			_id: { type: 'objectId', default: () => new BSON.ObjectID },
			title: { type: 'string', indexed: 'full-text' },
			description: { type: 'string', default: '', indexed: 'full-text' },
			url: { type: 'string', optional: true },
			image: { type: 'string', optional: true },
			price: { type: 'float', optional: true },
			currency: { type: 'string', optional: true },
			type: { type: 'string' },
			parentId: { type: 'objectId', optional: true },
			createdTime: { type: 'date', default: () => new Date() },
			updatedTime: { type: 'date', default: () => new Date() },
		},
		primaryKey: '_id'
	}
}

