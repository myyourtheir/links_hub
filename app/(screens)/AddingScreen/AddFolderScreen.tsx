import { View } from 'react-native'
import React from 'react'
import { Text } from '~/components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import BottomRoundButtonWrapper from '~/components/BottomRoundButtonWrapper'
import Plus from '~/lib/icons/Plus'
import TopContent from '~/components/TopContent'
import { Button } from '~/components/ui/button'
import StyledIcon from '~/components/StyledIcon'
import { ChevronLeft } from 'lucide-react-native'
import { Form, FormField, FormItem, FormLabel } from '~/components/ui/Form'
import { useForm } from 'react-hook-form'
import { Input } from '~/components/ui/input'
import { useTranslation } from 'react-i18next'

const AddFolderScreen = () => {
	const { parentId } = useLocalSearchParams()
	const { t } = useTranslation()
	const form = useForm()
	return (
		<BottomRoundButtonWrapper buttonIcon={
			<Plus />
		}>
			<Form {...form}>
				<TopContent className='mb-4' withBack backIconWrapperClassName='flex-row items-start justify-start'>
					<FormField
						name='title'
						render={(field) =>
							<FormItem className='self-center p-0 m-0'>
								<Input
									style={{
										fontSize: 24,
										lineHeight: 32,
									}}
									className=' border-0 '
									placeholder={t('addingTitle')}
									{...field}
								/>
							</FormItem>
						}
					/>
				</TopContent>
				<View className='px-4'>
					<FormField
						name='path'
						render={(field) =>
							<FormItem className='self-center p-0 m-0'>
								<Input
									className=' border-0 '
									placeholder={t('addingPath')}
									{...field}
								/>
							</FormItem>
						}
					/>
				</View>
			</Form>
		</BottomRoundButtonWrapper>
	)
}

export default AddFolderScreen