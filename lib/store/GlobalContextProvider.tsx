import { TFunction } from 'i18next'
import React, { createContext, ReactNode, useContext, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BSON } from 'realm'
import { Item } from '../Realm/models/Item'


export type GlobalState = {
	mode: 'view' | 'select' | 'move',
	selected: Item[],
	folderToSetIn: BSON.ObjectId | null
}

export type GlobalAction =
	| { type: "setMode", value: GlobalState['mode'] }
	| { type: 'toggleSelected', value: GlobalState['selected'][0] }
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
				selected: []
			}
		case 'toggleSelected':
			if (state.selected.find(item => action.value._id.toString() == item._id.toString())) {
				return {
					...state,
					selected: state.selected.filter(item => item._id.toString() != action.value._id.toString())
				}
			} else {
				return {
					...state,
					selected: [...state.selected, action.value]
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
	selected: [],
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