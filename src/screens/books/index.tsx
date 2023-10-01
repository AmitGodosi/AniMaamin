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
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";
import CustomModal from "@/common/Modal";
import BookInfoModal from "@/screens/books/components/BookInfoModal";
import HeaderButtons from "./components/HeaderButtons";
import BookInfo from "./components/BookInfo";

const BooksScreen = () => {
	const [isInfoBookOpen, setIsInfoBookOpen] = useState(EMPTY_STRING)

	const navigation = useNavigation()

	return (
		<>
			<View style={styles.container}>
				<HeaderButtons />
				<View style={styles.bookInfoContainer}>
					<BookInfo isDvarimBook onPress={setIsInfoBookOpen} />
					<BookInfo onPress={setIsInfoBookOpen} />
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
	bookInfoContainer: {
		alignItems: "center",
		flex: 3,
		width: '100%',
	},
	booksButtonGrandient: {
		borderRadius: 5
	},
	booksButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16
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