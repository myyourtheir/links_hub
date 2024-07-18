import { View, Text } from 'react-native'
import React, { JSXElementConstructor, ReactElement } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
import { useColorScheme } from '~/lib/useColorScheme'

const StyledDropdown: <T>(
	props: DropdownProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null = (props) => {
	const { colorScheme } = useColorScheme()

	return (
		<Dropdown
			style={{
				borderBottomWidth: 1,
				borderColor: colorScheme === 'dark' ? 'white' : 'black',
				borderRadius: 6,
				width: '50%'
			}}
			containerStyle={{
				borderRadius: 6,
			}}
			selectedTextStyle={{
				paddingHorizontal: 16,
				paddingVertical: 2,
				fontSize: 16,
				lineHeight: 24,
				color: colorScheme === 'dark' ? 'white' : 'black',
			}}
			{...props}
		/>
	)
}

export default StyledDropdown