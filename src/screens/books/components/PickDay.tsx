import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons, Feather } from '@expo/vector-icons';
import { COMMON_COLORS } from "@/services/sass/colors";
import { TItem } from "@/services/interfaces";

type Props = {
	item: TItem;
	handleCheck: (itemId: string) => void;
	checkedItems: string[];
	disabledItems: string[];
}

const PickDay = ({ item, handleCheck, checkedItems, disabledItems }: Props) => {
	const isDisabled = disabledItems?.filter((day: string) => day === item.id)?.[0]

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{item.label}</Text>
			<TouchableOpacity disabled={!!isDisabled} onPress={() => handleCheck(item.id)}>
				{isDisabled ? (
					<View style={[styles.checkbox, { backgroundColor: COMMON_COLORS.LIGHT_GREY }]}>
						<Feather name="x" size={22} color={COMMON_COLORS.VERY_DARK_BLUE} />
					</View>
				) : (
						<View style={styles.checkbox}>
						{checkedItems?.includes(item.id) && (
							<Ionicons name="checkmark" size={26} color={COMMON_COLORS.VERY_DARK_BLUE} />
						)}
					</View>
				)}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	checkbox: {
		alignItems: 'center',
		borderColor: COMMON_COLORS.LIGHT_GREY,
		borderRadius: 5,
		borderWidth: 2,
		height: 34,
		justifyContent: 'center',
		marginLeft: 12,
		width: 34
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'flex-end',
		marginBottom: 3,
		marginRight: 10,
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	text: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20
	}
});

export default PickDay;