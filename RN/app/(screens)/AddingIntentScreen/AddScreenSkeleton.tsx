import { ScrollView, View } from 'react-native'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import TopContent from '~/components/TopContent'
import { FormItem, FormLabel } from '~/components/ui/Form'
import { Button } from '~/components/ui/button'
import StyledIcon from '~/components/StyledIcon'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const AddScreenSkeleton = () => {
	return (
		<ScrollView >
			<View className='px-4 items-start w-full justify-start flex-1 gap-y-8 h-full  my-4'>


				{/* title */}
				<View className='flex-row items-center justify-start w-full gap-x-4 mb-4 mt-4'>
					<Skeleton className={'w-10 h-10'} />
					<Skeleton className={'flex-1 h-10'} />
				</View>
				<LikeFormItemSkeleton />
				<LikeFormItemSkeleton />
				<LikeFormItemSkeleton className={'h-20'} />
				<LikeFormItemSkeleton />

				{/* image picker */}
				<FormItem className='p-0 m-0 w-full gap-y-4' >
					<Skeleton className='h-8 w-20 ' />

					<View className='items-center gap-y-10'>
						<View className='flex-row items-center justify-between w-full'>
							<Skeleton className={`h-8 w-40`} />
							<Skeleton className={`h-9 w-16 rounded-full`} />
						</View>
						<Skeleton className={`h-40 w-40`} />
					</View>
				</FormItem>
				<Skeleton className='h-12 w-full' />
			</View>
		</ScrollView>


	)
}

const LikeFormItemSkeleton = ({ className }: { className?: string }) => {
	return (
		<FormItem className='p-0 m-0 w-full gap-y-4' >

			<Skeleton className='h-8 w-20 ' />
			<Skeleton className={cn(`h-8 w-full`, className)} />
		</FormItem>
	)

}

export default AddScreenSkeleton