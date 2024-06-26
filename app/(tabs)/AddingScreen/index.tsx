import { View, Text, TextInput, TouchableOpacity, Button, Pressable } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
// import { Dropdown } from 'react-native-element-dropdown'
import TopContent from '@/components/TopContent'
import StyledTextInput from '@/components/StyledTextInput'
import BottomRoundButton from '@/components/ItemsFlatList/BottomRoundButton'
import { Plus } from 'lucide-react-native'


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
		<View className='h-[93vh]'>
			<TopContent>
				<TextInput
					className=' text-xl font-medium px-2 py-1 text-slate-600'
					placeholder='Название'
				/>
			</TopContent>
			<View className='gap-y-3'>
				<View className='w-full pt-4 px-4  gap-3 justify-center'>
					<Text className=' text-base'>
						Тип:
					</Text>
					<Dropdown
						style={{
							borderWidth: 1,
							borderRadius: 6,
							width: '50%'
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
							paddingVertical: 4,
							fontSize: 16,
							lineHeight: 24
						}}
					/>
				</View>
				<View className='w-full pt-4 px-4 gap-3 justify-center'>
					<Text className='text-base'>
						Ссылка:
					</Text>
					<StyledTextInput />
				</View>
				<View className='w-full pt-4 px-4 gap-3 justify-center'>
					<Text className='text-base'>
						Путь:
					</Text>
					<StyledTextInput />
				</View>
			</View>
			<BottomRoundButton>
				<Plus color={'white'} size={30} />
			</BottomRoundButton>
		</View>
	)
}

export default AddingScreen