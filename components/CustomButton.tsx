import { View } from 'lucide-react-native'
import { FC, ReactNode } from 'react'
import { ActivityIndicator, Button, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

type CustomButtonProps = {
	handlePress: () => void,
	additionClassName?: string,
	isLoading?: boolean,
	children: ReactNode
}

const CustomButton: FC<CustomButtonProps> = ({
	handlePress,
	additionClassName,
	isLoading = false,
	children
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.4}
			className={` ${additionClassName} `}
			disabled={isLoading}
		>
			{children}
		</TouchableOpacity>
	)
}

export default CustomButton