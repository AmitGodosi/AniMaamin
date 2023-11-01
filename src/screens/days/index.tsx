import { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { ApplicationState } from "../../services/store/models";
import { getDate, isAnonymousUser, retrieveUserData } from "@/utils";
import { TUserFinishedBook } from "../finished-books/models";
import { DISTRIBUTION, PROGRESS } from "@/services/firebase/consts";
import { BackendError, anonymiusUser } from "@/consts/AlertMessegesConsts";
import { FINISHED, SELECTED_BOOKS, SELECTED_BOOKS_NAMES, daysOfWeekShortend } from "@/consts";
import { setIsStartToReadBook } from "@/services/store/GeneralStore";
import { RoutesNames } from "@/services/navigation/Routes";
import { COMMON_COLORS } from "@/services/sass/colors";
import { NUMBER_OF_DAYS } from "./consts";
import { db, doc, getDoc, setDoc } from '@/services/firebase';
import CustomModal from "@/common/Modal";
import PickDay from "../books/components/PickDay";
import ConfrmationPickedDaysModal from "../books/components/ConfrmationPickedDaysModal";
import { useQuery } from "@tanstack/react-query";
import { fetchInProgressBook } from "@/services/api/General";

const DaysScreen = () => {
	const [checkedItems, setCheckedItems] = useState<string[]>([]);
	const [checkedItemsNames, setCheckedItemsNames] = useState<string[]>([]);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [inProgressBook, setInProgressBook] = useState<Partial<TUserFinishedBook>>();
	const [isLoading, setIsLoading] = useState(false)

	const distributionState = useSelector((state: ApplicationState) => state?.distributionStore)
	const { displayName } = useSelector((state: ApplicationState) => state?.authStore.userInfo)

	const navigation = useNavigation()
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		navigation.setOptions({
			title: distributionState?.selectedBook === SELECTED_BOOKS.DVARIM ? SELECTED_BOOKS_NAMES.DVARIM : SELECTED_BOOKS_NAMES.THILIM
		})
	}, [])

	const { error, data } = useQuery({
		queryKey: ['in-progress-book'],
		queryFn: () => fetchInProgressBook(distributionState, dispatch)
	})

	//useEffect(() => {
	//	const fetchInProgressBook = async () => {
	//		try {
	//			const progressBookRef = doc(db, DISTRIBUTION, `${distributionState?.selectedBook}${PROGRESS}`);
	//			const docProgressBookRef = await getDoc(progressBookRef);
	//			const docProgressBookRefData = docProgressBookRef.data()
	//			Object.keys(docProgressBookRefData)?.length > 0 && setInProgressBook(docProgressBookRefData)	
	//		} catch (error) {
	//			Alert.alert(BackendError)
	//		}
	//	}
	//	fetchInProgressBook()
	//}, [])

	const handleCheck = (itemId: string) => {
		const isChecked = checkedItems.includes(itemId);
		const dayName = daysOfWeekShortend[Number(itemId) - 1]
		setCheckedItems(isChecked ? checkedItems.filter((id) => id !== itemId) : [...checkedItems, itemId]);
		setCheckedItemsNames(isChecked ? checkedItemsNames.filter((id) => id !== dayName) : [...checkedItemsNames, dayName])
	}

	const handleModalButtonsEvent = async (isApprove: boolean) => {
		try {
			if (isApprove) {
				const isAnonymous = await isAnonymousUser()
				if (isAnonymous) {
					setIsOpenModal(false)
					Alert.alert(anonymiusUser)
					return;
				}
				const uid = await retrieveUserData()
				setIsLoading(true)
				if (uid) {
					const today = getDate(new Date())
					const id = new Date().getTime();
					const book = distributionState?.selectedBook;

					await saveBookToMainDB(uid, today, id, book)
					await saveBookToUserDB(uid, today, id, book)

					dispatch(setIsStartToReadBook({ isStartToReadBook: true }))
					setCheckedItems([])
					navigation.navigate(RoutesNames.FINISHED_BOOKS_ROUTE as never)
					setIsLoading(false)
				}
			}
			setIsOpenModal(false);
		} catch (e) {
			setIsLoading(false)
			Alert.alert(BackendError)
		}
	}

	const saveBookToMainDB = async (uid: string, today: string, id: number, book: string) => {
		const disabledItems = inProgressBook?.totalDays || []
		const updatedTotalDays = [...disabledItems, ...checkedItems]
		const isFinished = updatedTotalDays?.length === 7;

		const updatedContributors = [
			...(inProgressBook?.contributors ?? []),
			{
				id: uid,
				name: displayName,
				days: checkedItems
			}
		]

		const updatedProgressBook = {
			...(isFinished ? { status: FINISHED } : { totalDays: updatedTotalDays }),
			contributors: updatedContributors,
			date: today,
			id,
			book
		}

		const progressBookRef = doc(db, DISTRIBUTION, `${book}${PROGRESS}`);
		if (isFinished) {
			const finishedBooksRef = doc(db, DISTRIBUTION, FINISHED);
			await setDoc(finishedBooksRef, { [id]: updatedProgressBook }, { merge: true });
			await setDoc(progressBookRef, {});
		} else {
			await setDoc(progressBookRef, updatedProgressBook, { merge: true });
		}
	}

	const saveBookToUserDB = async (uid: string, today: string, id: number, book: string) => {
		const userDocData = {
			[id]: {
				id,
				book,
				date: today,
				daysToRead: checkedItemsNames,
				status: PROGRESS
			}
		}

		const docRef = doc(db, DISTRIBUTION, uid);
		await setDoc(docRef, userDocData, { merge: true });
	}

const editedCheckedItems = `${checkedItems.sort((a, b) => Number(b) - Number(a))}`;

	return (
		<View style={styles.container}>
			<View style={styles.daysContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>אילו ימים את/ה מעוניין לקרוא?</Text>
				</View>
				<FlatList
					data={NUMBER_OF_DAYS}
					keyExtractor={(item) => item?.id}
					renderItem={({ item }) => (
						<PickDay
							item={item}
							disabledItems={inProgressBook?.totalDays || []}
							handleCheck={handleCheck}
							checkedItems={checkedItems}
						/>
					)}
				/>
			</View>
			<View style={styles.startButtonView}>
				<TouchableOpacity style={styles.startButton} disabled={!checkedItems?.length} onPress={() => setIsOpenModal(true)}>
					{isLoading ? (
						<ActivityIndicator color={COMMON_COLORS.WHITE} />
					) : (
						<Text style={styles.startButtonText}>התחל</Text>
					)}
				</TouchableOpacity>
			</View>
			{isOpenModal && (
				<CustomModal onClose={() => setIsOpenModal(false)} visible={isOpenModal} animationType="fade" transparent>
					<ConfrmationPickedDaysModal checkedItems={editedCheckedItems} onPress={handleModalButtonsEvent} />
				</CustomModal>
			)}
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
	},
	daysContainer: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingHorizontal: 2,
		width: '100%',
	},
	startButton: {
		backgroundColor: COMMON_COLORS.DARK_BLUE,
		borderRadius: 5,
		elevation: 5,
		margin: 10,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	startButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16
	},
	startButtonView: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'flex-start'
	},
	text: {
		color: COMMON_COLORS.DARK_BLUE,
		fontSize: 24,
		letterSpacing: .5
	},
	textContainer: {
		alignItems: 'center',
		flex: 4,
		justifyContent: 'flex-end',
		paddingVertical: 30
	}
});

export default DaysScreen;