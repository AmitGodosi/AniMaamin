import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { MuiltipleClickedBlessing } from "@/screens/blessing/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import { TBlessing, TBlessingList } from "../models";
import SingleBlessing from "./SingleBlessing";


type Props = {
	title: string;
	BlessingListData: TBlessingList;
	isAddedSection: boolean;
	onClickedBlessing: (clickedBlessing: TBlessing, actionType: string) => void;
	changeAmount: (clickedBlessing: TBlessing, actionType: string) => void;
}

const BlessingList = ({ title, BlessingListData, isAddedSection, onClickedBlessing, changeAmount }: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.containerTitle}>{title}</Text>
			<View style={styles.categories}>
				{Object.values(BlessingListData || {})?.map((blessing: TBlessing) => {
					const isMultiple = isAddedSection && MuiltipleClickedBlessing?.includes(blessing?.id);
					return (
						<SingleBlessing changeAmount={changeAmount} onClickedBlessing={onClickedBlessing} BlessingData={blessing} isAddedSection={isAddedSection} isMultiple={isMultiple} key={blessing?.id} />
					)
				})}
			</View>
		</View >
	)
}

const styles = StyleSheet.create({
	categories: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		paddingVertical: 20,
		width: '100%'
	},
	container: {
		marginTop: 15
	},
	containerTitle: {
		color: COMMON_COLORS.WHITE,
		fontSize: 22,
		marginBottom: 10,
		textAlign: 'center'
	}
});

export default BlessingList;