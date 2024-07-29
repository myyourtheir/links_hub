import { View, Text } from 'react-native'
import React, { cloneElement, ReactElement, ReactNode } from 'react'
import { IconNode, LucideProps } from 'lucide-react-native'
import { useColorScheme } from '~/lib/useColorScheme'

export type StyledIconProps = {
	children: ReactElement<LucideProps>,
	reversed?: boolean
}

const StyledIcon = ({ children, reversed = false }: StyledIconProps) => {
	const { colorScheme } = useColorScheme()
	return (
		<>
			{
				cloneElement(children, {
					color: children.props.color
						?
						children.props.color
						: (
							reversed
								?
								colorScheme == 'dark' ? 'black' : 'white'
								:
								colorScheme == 'dark' ? 'white' : 'black'
						)
				})
			}
		</>
	)
}

export default StyledIcon