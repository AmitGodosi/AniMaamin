import { StyleSheet, Text, View } from "react-native"
import { MODAL_BUTTONS } from "@/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";

type Props = {
	label: string;
	keepItems: () => void;
	removeItems: () => void;
}

const RemoveConfirmationModal = ({ label, keepItems, removeItems }: Props) => {
	return (
		<View style={styles.modal}>
			<Text style={styles.modalText}>רצית למחוק את כל</Text>
			<Text style={styles.modalTextBold}>{label}?</Text>
			<View style={styles.modalButtons}>
				<ModifiedTouchableOpacity
					ButtonClassName={[styles.modalButton, { backgroundColor: COMMON_COLORS.VERY_DARK_BLUE }]}
					TextClassName={styles.modalButtonText}
					onPress={keepItems}
					title={MODAL_BUTTONS.cancel}
				/>
				<ModifiedTouchableOpacity
					ButtonClassName={[styles.modalButton, { backgroundColor: COMMON_COLORS.BLUE }]}
					TextClassName={styles.modalButtonText}
					onPress={removeItems}
					title={MODAL_BUTTONS.approve}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 10,
		padding: 20,
		width: '80%'
	},
	modalButton: {
		borderRadius: 5,
		flex: 0.4,
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	modalButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20,
		textAlign: 'center'
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	modalText: {
		fontSize: 22,
		marginBottom: 15,
		textAlign: 'center'
	},
	modalTextBold: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center'
	}
});

export default RemoveConfirmationModal;