import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopLayoutComponent from './(components)/TopLayoutComponent'

const links = [
	{
		id: 1,
	},
	{
		id: 2,
	},
	{
		id: 3,
	}
]


const HomeScreen = () => {
	const [orientationMode, setOrientationMode] = useState<'grid' | 'row'>('grid')
	const [refreshing, setRefreshing] = useState(false)
	return (
		<View className="bg-primary">
			<FlatList
				data={links}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Text>
						{item.id}
					</Text>
				)}
				ListHeaderComponent={() => (
					<TopLayoutComponent orientationMode={orientationMode} setOrientationMode={setOrientationMode} />
				)}
				ListEmptyComponent={() => (
					<View>
						<Text>
							No data
						</Text>
					</View>
				)}
			/>
		</View>
	)
}

export default HomeScreen