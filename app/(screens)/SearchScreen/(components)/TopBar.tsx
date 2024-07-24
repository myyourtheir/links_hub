import { View } from 'react-native'
import React, { useState } from 'react'
import TopContent from '~/components/TopContent'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import StyledIcon from '~/components/StyledIcon'
import { Search } from 'lucide-react-native'
import { Input } from '~/components/ui/input'

type SearchBarProps = {
	searchText: string,
	setSearchText: React.Dispatch<React.SetStateAction<string>>
}

const TopBar = ({ searchText, setSearchText }: SearchBarProps) => {
	return (
		<TopContent className='flex-col justify-start ' withBack>
			<View className='flex-row flex-1 justify-between w-full gap-4 ml-4'>
				<Input
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