import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native"
import { useDispatch } from "react-redux";
import { THomeFinishedBook } from "@/screens/home/models";
import { setIsStartToReadBook } from "@/services/store/GeneralStore";
import { COMMON_COLORS } from "@/services/sass/colors";
import { SELECTED_BOOKS, SELECTED_BOOKS_NAMES } from "@/consts";
import CustomModal from "@/common/Modal";
import RemoveRemainderModal from "./RemoveRemainderModal";

type Props = {
	finishedBook: THomeFinishedBook;
}

const HomeSingleRemainder = ({ finishedBook }: Props) => {
	const [isHomeInfoModalOpen, setIsHomeInfoModalOpen] = useState(false)
	
	const dispatch = useDispatch()

	const handleClickedRemainder = () =>{
		dispatch(setIsStartToReadBook({ isStartToReadBook: true }))
		setIsHomeInfoModalOpen(false)
	}

	const { date, book, daysToRead } = finishedBook || {};

	return (
		<>
			<Pressable style={styles.container} onPress={() => setIsHomeInfoModalOpen(true)}>
				<View style={styles.daysToReadRow} >
					{daysToRead?.reverse()?.map((day: string, index: number) => {
						return (
							<Text key={index} style={{ marginHorizontal: 5, color: COMMON_COLORS.WHITE }}>{day}</Text>
						)
					})
					}
				</View>
				<Text style={[styles.rowItem, { flex: 3 }]}>{date}</Text>
				<Text style={[styles.rowItem, { flex: 2 }]}>
					{book === SELECTED_BOOKS.DVARIM ? SELECTED_BOOKS_NAMES.DVARIM : SELECTED_BOOKS_NAMES.THILIM}
				</Text>
			</Pressable>
			{isHomeInfoModalOpen && (
				<CustomModal onClose={() => setIsHomeInfoModalOpen(false)} visible={isHomeInfoModalOpen} animationType="fade" transparent>
					<RemoveRemainderModal item={finishedBook} closeModal={handleClickedRemainder} label="סיימת לקרוא" />
				</CustomModal>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderColor: COMMON_COLORS.WHITE,
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row',
		marginBottom: 10
	},
	daysToReadRow: {
		alignItems: 'center',
		flex: 3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		margin: 5,
		paddingVertical: 5,
		textAlign: 'center',
	},
	rowItem: {
		color: COMMON_COLORS.WHITE,
		flex: 1,
		margin: 10,
		textAlign: 'center',

	}
});

export default HomeSingleRemainder;