import { ScrollView } from 'react-native'
import React, { useRef } from 'react'
import useGetCurrentPath from '~/hooks/useGetCurrentPath'
import { BSON } from 'realm'
import { Link, useGlobalSearchParams } from 'expo-router'
import StyledIcon from '~/components/StyledIcon'
import { House } from 'lucide-react-native'
import { Text } from '~/components/ui/text'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'

const ScrollPathArea = ({ parentId }: { parentId: string }) => {
	const { pathArray } = useGetCurrentPath({ currentParent: parentId !== 'null' ? new BSON.ObjectId(parentId as string) : null })
	const scrollViewRef = useRef<ScrollView>(null)
	const { globalDispatch } = useGlobalContext()
	const { addIntent } = useGlobalSearchParams()
	return (
		<ScrollView
			horizontal
			ref={scrollViewRef}
			showsHorizontalScrollIndicator={false}
			onContentSizeChange={() => { scrollViewRef.current?.scrollToEnd({ animated: true }) }}
		>
			{pathArray.map(item => {
				if (item == null) {
					return (
						<Link
							key={'home'}
							href={
								addIntent === 'true'
									? {
										pathname: '/AddingIntentScreen/SelectPath/[parentId]', params: {
											parentId: 'null',
											addIntent: 'true'
										}
									}
									: { pathname: '/HomeScreen/[parentId]', params: { parentId: 'null' } }}
						>
							<StyledIcon>
								<House />
							</StyledIcon>
						</Link>
					)
				} else {
					return (
						<Link
							key={item?._id.toString()}
							href={
								addIntent === 'true'
									? {
										pathname: '/AddingIntentScreen/SelectPath/[parentId]', params: {
											parentId: item._id.toString(),
											addIntent: 'true'
										}
									}
									: { pathname: '/HomeScreen/[parentId]', params: { parentId: item?._id?.toString() } }
							}
						>
							<Text>{'   >   '}</Text>
							<Text className=''>{item?.title}</Text>
						</Link>
					)
				}
			}
			)}
		</ScrollView>
	)
}

export default ScrollPathArea