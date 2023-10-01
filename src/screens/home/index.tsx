import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { RoutesNames } from "@/services/navigation/Routes";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { logoutHandler, retrieveUserData } from "@/utils";
import { BackendError } from "@/consts/AlertMessegesConsts";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBook } from "@/services/store/DistributionStore";
import { SELECTED_BOOKS } from "@/consts";
import { ApplicationState } from "@/services/store/models";
import { setIsStartToReadBook } from "@/services/store/GeneralStore";
import { db, doc, getDoc } from '@/services/firebase/index'
import { DISTRIBUTION, PROGRESS } from "@/services/firebase/consts";
import { THomeFinishedBook } from "./models";
import { COMMON_COLORS } from "@/services/sass/colors";
import { TSelectedBook } from "../books/models";
import HomeSingleRemainder from "./compenents/HomeSingleRemainder";

type Props = {
	navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
	const [userRemainders, setUserRemainders] = useState<THomeFinishedBook[]>([]);
	const [showUserRemainders, setShowUserRemainders] = useState<boolean>(false);

	const isStartToReadBook = useSelector((state: ApplicationState) => state.generalStore.isStartToReadBook)
	const userInfo = useSelector((state: ApplicationState) => state.authStore.userInfo)
	const dispatch = useDispatch()

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

	const bookPressedHandler = (selectedBook: TSelectedBook) => {
		dispatch(setSelectedBook({ selectedBook }))
		navigation.navigate(RoutesNames.PICK_DAYS_ROUTE as never)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.screenHeader}>
				<TouchableOpacity
					style={[styles.footerButton, { marginLeft: 40, backgroundColor: COMMON_COLORS.VERY_DARK_BLUE, marginBottom: 0 }]}
					onPress={() => logoutHandler(navigation, dispatch)}
				>
					<AntDesign name="logout" size={16} color='white' />
					<Text style={styles.footerButtonText}>התנתקות</Text>
				</TouchableOpacity>
				<View style={styles.screenTitle}>
					<Image style={styles.image} source={userInfo?.profilePicture ? { uri: userInfo?.profilePicture } : require('../../../assets/noProfile.png')} />
					<Text style={styles.displayName}>{userInfo.displayName}</Text>
				</View>
			</View>

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
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
		gap: 20
	},
	displayName: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 1
	},
	footerButton: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 10,
		flexDirection: 'row',
		gap: 6,
		justifyContent: 'center',
		marginHorizontal: 10,
		opacity: 0.8,
		paddingHorizontal: 12,
		paddingVertical: 8
	},
	footerButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16,
	},
	image: {
		borderRadius: 50,
		height: 80,
		marginVertical: 10,
		resizeMode: 'cover',
		width: 80
	},
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
	},
	screenHeader: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		flex: 1.5,
		justifyContent: 'space-between',
		width: '100%'
	},
	screenTitle: {
		alignItems: 'flex-end',
		marginRight: 20,
		marginTop: 10
	}
});

export default HomeScreen