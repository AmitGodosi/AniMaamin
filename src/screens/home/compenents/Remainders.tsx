import { useState, useEffect } from 'react';
import { SELECTED_BOOKS } from "@/consts";
import { TSelectedBook } from "@/screens/books/models";
import { COMMON_COLORS } from "@/services/sass/colors";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBook } from "@/services/store/DistributionStore";
import { RoutesNames } from "@/services/navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import { THomeFinishedBook } from "../models";
import { Ionicons } from "@expo/vector-icons";
import { ApplicationState } from "@/services/store/models";
import { retrieveUserData } from "@/utils";
import { BackendError } from "@/consts/AlertMessegesConsts";
import { setIsStartToReadBook } from "@/services/store/GeneralStore";
import { db, doc, getDoc } from '@/services/firebase';
import { DISTRIBUTION, PROGRESS } from '@/services/firebase/consts';
import HomeSingleRemainder from "./HomeSingleRemainder";

const Remainders = () => {
	const [userRemainders, setUserRemainders] = useState<THomeFinishedBook[]>([]);
	const [showUserRemainders, setShowUserRemainders] = useState<boolean>(false);

	const dispatch = useDispatch()
	const navigation = useNavigation()
	const isStartToReadBook = useSelector((state: ApplicationState) => state.generalStore.isStartToReadBook)

	const bookPressedHandler = (selectedBook: TSelectedBook) => {
		dispatch(setSelectedBook({ selectedBook }))
		navigation.navigate(RoutesNames.PICK_DAYS_ROUTE as never)
	}

	useEffect(() => {
		const fetchUserRemainder = async () => {
			const uid = await retrieveUserData()
			if (!uid) {
				Alert.alert(BackendError);
				return;
			}
			const filteredRemainders = await fetchRemainders(uid)
			setUserRemainders(filteredRemainders || [])
			dispatch(setIsStartToReadBook({ isStartToReadBook: false }))
		}
		fetchUserRemainder()
	}, [isStartToReadBook])

	const fetchRemainders = async (dispatch: any) => {
		const uid = await retrieveUserData()
		if (!uid) {
			Alert.alert(BackendError);
			return;
		}
		const docRef = await getDoc(doc(db, DISTRIBUTION, uid));
		const docData = docRef.data()
		return Object.values(docData || {})?.filter((book: THomeFinishedBook) => book?.status === PROGRESS)
	}


	return (
		<View style={styles.remaindersWrapper}>
			<View style={styles.remaindersContainer}>
				<TouchableOpacity style={styles.remaindersHeader} onPress={() => setShowUserRemainders((prev) => !prev)}>
					{Object.keys(userRemainders || {})?.length > 0 && (
						<Ionicons name={`arrow-down-circle-${showUserRemainders ? 'sharp' : 'outline'}`} size={30} color={COMMON_COLORS.BLUE} />
					)}
					<Text style={[styles.remaindersHeaderText, Object.keys(userRemainders || {})?.length === 0 && { textAlign: 'right', width: '100%' }]}>
						התזכורות שלי {Object.keys(userRemainders || {})?.length > 0 && `(${Object.keys(userRemainders || {})?.length})`}
					</Text>
				</TouchableOpacity>
				{showUserRemainders && Object.keys(userRemainders || {})?.length > 0 && (
					<View style={styles.remainders}>
						<FlatList
							keyExtractor={(item) => item?.id}
							data={userRemainders}
							renderItem={({ item }: any) => <HomeSingleRemainder finishedBook={item} />}
						/>
					</View>
				)}
				{Object.keys(userRemainders || {})?.length === 0 && (
					<View style={styles.noRemainderContainer}>
						<Text style={styles.noRemaindersText}>עדיין לא בחרת, מה תרצה לקרוא?</Text>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity
								style={[styles.remainderButton, { backgroundColor: COMMON_COLORS.DARK_BLUE }]}
								onPress={() => bookPressedHandler(SELECTED_BOOKS.DVARIM as TSelectedBook)}
							>
								<Text style={{ color: COMMON_COLORS.WHITE, fontSize: 16 }}>קריאת ספר דברים</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.remainderButton, { backgroundColor: COMMON_COLORS.DARK_BLUE }]}
								onPress={() => bookPressedHandler(SELECTED_BOOKS.THILIM as TSelectedBook)}
							>
								<Text style={{ color: COMMON_COLORS.WHITE, fontSize: 16 }}>קריאת ספר תהילים</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</View>

	)
}


const styles = StyleSheet.create({
	noRemainderContainer: {
		alignItems: 'center',
		margin: 10,
		width: '100%'
	},
	noRemaindersText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16,
		padding: 10,
		textAlign: 'center'
	},
	remainderButton: {
		borderRadius: 5,
		margin: 10,
		padding: 10
	},
	remainders: {
		marginVertical: 20,
		width: '100%'
	},
	remaindersContainer: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 15,
		justifyContent: 'center',
		marginTop: 50,
		padding: 10,
		width: '80%'
	},
	remaindersHeader: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		textAlign: 'right',
		width: '100%'
	},
	remaindersHeaderText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20,
		marginBottom: 5
	},
	remaindersWrapper: {
		alignItems: 'center',
		flex: 5,
		width: '100%'
	}
});

export default Remainders;