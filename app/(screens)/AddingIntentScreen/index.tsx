// import { View } from 'react-native'
// import React from 'react'
// import { Text } from '~/components/ui/text'
// import { router, useLocalSearchParams } from 'expo-router'
// import BottomRoundButtonWrapper from '~/components/BottomRoundButtonWrapper'
// import Plus from '~/lib/icons/Plus'
// import TopContent from '~/components/TopContent'
// import { Button } from '~/components/ui/button'
// import StyledIcon from '~/components/StyledIcon'
// import { ChevronLeft } from 'lucide-react-native'
// import { Form, FormField, FormItem, FormLabel } from '~/components/ui/Form'
// import { useForm } from 'react-hook-form'
// import { Input } from '~/components/ui/input'
// import { useTranslation } from 'react-i18next'

// const AddFolderScreen = () => {
// 	const { parentId } = useLocalSearchParams()
// 	const { t } = useTranslation()
// 	const form = useForm()
// 	return (
// 		<BottomRoundButtonWrapper buttonIcon={
// 			<Plus />
// 		}>
// 			<Form {...form}>
// 				<TopContent className='mb-4' withBack backIconWrapperClassName='flex-row items-start justify-start'>
// 					<FormField
// 						name='title'
// 						render={(field) =>
// 							<FormItem className='self-center p-0 m-0'>
// 								<Input
// 									style={{
// 										fontSize: 24,
// 										lineHeight: 32,
// 									}}
// 									className=' border-0 '
// 									placeholder={t('addingTitle')}
// 									{...field}
// 								/>
// 							</FormItem>
// 						}
// 					/>
// 				</TopContent>
// 				<View className='px-4'>
// 					<FormField
// 						name='path'
// 						render={(field) =>
// 							<FormItem className='self-center p-0 m-0'>
// 								<Input
// 									className=' border-0 '
// 									placeholder={t('addingPath')}
// 									{...field}
// 								/>
// 							</FormItem>
// 						}
// 					/>
// 				</View>
// 			</Form>
// 		</BottomRoundButtonWrapper>
// 	)
// }

// export default AddFolderScreen

import { Button, Image, StyleSheet, Text, View } from "react-native"

import { useRouter } from "expo-router"
import { useShareIntentContext } from "expo-share-intent"

export default function ShareIntent() {
	const router = useRouter()
	const { hasShareIntent, shareIntent, error, resetShareIntent } =
		useShareIntentContext()

	return (
		<View style={styles.container}>

			{!hasShareIntent && <Text>No Share intent detected</Text>}
			{hasShareIntent && (
				<Text style={[styles.gap, { fontSize: 20 }]}>
					Congratz, a share intent value is available
				</Text>
			)}
			{!!shareIntent.text && <Text style={styles.gap}>{shareIntent.text}</Text>}
			{!!shareIntent.meta?.title && (
				<Text style={styles.gap}>{JSON.stringify(shareIntent.meta)}</Text>
			)}
			{shareIntent?.files?.map((file) => (
				<Image
					key={file.path}
					source={{ uri: file.path }}
					style={[styles.image, styles.gap]}
				/>
			))}
			{hasShareIntent && (
				<Button onPress={() => resetShareIntent()} title="Reset" />
			)}
			<Text style={[styles.error]}>{error}</Text>
			<Button onPress={() => router.replace("/")} title="Go home" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 75,
		height: 75,
		resizeMode: "contain",
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: "contain",
	},
	gap: {
		marginBottom: 20,
	},
	error: {
		color: "red",
	},
})