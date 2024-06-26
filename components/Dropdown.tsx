import { FC, ReactNode, cloneElement, createContext, useContext, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

type DropdownContextProps = {
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

const useDropdown = () => {
	const context = useContext(DropdownContext)
	if (!context) {
		throw new Error('useDropdown must be used within a DropdownProvider')
	}
	return context
}
type DropdownProps = {
	children: ReactNode,
	className?: string
}

const Dropdown: FC<DropdownProps> = ({ children, className }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<DropdownContext.Provider value={{ isOpen, setIsOpen }}>
			<View className={` relative ${className}`}>
				{children}
			</View>
		</DropdownContext.Provider>
	)
}

type DropdownTriggerProps = {
	children: any,
	className?: string
}

const DropdownTrigger: FC<DropdownTriggerProps> = ({ children, className }) => {
	const { setIsOpen } = useDropdown()
	return cloneElement(children, {
		onPress: () => setIsOpen((prev: any) => !prev),
	})
}


type DropdownContentProps = {
	children: ReactNode,
	className?: string
}

const DropdownContent: FC<DropdownContentProps> = ({ children, className }) => {
	const { isOpen } = useDropdown()
	return (
		<>
			{
				isOpen &&
				<View className={`'min-w-[8rem] w-full absolute flex gap-3 overflow-hidden rounded-md border border-border bg-primary text-popover-foreground shadow-md mt-3 p-3 top-12 mx-auto justify-center z-50 ${className}`}>
					{children}
				</View>

			}
		</>
	)
}

export { Dropdown, DropdownTrigger, DropdownContent }