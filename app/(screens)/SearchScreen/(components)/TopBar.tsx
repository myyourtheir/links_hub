import { TextInput, View } from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import TopContent from '~/components/TopContent'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import StyledIcon from '~/components/StyledIcon'
import { Search } from 'lucide-react-native'
import { Input } from '~/components/ui/input'
import { router, useFocusEffect } from 'expo-router'
import useFocus from '~/hooks/useFocus'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'

type SearchBarProps = {
	searchText: string,
	setSearchText: React.Dispatch<React.SetStateAction<string>>
}

const TopBar = ({ searchText, setSearchText }: SearchBarProps) => {
	const inputRef = useRef<TextInput>(null)
	const { globalState: { folderToSetIn } } = useGlobalContext()
	useFocus({ ref: inputRef })
	return (
		<TopContent className='flex-col justify-start '
			withBack
			onBackPress={() => {
				router.replace({
					pathname: '/HomeScreen/[parentId]',
					params: {
						parentId: folderToSetIn ? folderToSetIn?.toString() : 'null'
					}
				})
			}}
		>
			<View className='flex-row flex-1 justify-between w-full gap-4 ml-4'>
				<Input
					ref={inputRef}
					className='flex-1'
					value={searchText}
					onChangeText={setSearchText}
				/>
				<Button
					variant={'ghost'}
					onPress={() => {
						return
					}}
				>
					<StyledIcon>
						<Search />
					</StyledIcon>
				</Button>
			</View>
		</TopContent>
	)
}

export default TopBar