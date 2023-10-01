import { StyleSheet, Text, View } from "react-native"
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TContributor, TFinishedBook } from "../models";
import { COLON, EMPTY_STRING } from "@/consts/GeneralConsts";
import { FINISHED, SELECTED_BOOKS, SELECTED_BOOKS_NAMES } from "@/consts";
import { FinishedBooksInfoModal } from "../consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import LineBreak from "@/common/LineBreak";

type Props = {
	finishedBook: TFinishedBook;
}

const InfoModal = ({ finishedBook }: Props) => {
	const { contributors, date, book, status } = finishedBook || {};

	const renderContributors = () => {
		return (
			contributors?.map((contributor: TContributor) => {
				const unicKey = contributor.days.join(EMPTY_STRING)
				return (
					<View style={styles.contributorsHeader} key={unicKey}>
						<View style={styles.contributorDays}>
							{contributor?.days?.reverse()?.map((day: string) => (
								<Text key={day} style={{ margin: 5 }}>{day}</Text>
							))}
						</View>
						<Text style={{ marginHorizontal: 5 }}>{contributor?.name}{COLON}</Text>
					</View>
				)
			})
		)
	}

	return (
		<View style={styles.modal}>
			<View style={styles.rowItem}>
				<Text style={styles.rowItemTextInfo}>{date}</Text>
				<Text style={styles.rowItemTextTitle}>{FinishedBooksInfoModal.date}</Text>
			</View>
			<LineBreak />
			<View style={styles.rowItem}>
				<Text style={styles.rowItemTextInfo}>
					{book === SELECTED_BOOKS.DVARIM ? SELECTED_BOOKS_NAMES.DVARIM : SELECTED_BOOKS_NAMES.THILIM}
				</Text>
				<Text style={styles.rowItemTextTitle}>{FinishedBooksInfoModal.book}</Text>
			</View>
			<LineBreak />
			<View style={styles.rowItem}>
				<Text style={styles.rowItemTextInfo}>
					{status === FINISHED ? (
						<MaterialIcons name="done" size={24} color="green" />
					) : (
						<Feather name="edit-2" size={24} color="purple" />
					)}
				</Text>
				<Text style={styles.rowItemTextTitle}>{FinishedBooksInfoModal.status}</Text>
			</View>
			<LineBreak />
			<View style={styles.rowItem}>
				<Text style={styles.rowItemTextTitle}>{FinishedBooksInfoModal.contributors}</Text>
			</View>
			<View style={styles.rowItem}>
				<View style={{ flex: 6 }}>{renderContributors()}</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	contributorDays: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxWidth: '80%'
	},
	contributorsHeader: {
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	modal: {
		alignItems: 'flex-end',
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 10,
		justifyContent: 'flex-start',
		paddingHorizontal: 30,
		paddingVertical: 20,
		width: '80%'
	},
	rowItem: {
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10
	},
	rowItemTextInfo: {
		flex: 6,
		textAlign: 'left'
	},
	rowItemTextTitle: {
		flex: 2,
		fontWeight: 'bold',
		textAlign: 'right'
	}
});

export default InfoModal;