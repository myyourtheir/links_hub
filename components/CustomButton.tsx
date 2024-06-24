import { View } from 'lucide-react-native'
import { FC, ReactNode } from 'react'
import { ActivityIndicator, Button, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

type CustomButtonProps = {
	handlePress: () => void,
	className?: string,
	isLoading?: boolean,
	children: ReactNode
}

const CustomButton: FC<CustomButtonProps> = ({
	handlePress,
	className,
	isLoading = false,
	children
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.4}
			className={` ${className} `}
			disabled={isLoading}
		>
			{children}
		</TouchableOpacity>
	)
}

export default CustomButton