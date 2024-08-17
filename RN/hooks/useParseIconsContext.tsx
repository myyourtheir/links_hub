import React from 'react'

type ParseIconsContextType = {
	parseIcons: boolean,
	setParseIcons: React.Dispatch<React.SetStateAction<boolean>>
}

const ParseIconsContext = React.createContext<ParseIconsContextType | null>(null)



export const ParseIconsProvider = ({ children }: { children: React.ReactNode }) => {
	const [parseIcons, setParseIcons] = React.useState(true)
	return (
		<ParseIconsContext.Provider value={{ parseIcons, setParseIcons }}>
			{children}
		</ParseIconsContext.Provider>
	)
}

const useParseIconsContext = () => {
	return React.useContext(ParseIconsContext) as ParseIconsContextType
}

export { useParseIconsContext }