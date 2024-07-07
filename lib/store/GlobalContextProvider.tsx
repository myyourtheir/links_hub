import { Item } from '@/lib/Realm/models/Item'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { BSON } from 'realm'



export type GlobalContextProps = {
	currentAddingData: Partial<Item> | null,
	currentFolder: Item | null,
	setCurrentAddingData: React.Dispatch<React.SetStateAction<Partial<Item> | null>>,
	setCurrentFolder: React.Dispatch<React.SetStateAction<Item | null>>
}

const GlobalContext = createContext<GlobalContextProps | null>(null)

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentAddingData, setCurrentAddingData] = useState<GlobalContextProps['currentAddingData']>(null)
	const [currentFolder, setCurrentFolder] = useState<GlobalContextProps['currentFolder']>(null)
	return (
		<GlobalContext.Provider value={{
			currentAddingData,
			currentFolder,
			setCurrentAddingData,
			setCurrentFolder
		}}>
			{children}
		</GlobalContext.Provider>
	)
}


export default GlobalContextProvider




export const useGlobalContext = () => {
	const context = useContext(GlobalContext) as GlobalContextProps
	return context
}