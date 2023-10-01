import { StyleSheet, Text, View } from "react-native"
import { COMMON_COLORS } from "@/services/sass/colors";
import { MODAL_BUTTONS } from "@/consts";
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";

type Props = {
	checkedItems: string;
	onPress: (isApprove: boolean) => void;
}

const ConfrmationPickedDaysModal = ({ checkedItems, onPress }: Props) => {
	return (
		<View style={styles.modal}>
			<Text style={styles.modalText}>הימים שנבחרו</Text>
			<Text style={styles.modalText}>{checkedItems}</Text>
			<View style={styles.modalButtons}>
				<ModifiedTouchableOpacity
					ButtonClassName={[styles.modalButton, { backgroundColor: COMMON_COLORS.BLUE }]}
					TextClassName={styles.modalButtonText}
					onPress={() => onPress(false)}
					title={MODAL_BUTTONS.cancel}
				/>
				<ModifiedTouchableOpacity
					ButtonClassName={[styles.modalButton, { backgroundColor: COMMON_COLORS.VERY_DARK_BLUE }]}
					TextClassName={styles.modalButtonText}
					onPress={() => onPress(true)}
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
		width: '70%'
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
		fontSize: 20,
		marginBottom: 20,
		textAlign: 'center'
	}
});

export default ConfrmationPickedDaysModal;