import { View, Text } from 'react-native'
import React, { cloneElement, ReactElement, ReactNode } from 'react'
import { IconNode, LucideProps } from 'lucide-react-native'
import { useColorScheme } from '~/lib/useColorScheme'

export type StyledIconProps = {
	children: ReactElement<LucideProps>
}

const StyledIcon = ({ children }: StyledIconProps) => {
	const { colorScheme } = useColorScheme()
	return (
		<>
			{
				cloneElement(children, {
					color: children.props.color ? children.props.color : colorScheme == 'dark' ? 'white' : 'black'
				})
			}
		</>
	)
}

export default StyledIcon