import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useDispatch } from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TSelectedBook } from "./models";
import { EMPTY_STRING } from "@/consts/GeneralConsts";
import { setSelectedBook } from "@/services/store/DistributionStore";
import { RoutesNames } from "@/services/navigation/Routes";
import { DVARIM_INFO_2, THILIM_INFO_4 } from "@/screens/books/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import { SELECTED_BOOKS } from "@/consts";
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";
import CustomModal from "@/common/Modal";
import BookInfoModal from "@/screens/books/components/BookInfoModal";

const BooksScreen = () => {
	const [isInfoBookOpen, setIsInfoBookOpen] = useState(EMPTY_STRING)

	const dispatch = useDispatch()
	const navigation = useNavigation()

	const bookPressedHandler = (selectedBook: TSelectedBook) => {
		dispatch(setSelectedBook({ selectedBook }))
		navigation.navigate(RoutesNames.PICK_DAYS_ROUTE as never)
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.booksButtons}>
					<ModifiedTouchableOpacity
						onPress={() => bookPressedHandler(SELECTED_BOOKS.DVARIM as TSelectedBook)}
						title="קריאת ספר דברים"
						ButtonClassName={[styles.booksButton, { backgroundColor: COMMON_COLORS.VERY_DARK_BLUE }]}
						TextClassName={styles.booksButtonText}
					/>
					<ModifiedTouchableOpacity
						onPress={() => bookPressedHandler(SELECTED_BOOKS.THILIM as TSelectedBook)}
						title="קריאת ספר תהילים"
						ButtonClassName={[styles.booksButton, { backgroundColor: COMMON_COLORS.BLUE }]}
						TextClassName={styles.booksButtonText}
					/>
				</View>

				<View style={styles.bookInfoContainer}>
					<View style={styles.bookInfo}>
						<Text style={styles.bookInfoTitle}> סגולת ספר דברים</Text>
						<Text style={styles.bookInfoText}>{DVARIM_INFO_2}</Text>
						<TouchableOpacity
							style={styles.bookInfoButton}
							onPress={() => setIsInfoBookOpen('DVARIM')}
						>
							<Text style={styles.bookInfoButtonText}>המשך קריאה</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.bookInfo}>
						<Text style={styles.bookInfoTitle}> סגולת ספר תהילים</Text>
						<Text style={styles.bookInfoText}>{THILIM_INFO_4}</Text>
						<TouchableOpacity
							style={styles.bookInfoButton}
							onPress={() => setIsInfoBookOpen('THILIM')}
						>
							<Text style={styles.bookInfoButtonText}>המשך קריאה</Text>
						</TouchableOpacity>
					</View>
					<LinearGradient
						colors={[COMMON_COLORS.LIGHT_BLUE, COMMON_COLORS.DARK_BLUE]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.booksButtonGrandient}
					>
						<ModifiedTouchableOpacity
							onPress={() => navigation.navigate(RoutesNames.FINISHED_BOOKS_ROUTE as never)}
							title="הספרים שקראנו"
							ButtonClassName={styles.footerButton}
							TextClassName={styles.booksButtonText}
						/>
					</LinearGradient>
				</View>
			</View >
			{!!isInfoBookOpen && (
				<CustomModal onClose={() => setIsInfoBookOpen(EMPTY_STRING)} visible={!!isInfoBookOpen} animationType="fade" transparent>
					<BookInfoModal bookName={isInfoBookOpen} />
				</CustomModal>
			)}
		</>
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
	bookInfoContainer: {
		alignItems: "center",
		flex: 3,
		width: '100%',
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
	},
	booksButton: {
		borderRadius: 5,
		margin: 10,
		paddingHorizontal: 17,
		paddingVertical: 10
	},
	booksButtonGrandient: {
		borderRadius: 5
	},
	booksButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16
	},
	booksButtons: {
		alignItems: "flex-end",
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginVertical: 20,
		width: '100%',
	},
	container: {
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1
	},
	footerButton: {
		margin: 10
	}
});

export default BooksScreen;