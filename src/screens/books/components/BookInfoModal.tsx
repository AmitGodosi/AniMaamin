import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { COMMON_COLORS } from "@/services/sass/colors";
import {
	DVARIM_INFO_1, DVARIM_INFO_2, DVARIM_INFO_3, DVARIM_INFO_4, DVARIM_INFO_5, DVARIM_INFO_6,
	THILIM_INFO_1, THILIM_INFO_2, THILIM_INFO_3, THILIM_INFO_4, THILIM_INFO_5, THILIM_INFO_6
} from "@/screens/books/consts";

type Props = {
	bookName: string
}

const BookInfoModal = ({ bookName }: Props) => {
	return (
		<View style={styles.modal}>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				scrollIndicatorInsets={{ right: 5, bottom: 5, left: 5, top: 5 }}
				>
				<TouchableOpacity>
					{bookName === 'DVARIM' ? (
						<>
							<Text style={styles.text}>{DVARIM_INFO_1}</Text>
							<Text style={styles.text}>{DVARIM_INFO_2}</Text>
							<Text style={styles.text}>{DVARIM_INFO_3}</Text>
							<Text style={styles.text}>{DVARIM_INFO_4}</Text>
							<Text style={styles.text}>{DVARIM_INFO_5}</Text>
							<Text style={styles.text}>{DVARIM_INFO_6}</Text>
						</>
					) : (
						<>
							<Text style={styles.text}>{THILIM_INFO_1}</Text>
							<Text style={styles.text}>{THILIM_INFO_2}</Text>
							<Text style={styles.text}>{THILIM_INFO_3}</Text>
							<Text style={styles.text}>{THILIM_INFO_4}</Text>
							<Text style={styles.text}>{THILIM_INFO_5}</Text>
							<Text style={styles.text}>{THILIM_INFO_6}</Text>
						</>
					)}
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 10,
		maxHeight: '50%',
		width: '80%'
	},
	scrollViewContent: {
		flexGrow: 1,
		padding: 20
	},
	text: {
		fontSize: 16,
		marginBottom: 10,
		textAlign: 'right'
	},
});

export default BookInfoModal;