import { BlessingList } from "@/screens/blessing/consts";
import { TBlessingItemInfo } from "../models";
import { FlatList, StyleSheet, Text, View } from "react-native"
import { COMMON_COLORS } from "@/services/sass/colors";

const InfoModal = () => {
	const RenderBlessing = (item: TBlessingItemInfo) => {
		const { item: itemData } = item || {}
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
				<Text style={{ fontSize: 16, fontWeight: 'bold' }}>{itemData?.amount}</Text>
				<Text style={{ fontSize: 16 }}>{itemData?.label}</Text>
			</View>
		)
	}

	return (
		<View style={styles.modal}>
			<FlatList
				data={Object.values(BlessingList)}
				renderItem={({ item }: any) => <RenderBlessing item={item} />}
				keyExtractor={(item: any) => item?.id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 10,
		padding: 20,
		width: '80%'
	}
});

export default InfoModal;