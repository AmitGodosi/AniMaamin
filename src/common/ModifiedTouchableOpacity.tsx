import { BACKGROUND_COLORS } from '@/services/sass/colors';
import { StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'

type Props = {
	title: string;
	onPress: () => void;
	ButtonClassName?:  StyleProp<ViewStyle>;
	TextClassName?: StyleProp<TextStyle>;
}


const ModifiedTouchableOpacity = ({ onPress, title, ButtonClassName, TextClassName }: Props) => {
	return (
		<TouchableOpacity onPress={onPress} style={ButtonClassName || styles.container}>
			<Text style={TextClassName || styles.text}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: BACKGROUND_COLORS.MODIFIED_PRESSABLE,
		borderRadius: 10,
		flex: 1,
		margin: 10,
		opacity: 0.85,
		padding: 15
	},
	text: {
		fontSize: 16,
		textAlign: 'center'
	}
})
export default ModifiedTouchableOpacity