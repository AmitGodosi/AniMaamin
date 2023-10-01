import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { COMMON_COLORS } from "@/services/sass/colors";
import { TCheckedCheckboxes, TDailyItem, TDailyItemOptions } from "../models";

type Props = {
	item: TDailyItem;
	handleCheck: (item: TDailyItem, index?: number) => void;
	checkedItems: TCheckedCheckboxes;
}
type InitialValue = {
	checked: boolean;
	optionIndex?: number;
}

const DailyItem = ({ item, handleCheck, checkedItems }: Props) => {
	const [isChecked, setIsChecked] = useState<InitialValue>({ checked: false })
	const { options, label, name } = item || {}

	useEffect(() => {
		if (options) {
			setIsChecked(name in (checkedItems?.options || {}) ? { checked: true, optionIndex: checkedItems.options[name] } : { checked: false })
		} else {
			setIsChecked({ checked: !!checkedItems?.elements?.[name] })
		}
	}, [checkedItems, item])

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				{options ? (
					<View style={styles.optionsStyle}>
						{options?.map((option: TDailyItemOptions, index: number) => {
							const itemIsChecked = isChecked.checked && index === isChecked.optionIndex;
							return (
								<View key={option.id}>
									<TouchableOpacity onPress={() => handleCheck(item, Number(index + 1))}>
										<View style={[styles.checkbox, itemIsChecked && { backgroundColor: COMMON_COLORS.DEFAULT }]}>
											{itemIsChecked && (
												<Ionicons name="checkmark" size={24} color="white" />
											)}
										</View>
									</TouchableOpacity>
								</View>
							)
						})}
					</View>
				) : (
					<TouchableOpacity onPress={() => handleCheck(item)}>
							<View style={[styles.checkbox, isChecked.checked && { backgroundColor: COMMON_COLORS.DEFAULT }]}>
							{isChecked.checked && (
								<Ionicons name="checkmark" size={24} color="white" />
							)}
						</View>
					</TouchableOpacity>
				)}
				<Text style={styles.text}>{label}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	checkbox: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		borderColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 5,
		borderWidth: 1,
		height: 36,
		justifyContent: 'center',
		marginRight: 12,
		width: 36
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 5,
		width: '100%'
	},
	content: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5
	},
	optionsStyle: {
		flexDirection: 'row'
	},
	text: {
		color: COMMON_COLORS.WHITE,
		fontSize: 24
	}
});

export default DailyItem;