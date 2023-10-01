import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COMMON_COLORS } from "@/services/sass/colors";
import { DVARIM_INFO_2, THILIM_INFO_4 } from "../consts";

type Props = {
	onPress: (bookName: string) => void;
	isDvarimBook?: boolean;
}

const BookInfo = ({ onPress, isDvarimBook }: Props) => {
	return (
		<View style={styles.bookInfo}>
			<Text style={styles.bookInfoTitle}>
				{isDvarimBook ? 'סגולת ספר דברים' : 'סגולת ספר תהילים'}
				</Text>
			<Text style={styles.bookInfoText}>
				{isDvarimBook ? DVARIM_INFO_2 : THILIM_INFO_4}
				</Text>
			<TouchableOpacity
				style={styles.bookInfoButton}
				onPress={() => onPress(isDvarimBook ? 'DVARIM' : 'THILIM')}
			>
				<Text style={styles.bookInfoButtonText}>המשך קריאה</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	bookInfo: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 5,
		height: '40%',
		justifyContent: 'space-between',
		margin: 10,
		paddingHorizontal: 20,
		paddingVertical: 20,
		width: '90%'
	},
	bookInfoButton: {
		backgroundColor: COMMON_COLORS.DEFAULT,
		borderRadius: 5,
		marginTop: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		width: '50%'
	},
	bookInfoButtonText: {
		color: COMMON_COLORS.DARK_BLUE,
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center"
	},
	bookInfoText: {
		color: COMMON_COLORS.LIGHT_GREY,
		fontSize: 16,
		height: '50%',
		marginTop: 5,
		textAlign: "right",
	},
	bookInfoTitle: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20,
		fontWeight: "bold",
		letterSpacing: .5,
		textAlign: "center"
	}
})

export default BookInfo;