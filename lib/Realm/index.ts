import { createRealmContext } from '@realm/react'
import { Item } from './models/Item'

const config: Realm.Configuration = {
	schema: [Item],
	schemaVersion: 1,
	deleteRealmIfMigrationNeeded: true
}

export const RealmContext = createRealmContext(config)