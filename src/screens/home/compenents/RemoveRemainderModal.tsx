import { StyleSheet, Text, View } from "react-native"
import { THomeFinishedBook } from "../models";
import { retrieveUserData } from "@/utils";
import { DISTRIBUTION } from "@/services/firebase/consts";
import { db, doc, setDoc } from "@/services/firebase"
import { SELECTED_BOOKS, SELECTED_BOOKS_NAMES } from "@/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import { FINISHED, MODAL_BUTTONS } from "@/consts";
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";

type Props = {
	label: string;
	closeModal: () => void;
	item: THomeFinishedBook
}

const RemoveRemainderModal = ({ label, closeModal, item }: Props) => {

	const updateBookStatus = async () => {
		const uid = await retrieveUserData();
		if (uid) {
			const updatedBook = { ...item, status: FINISHED }
			const userBooksRef = doc(db, DISTRIBUTION, uid);
			item?.id && await setDoc(userBooksRef, { [item?.id]: updatedBook }, { merge: true });
		}
		closeModal()
	}

	const Label = () => {
		const bookName = item?.book === SELECTED_BOOKS.DVARIM ? SELECTED_BOOKS_NAMES.DVARIM : SELECTED_BOOKS_NAMES.THILIM
		const dayName = item?.daysToRead?.length === 1 ? 'יום' : 'ימים'
		const days = item?.daysToRead?.reverse().join(',')

		return (
			<Text style={styles.modalTextBold}>{label} ב{bookName} את {dayName} {days} ?</Text>
		)
	}

	return (
		<View style={styles.modal}>
			<Label />
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
					onPress={updateBookStatus}
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
	modalTextBold: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: 'center'
	}
});

export default RemoveRemainderModal;