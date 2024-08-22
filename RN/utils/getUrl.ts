import { ShareIntent } from 'expo-share-intent'

const getUrl = (shareIntent: ShareIntent) => {
	if (shareIntent.type == 'weburl') {
		return shareIntent.webUrl
	}
	if ((shareIntent.type == 'media' || shareIntent.type == 'file') && shareIntent.files) {
		return shareIntent.files[0].path
	}
	return 'null'
}

export default getUrl