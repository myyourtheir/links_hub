import { View, Text, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import useGetCurrentPath from '@/hooks/useGetCurrentPath'
import { BSON } from 'realm'
import { Link } from 'expo-router'
import StyledText from '@/components/StyledText'

const ScrollPathArea = ({ parentId }: { parentId: string }) => {

	const { pathArray } = useGetCurrentPath({ currentParent: parentId != 'null' ? new BSON.ObjectId(parentId as string) : null })
	const scrollViewRef = useRef<ScrollView>(null)

	return (
		<ScrollView
			horizontal
			ref={scrollViewRef}
			showsHorizontalScrollIndicator={false}
			onContentSizeChange={() => { scrollViewRef.current?.scrollToEnd({ animated: true }) }}
		>
			{pathArray.map(item =>
				<Link key={item?._id.toString()} href={{ pathname: '/HomeScreen/[parentId]', params: { parentId: item?._id != null ? item?._id?.toString() : null } }}>
					<StyledText additionClassName=''>{' > ' + item?.title}</StyledText>
				</Link>
			)}
		</ScrollView>
	)
}

export default ScrollPathArea