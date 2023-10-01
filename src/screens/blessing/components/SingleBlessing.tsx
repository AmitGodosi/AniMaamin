import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { BlessingActionAdd, BlessingActionRemove, BlessingList } from '@/screens/blessing/consts';
import { TBlessing } from '../models';
import { COMMON_COLORS } from '@/services/sass/colors';
import RemoveConfirmationModal from './RemoveConfirmationModal';
import CustomModal from '@/common/Modal';

type Props = {
	BlessingData: TBlessing;
	isAddedSection: boolean;
	isMultiple: boolean;
	onClickedBlessing: (clickedBlessing: TBlessing, actionType: string) => void;
	changeAmount: (clickedBlessing: TBlessing, actionType: string) => void;
}

const SingleBlessing = ({ BlessingData, isAddedSection, isMultiple, onClickedBlessing, changeAmount }: Props) => {
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

	const pickedBlessingHandler = () => {
		const { id, amount } = BlessingData;
		const initalAmount = BlessingList[id].amount;
		amount > initalAmount ? setIsAlertModalOpen(true) : changeBlessingState();
	}

	const changeBlessingState = () => {
		onClickedBlessing(BlessingData, isAddedSection ? BlessingActionRemove : BlessingActionAdd)
	}

	const NumberOfTimeClicked = () => {
		const initalAmount = BlessingList[id].amount;
		return (
			<Text style={styles.amountText}>{amount / initalAmount}</Text>
		)
	}

	const { amount, id, label } = BlessingData;

	return (
		<>
			<Pressable style={styles.category} onPress={pickedBlessingHandler}>
				{isMultiple && (
					<AntDesign onPress={() => changeAmount(BlessingData, BlessingActionRemove)} style={styles.categorySign} name="minus" size={14} color={COMMON_COLORS.BLUE} />
				)}
				<Text style={styles.categoryText}>{label}</Text>
				{isAddedSection && isMultiple && (
					<View style={styles.amountIcon}>
						<NumberOfTimeClicked />
					</View>
				)}
				{isMultiple && (
					<AntDesign onPress={() => changeAmount(BlessingData, BlessingActionAdd)} style={styles.categorySign} name="plus" size={14} color={COMMON_COLORS.BLUE} />
				)}
			</Pressable>
			{isAlertModalOpen && (
				<CustomModal onClose={() => setIsAlertModalOpen(false)} visible={isAlertModalOpen} animationType="fade" transparent>
					<RemoveConfirmationModal label={label} keepItems={() => setIsAlertModalOpen(false)} removeItems={() => changeBlessingState()} />
				</CustomModal>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	amountIcon: {
		backgroundColor: COMMON_COLORS.DARK_BLUE,
		borderRadius: 50,
		padding: 2.5,
		position: 'absolute',
		right: -5,
		top: -5,
		zIndex: 1
	},
	amountText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 12
	},
	category: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		borderRadius: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 5,
		padding: 10,
		position: 'relative'
	},
	categorySign: {
		borderRadius: 5,
		textAlign: 'center',
		width: 25
	},
	categoryText: {
		color: COMMON_COLORS.WHITE,
		marginHorizontal: 5
	}
});

export default SingleBlessing;