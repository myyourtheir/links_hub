import { LucideProps } from 'lucide-react-native'
import { ReactElement } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import StyledIcon from '~/components/StyledIcon'
import { Text } from '~/components/ui/text'


type BottomFlatListOptionsItemProps = {
	icon: ReactElement<LucideProps>,
	title: string
} & TouchableOpacityProps


const BottomFlatListOptionsItem = ({ icon, title, ...props }: BottomFlatListOptionsItemProps) => {
	return (
		<TouchableOpacity
			className=' items-center justify-center shrink content-stretch my-3  w-[15vw]'
			{...props}
		>
			<StyledIcon>
				{icon}
			</StyledIcon >
			<Text
				numberOfLines={1}
				className='font-normal text-ellipsis whitespace-nowrap overflow-hidden'
				style={{
					fontSize: 10,
					lineHeight: 16,
				}}
			>
				{title}
			</Text>

		</TouchableOpacity >
	)
}
export default BottomFlatListOptionsItem