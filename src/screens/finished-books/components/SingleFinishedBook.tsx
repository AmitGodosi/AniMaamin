import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { TContributor, TFinishedBook } from "../models";
import { SELECTED_BOOKS, SELECTED_BOOKS_NAMES } from "@/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import CustomModal from "@/common/Modal";
import InfoModal from "./InfoModal";

type Props = {
	finishedBook: TFinishedBook;
	index: number;
}

const SingleFinishedBook = ({ finishedBook, index }: Props) => {
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

	const { contributors, date, book } = finishedBook || {};

	return (
		<>
			<Pressable onPress={() => setIsInfoModalOpen(true)}>
				<View style={styles.container}>
					<Text style={[styles.rowItem, { flex: 1 }]}>
						<MaterialIcons name="done" size={24} color="green" />
					</Text>
					<View style={styles.contributorRow} >
						{contributors?.map((contributor: TContributor, index: number) => {
							return (
								<Text key={index} style={{ marginHorizontal: 5 }}>{contributor.name}</Text>
							)
						})}
					</View>
					<Text style={[styles.rowItem, { flex: 3 }]}>{date}</Text>
					<Text style={[styles.rowItem, { flex: 2 }]}>
						{book === SELECTED_BOOKS.DVARIM ? SELECTED_BOOKS_NAMES.DVARIM : SELECTED_BOOKS_NAMES.THILIM}
					</Text>
					<Text style={[styles.rowItem, { flex: 1 }]}>{index}</Text>
				</View >
			</Pressable>
			{isInfoModalOpen && finishedBook && (
				<CustomModal onClose={() => setIsInfoModalOpen(false)} visible={isInfoModalOpen} animationType="fade" transparent>
					<InfoModal finishedBook={finishedBook} />
				</CustomModal>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderColor: COMMON_COLORS.WHITE,
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row',
		marginBottom: 10
	},
	contributorRow: {
		alignItems: 'center',
		flex: 3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		margin: 5,
		paddingVertical: 5,
		textAlign: 'center'
	},
	rowItem: {
		flex: 1,
		margin: 10,
		textAlign: 'center'
	}
});

export default SingleFinishedBook;