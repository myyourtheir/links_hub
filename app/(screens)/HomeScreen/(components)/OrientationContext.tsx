import { View, Text } from 'react-native'
import { createContext, ReactNode, useContext, useState } from 'react'

type ContextType = {
	orientationMode: 'grid' | 'row',
	setOrientationMode: React.Dispatch<React.SetStateAction<"grid" | "row">>
}

const OrientationContext = createContext<ContextType | null>(null)



const OrientationContextProvider = ({ children }: { children: ReactNode }) => {

	const [orientationMode, setOrientationMode] = useState<'grid' | 'row'>('grid')
	return (
		<OrientationContext.Provider value={{ orientationMode, setOrientationMode }}>
			{children}
		</OrientationContext.Provider>
	)
}

export const useOrientationContext = () => {
	const context = useContext(OrientationContext) as ContextType
	return { orientationMode: context.orientationMode, setOrientationMode: context.setOrientationMode }
}


export default OrientationContextProvider