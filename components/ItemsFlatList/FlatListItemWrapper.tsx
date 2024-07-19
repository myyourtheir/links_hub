import { View, Text, Pressable } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { EllipsisVertical } from 'lucide-react-native'
import StyledIcon from '../StyledIcon'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import FlatListRowItem from './FlatListRowItem'
import { ItemComponentProps } from './types'
import { Checkbox } from '../ui/checkbox'
import { ItemsFlatListContext, useItemsFlatListContext } from './ItemsFlatListContext'
import { Item } from '~/lib/Realm/models/Item'

type FlatListItemWrapperProps = {
	children: React.ReactElement<ItemComponentProps>
}


const FlatListItemSelectWrapper = ({ children }: FlatListItemWrapperProps) => {
	const childrenId = children.props.item._id.toString()
	const { globalState: { mode, selectedIds }, globalDispatch } = useGlobalContext()
	const { onItemClick } = useItemsFlatListContext()
	const isChecked = selectedIds.find(id => childrenId === id.toString()) ? true : false
	const onItemSelectClick: (item: Item) => void = (item) => {
		globalDispatch({ type: 'toggleSelected', value: item._id })
	}
	return (
		<View key={childrenId} className='relative'>
			{
				mode === 'select'
					?
					<ItemsFlatListContext.Provider
						value={{
							onItemClick: onItemSelectClick,
							onItemLongPress: () => {
								globalDispatch({ type: 'resetSelected' })
								globalDispatch({ type: 'setMode', value: 'view' })
							}
						}}>
						<View className='absolute left-1 top-2 z-10'>
							<Checkbox checked={isChecked} onCheckedChange={() => { return }} />
						</View>
						{children}
					</ItemsFlatListContext.Provider>
					:
					<ItemsFlatListContext.Provider
						value={
							{
								onItemClick,
								onItemLongPress: (item) => {
									globalDispatch({ type: 'setMode', value: 'select' })
									globalDispatch({ type: 'toggleSelected', value: item._id })
								}
							}
						}
					>
						<>
							{children}
						</>
					</ItemsFlatListContext.Provider>
			}
		</View>
	)
}

export default FlatListItemSelectWrapper