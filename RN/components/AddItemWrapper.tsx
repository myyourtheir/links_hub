import { View, Pressable, PressableProps, KeyboardAvoidingView, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import AddFolderDialog from '~/app/(screens)/HomeScreen/(components)/AddFolderDialog'
import AddLinkDialog from '~/app/(screens)/HomeScreen/(components)/AddLinkDialog'
import StyledIcon from './StyledIcon'
import { FilePlus, FolderPlus, PlusIcon } from 'lucide-react-native'
import { Text } from './ui/text'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import AddFolderForm from './AddFolderForm'
import AddLinkForm from './AddLinkForm'
import { useGlobalContext } from '~/lib/store/GlobalContextProvider'
import { Animated } from 'react-native'

type AddItemWrapperProps = {
	translateY: Animated.AnimatedInterpolation<string | number>,
	children: ReactNode,
	parentId: string | string[]
} & Partial<TouchableOpacityProps>

type AddItemWrapperContextProps = {
	addItemType: 'folder' | 'link'
	setAddItemType: React.Dispatch<React.SetStateAction<"folder" | "link">>
}


const AddItemWrapperContext = React.createContext<AddItemWrapperContextProps | null>(null)


const AddItemWrapper = ({ children, parentId, translateY, ...props }: AddItemWrapperProps) => {
	const [addItemType, setAddItemType] = React.useState<'folder' | 'link'>('folder')
	const [open, setOpen] = React.useState(false)
	const { globalState: { mode } } = useGlobalContext()
	return (
		<AddItemWrapperContext.Provider value={{ addItemType, setAddItemType }}>
			<View className='relative h-full w-full bg-transparent'>
				{children}
				{
					mode === 'view' &&
					<Animated.View
						style={{
							transform: [{ translateY: translateY }]
						}}
					>

						<View className='absolute bottom-8 right-10'>
							<Button
								onLongPress={() => {
									addItemType === 'folder' ? setAddItemType('link') : setAddItemType('folder')
								}}
								onPress={() => {
									setOpen(prev => !prev)
								}}
								size={'icon'}
								className='rounded-full h-20 w-20 bg-foreground flex flex-row items-center justify-center shadow-sm shadow-foreground'
								{...props}
							>
								{
									addItemType === 'folder'
										?
										<Dialog open={open} onOpenChange={setOpen}>
											<DialogTrigger className='w-full h-full' asChild>
												<StyledIcon reversed>
													<FolderPlus size={32} strokeWidth={1.5} />
												</StyledIcon>

											</DialogTrigger>
											<DialogContent className='w-[350px] '>
												<AddFolderForm parentId={parentId} setOpen={setOpen} />
											</DialogContent>
										</Dialog>
										:
										<Dialog open={open} onOpenChange={setOpen}>
											<DialogTrigger className='w-full h-full' asChild>
												<StyledIcon reversed>
													<FilePlus size={32} strokeWidth={1.5} />
												</StyledIcon>

											</DialogTrigger>
											<DialogContent className='w-[350px] '>
												<AddLinkForm parentId={parentId} setOpen={setOpen} />
											</DialogContent>
										</Dialog>
								}
							</Button>
						</View>
					</Animated.View>
				}
			</View>
		</AddItemWrapperContext.Provider>
	)
}

export default AddItemWrapper