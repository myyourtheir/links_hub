import { FormSchema } from '@/app/(tabs)/AddingScreen'
import { Item } from '@/lib/Realm/models/Item'
import { TFunction } from 'i18next'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BSON } from 'realm'



export type GlobalContextProps = {
	currentAddingData: FormSchema | null,
	currentFolder: BSON.ObjectID | null,
	setCurrentAddingData: React.Dispatch<React.SetStateAction<FormSchema | null>>,
	setCurrentFolder: React.Dispatch<React.SetStateAction<BSON.ObjectID | null>>
	t: TFunction<"translation", undefined>
}

const GlobalContext = createContext<GlobalContextProps | null>(null)

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentAddingData, setCurrentAddingData] = useState<GlobalContextProps['currentAddingData']>(null)
	const [currentFolder, setCurrentFolder] = useState<GlobalContextProps['currentFolder']>(null)
	const { t } = useTranslation()
	return (
		<GlobalContext.Provider value={{
			currentAddingData,
			currentFolder,
			setCurrentAddingData,
			setCurrentFolder,
			t
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