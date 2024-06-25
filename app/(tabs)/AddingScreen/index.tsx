import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import TopContent from '@/components/TopContent'

const itemTypes = [
	{
		label: 'Ссылка',
		value: 'link'
	},
	{
		label: 'Папка',
		value: 'folder'
	},
]

const AddingScreen = () => {
	return (
		<View >
			<TopContent>
				<TextInput
					className=' text-xl font-medium px-2 py-1 '
					placeholder='Название'
				/>
			</TopContent>
			<View className='w-full mt-4 px-4'>
				<Dropdown
					style={{
						borderWidth: 1,
						borderRadius: 6
					}}
					data={itemTypes}
					labelField={'label'}
					valueField={'value'}
					onChange={(e) => { return }}
					value={'folder'}
					containerStyle={{
						borderRadius: 6,
					}}
					selectedTextStyle={{
						paddingHorizontal: 8,
						paddingVertical: 4
					}}
				/>
			</View>
		</View>
	)
}

export default AddingScreen