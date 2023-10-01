import { COMMON_COLORS } from "@/services/sass/colors"
import { setSelectedBook } from "@/services/store/DistributionStore"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { TSelectedBook } from "../models"
import { RoutesNames } from "@/services/navigation/Routes"
import { useNavigation } from "@react-navigation/native"
import { SELECTED_BOOKS } from "@/consts"
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity"

export default function HeaderButtons() {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const bookPressedHandler = (selectedBook: TSelectedBook) => {
		dispatch(setSelectedBook({ selectedBook }))
		navigation.navigate(RoutesNames.PICK_DAYS_ROUTE as never)
	}

  return (
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
  )
}

const styles = StyleSheet.create({
	booksButton: {
		borderRadius: 5,
		margin: 10,
		paddingHorizontal: 17,
		paddingVertical: 10
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
})