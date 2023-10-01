
import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native"
import { TFinishedBooks } from "./models";
import { db, doc, getDoc } from '@/services/firebase';
import { DISTRIBUTION } from "@/services/firebase/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import { FINISHED } from "@/consts";
import SingleFinishedBook from "./components/SingleFinishedBook";

const FinishedBooksScreen = () => {
	const [finishedBooks, setFinishedBooks] = useState<TFinishedBooks>([]);

	useEffect(() => {
		const fetchInProgressBook = async () => {
			const finishedBookRef = await getDoc(doc(db, DISTRIBUTION, FINISHED));
			const finishedBookData = finishedBookRef.data()
			//const keys = Object.keys(finishedBookData || {})?.sort()?.reverse()
			//const sortedValues = keys?.map((key: string) => {
			//	console.log(finishedBookData?.[key])
			//	return (
			//		finishedBookData?.[key]
			//	)
			//})
			//console.log(sortedValues)
			//const sorted
			const finishedBooksValues = Object.values(finishedBookData || {});
			//console.log(new Date(finishedBooksValues?.[0]?.date))
			//finishedBooksValues?.sort((a, b) => new Date(b.date) - new Date(a.date));
			finishedBookData && setFinishedBooks(finishedBooksValues)
		}
		fetchInProgressBook()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				{finishedBooks?.length > 0 ? (
					<FlatList
						keyExtractor={(item) => item?.id}
						data={finishedBooks}
						renderItem={({ item, index }) => <SingleFinishedBook index={index + 1} finishedBook={item} />}
					/>
				) : (
					<Text style={styles.text}>עוד לא סיימנו...קדימה, תהיה הראשון!</Text>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1
	},
	content: {
		flex: 1,
		margin: 20
	},
	text: {
		fontSize: 16,
		textAlign: 'center'
	},
	//title: {
	//	fontSize: 24,
	//	margin: 20,
	//	textAlign: 'center'
	//}
});

export default FinishedBooksScreen;