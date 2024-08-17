import { useEffect } from 'react'
import { TextInput } from 'react-native'

const useFocus = ({ ref }: { ref: React.RefObject<TextInput> }) => {

	useEffect(() => {
		if (ref.current) {
			ref.current.focus()
		}
	}, [ref.current])
}

export default useFocus