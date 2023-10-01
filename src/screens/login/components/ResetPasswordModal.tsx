import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, sendPasswordResetEmail } from '@/services/firebase'
import { EMPTY_STRING } from "@/consts/GeneralConsts";
import { emailNotFound, resetPassword } from "@/consts/AlertMessegesConsts";
import { COMMON_COLORS } from "@/services/sass/colors";
import { MODAL_BUTTONS } from "@/consts";
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";

type Props = {
	closeModal: () => void;
}

const ResetPasswordModal = ({ closeModal }: Props) => {
	const [email, setEmail] = useState(EMPTY_STRING)

	const passwordResetHandler = async () => {
		try {
			await sendPasswordResetEmail(auth, email)
			Alert.alert(resetPassword)
			closeModal()
		} catch (e: any) {
			const error = e?.message?.split('/')?.[1]?.slice(0, -2)
			Alert.alert(error === 'user-not-found' ? emailNotFound : e?.message)
		}
	}

	return (
		<View style={styles.modal}>
			<Text style={styles.modalText}>הזן את כתובת האימייל אליה תקבל את הקישור לשחזור הסיסמא</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="אימייל"
					keyboardType="email-address"
					returnKeyType="next"
					onChangeText={setEmail}
				/>
				<MaterialCommunityIcons style={styles.icon} name="email-outline" size={24} color="black" />
			</View>
			<View style={styles.modalButtons}>
				<ModifiedTouchableOpacity
					ButtonClassName={[styles.modalButton, { backgroundColor: COMMON_COLORS.BLUE }]}
					TextClassName={styles.modalButtonText}
					onPress={closeModal}
					title={MODAL_BUTTONS.cancel}
				/>
				<ModifiedTouchableOpacity
					ButtonClassName={[styles.modalButton, { backgroundColor: COMMON_COLORS.VERY_DARK_BLUE }]}
					TextClassName={styles.modalButtonText}
					onPress={passwordResetHandler}
					title={MODAL_BUTTONS.approve}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	icon: {
		flex: 1,
		marginLeft: 10
	},
	input: {
		flex: 9,
		height: 20,
		textAlign: 'right'
	},
	inputContainer: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 25,
		padding: 8,
		shadowColor: COMMON_COLORS.VERY_DARK_GREY,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.1,
		shadowRadius: 2
	},
	modal: {
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 10,
		padding: 20,
		width: '80%'
	},
	modalButton: {
		alignItems: 'center',
		borderRadius: 5,
		justifyContent: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
		width: '40%'
	},
	modalButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16,
		textAlign: 'center'
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	modalText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20,
		textAlign: 'center'
	}
});

export default ResetPasswordModal;