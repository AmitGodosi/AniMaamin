import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COMMON_COLORS } from '@/services/sass/colors';
import { BACK_BUTTON } from '@/consts';

type Props = {
	title?: string;
	customOnPress?: () => void;
}

export default function BackButton({ title, customOnPress }: Props) {
	const handlePress = () => {
		if (customOnPress) {
			customOnPress();
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={handlePress}>
			<Ionicons style={styles.icon} name="chevron-back" size={24} color="black" />
			<Text style={styles.text}>{title || BACK_BUTTON}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	icon: {
		color: COMMON_COLORS.VERY_DARK_BLUE
	},
	text: {
		color: COMMON_COLORS.VERY_DARK_BLUE,
		fontSize: 18,
		fontWeight: 'bold'
	}
});