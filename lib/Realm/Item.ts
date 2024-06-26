import { ItemType } from '@/types/itemType'
import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

export class Item extends Realm.Object<Item> {
	id!: string
	title!: string
	url!: string
	image?: string
	type!: 'link' | 'folder'
	parentId?: Item['id']
	childrenId?: Item['id']
	createDate!: Date

	static schema: ObjectSchema = {
		name: 'Item',
		properties: {
			id: { type: 'string', indexed: true, default: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}` },
			title: { type: 'string' },
			url: 'string',
			image: 'string?',
			type: 'string',
			parentId: 'string',
			childrenId: 'string',
			createDate: { type: 'string', default: new Date() }
		},
		primaryKey: 'id'
	};
}