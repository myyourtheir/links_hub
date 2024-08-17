import { View } from 'react-native'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { ItemComponentProps } from './types'
import { Checkbox } from '../ui/checkbox'
import { ItemsFlatListContext, useItemsFlatListContext } from './ItemsFlatListContext'
import { Item } from '~/lib/Realm/models/Item'

type FlatListItemWrapperProps = {
	children: React.ReactElement<ItemComponentProps>,
	item: Item
}


const FlatListItemSelectWrapper = ({ children, item }: FlatListItemWrapperProps) => {
	const childrenId = item?._id.toString()
	const { globalState: { mode, selected }, globalDispatch } = useGlobalContext()
	const { onItemClick } = useItemsFlatListContext()
	const isChecked = selected.find(item => childrenId === item._id.toString()) ? true : false
	const onItemSelectClick: (item: Item) => void = (item) => {
		globalDispatch({ type: 'toggleSelected', value: item })
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
							<Checkbox checked={isChecked} onCheckedChange={() => { onItemSelectClick(children.props.item) }} />
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
									globalDispatch({ type: 'toggleSelected', value: item })
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