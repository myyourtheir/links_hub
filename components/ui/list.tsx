import { View, Text } from 'react-native'
import React, { forwardRef, ReactNode } from 'react'
import { cn } from '~/lib/utils'

const List = forwardRef<View, { className?: string, children?: ReactNode }>(({ className, children, ...props }, ref) => {
	return (
		<View
			ref={ref}
			className={cn('w-full ', className)}
			{...props} >
			{children}
		</View>
	)
})

const ListItem = forwardRef<View, { className?: string, children?: ReactNode }>(({ className, children, ...props }, ref) => {
	return (
		<View
			ref={ref}
			style={{
				marginBottom: 30
			}}
			className={cn('flex-row justify-between items-center h-10 w-full', className)}
			{...props} >
			{children}
		</View>
	)
})


const ListItemTitle = forwardRef<View, { className?: string, children?: ReactNode }>(({ className, children, ...props }, ref) => {
	return (
		<View
			ref={ref}
			className={cn('', className)}
			{...props} >
			{children}
		</View>
	)
})

const ListItemValue = forwardRef<View, { className?: string, children?: ReactNode }>(({ className, children, ...props }, ref) => {
	return (
		<View
			ref={ref}
			className={cn('', className)}
			{...props} >
			{children}
		</View>
	)
})

export {
	List,
	ListItem,
	ListItemTitle,
	ListItemValue
}