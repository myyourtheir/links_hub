import { TFunction } from 'i18next'
import React, { createContext, ReactNode, useContext, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BSON } from 'realm'


type GlobalState = {
	mode: 'view' | 'select' | 'move',
	selectedIds: BSON.ObjectId[],
	folderToSetIn: BSON.ObjectId | null
}

type GlobalAction =
	| { type: "setMode", value: GlobalState['mode'] }
	| { type: 'toggleSelected', value: GlobalState['selectedIds'][0] }
	| { type: 'resetSelected' }
	| { type: 'setFolderToSetIn', value: GlobalState['folderToSetIn'] }

export type GlobalContextProps = {
	globalState: GlobalState,
	globalDispatch: React.Dispatch<GlobalAction>
	t: TFunction<"translation", undefined>
}

const GlobalContext = createContext<GlobalContextProps | null>(null)



function reducer(state: GlobalState, action: GlobalAction): GlobalState {
	switch (action.type) {
		case 'setMode':
			return {
				...state,
				mode: action.value
			}
		case 'resetSelected':
			return {
				...state,
				selectedIds: []
			}
		case 'toggleSelected':
			if (state.selectedIds.find(id => action.value.toString() == id.toString())) {
				return {
					...state,
					selectedIds: state.selectedIds.filter(id => id.toString() !== action.value.toString())
				}
			} else {
				return {
					...state,
					selectedIds: [...state.selectedIds, action.value]
				}
			}
		case 'setFolderToSetIn':
			return {
				...state,
				folderToSetIn: action.value
			}
	}
}

const initialState: GlobalState = {
	mode: 'view',
	selectedIds: [],
	folderToSetIn: null
}


const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
	const { t } = useTranslation()
	const [globalState, globalDispatch] = useReducer(
		reducer,
		initialState
	)
	return (
		<GlobalContext.Provider value={{
			t,
			globalState,
			globalDispatch
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