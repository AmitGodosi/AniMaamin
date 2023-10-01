import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { BlessingActionAdd, HUNDRED_BLESSING_PAGE_TITLES, BlessingList as BlessingListData } from "@/screens/blessing/consts";
import { Ionicons } from "@expo/vector-icons";
import { ApplicationState } from "@/services/store/models";
import { EMPTY_STRING } from "@/consts/GeneralConsts";
import { setBlessingInitialState } from "@/services/store/BlessingStore";
import { getDay, isAnonymousUser, retrieveUserData } from "@/utils";
import { BlessingResponse } from "@/services/interfaces/API";
import { COMMON_COLORS } from "@/services/sass/colors";
import { anonymiusUser, userNotLoggedIn } from "@/consts/AlertMessegesConsts";
import { BLESSING } from "@/services/firebase/consts";
import { IBessingListData, TBlessing } from "./models";
import { db, doc, getDoc, setDoc } from '@/services/firebase';
import CustomCalendar from "@/common/CustomCalendar";
import BlessingList from "./components/BlessingList";
import InfoModal from "./components/InfoModal";
import CustomModal from "@/common/Modal";

const BlessingScreen = () => {
	const selectedDate = useSelector((state: ApplicationState) => state?.generalStore?.blessingSelectedDate)
	const allBlessing = useSelector((state: ApplicationState) => state?.blessingStore?.allBlessing)

	const [addedBlessing, setAddedBlessing] = useState<IBessingListData>({})
	const [unAddedBlessing, setUnAddedBlessing] = useState<IBessingListData>(BlessingListData)
	const [amountOfAddedBlessing, setAmountOfAddedBlessing] = useState(0)
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	const [dayName, setDayName] = useState(EMPTY_STRING)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setBlessingInitialState({ allBlessing: BlessingListData }))
	}, [])

	useEffect(() => {
		if (selectedDate) {
			const fetchDailyDataByDate = async () => {
				const dayName = getDay(selectedDate)
				setDayName(dayName)
				const uid = await retrieveUserData()
				if (uid) {
					const docRef = await getDoc(doc(db, BLESSING, uid));
					const docData: BlessingResponse = docRef.data()?.[selectedDate]
					if (!docData) {
						setInitialState();
						return;
					}
					const addedBlessingKeys = Object.keys(docData?.blessing)
					const unaddedKeys = { ...allBlessing }
					addedBlessingKeys.forEach((key: string) => delete unaddedKeys[key])
					setAddedBlessing(docData?.blessing)
					setUnAddedBlessing(unaddedKeys)
					setAmountOfAddedBlessing(docData?.amount)
				}
			}
			fetchDailyDataByDate()
		}
	}, [selectedDate])

	const clickedBlessingHandler = (clickedBlessing: TBlessing, actionType: string) => {
		const { id, amount } = clickedBlessing;
		const isAddType = actionType === BlessingActionAdd;
		const selectedState = isAddType ? { ...unAddedBlessing } : { ...addedBlessing };
		delete selectedState[id];
		setAddedBlessing(prevState => isAddType ? { ...prevState, [id]: clickedBlessing } : selectedState);
		setUnAddedBlessing(prevState => isAddType ? selectedState : { ...prevState, [id]: allBlessing[id] });
		setAmountOfAddedBlessing(prevState => prevState + (isAddType ? amount : -amount));
	}

	const changeAmount = (clickedBlessing: TBlessing, actionType: string) => {
		const { id, amount } = clickedBlessing;
		const initalAmount = allBlessing?.[id]?.amount;
		const isAddType = actionType === BlessingActionAdd;
		const updatedClickedBlessing = {
			...clickedBlessing,
			amount: isAddType ? amount + initalAmount : amount - initalAmount
		};
		const { amount: updatedClickedBlessingAmount, id: updatedClickedBlessingId } = updatedClickedBlessing;
		if (updatedClickedBlessingAmount === 0) {
			setAddedBlessing(prevState => {
				const updatedAddedBlessing = { ...prevState };
				delete updatedAddedBlessing[id];
				return updatedAddedBlessing;
			});
			setUnAddedBlessing(prevState => ({ ...prevState, [id]: clickedBlessing }));
			setAmountOfAddedBlessing(prevState => prevState - amount);
		} else {
			setAddedBlessing(prevState => ({ ...prevState, [updatedClickedBlessingId]: updatedClickedBlessing }));
			setAmountOfAddedBlessing(prevState => prevState + (isAddType ? initalAmount : -initalAmount));
		}
	}

	const setInitialState = () => {
		setAddedBlessing({})
		setUnAddedBlessing(BlessingListData)
		setAmountOfAddedBlessing(0)
	}

	const saveBlessingDataHandler = async () => {
		try {
			const isAnonymous = await isAnonymousUser()
			if (isAnonymous) {
				Alert.alert(anonymiusUser)
				return;
			}
			const uid = await retrieveUserData()
			if (uid) {
				const docData = { [selectedDate]: { blessing: addedBlessing, amount: amountOfAddedBlessing } }
				const docRef = doc(db, BLESSING, uid);
				await setDoc(docRef, docData, { merge: true });
				Alert.alert('הנתונים נשמרו בהצלחה!')
			} else {
				Alert.alert(userNotLoggedIn)
			}
		} catch (e) {
			Alert.alert("Error adding document")
		}
	}

	const ScreenHeader = () => (
		<View style={styles.headerButtons}>
			<CustomCalendar customStyle={[styles.headerButton, { left: 20 }]} pageName='blessing' />
			<View style={styles.button}>
				<Text style={styles.buttonText}>{dayName}</Text>
			</View>
			<TouchableOpacity onPress={saveBlessingDataHandler} style={[styles.headerButton, { right: 20 }]}>
				<Ionicons name="save-outline" size={36} color="black" />
			</TouchableOpacity>
		</View>
	)

	const ScreenTitle = () => (
		<View style={styles.textContainer}>
			<Text style={styles.titleNumber}>{amountOfAddedBlessing} / 100</Text>
			<Ionicons onPress={() => setIsInfoModalOpen(true)} style={styles.info} name="md-information-circle-outline" size={30} color={COMMON_COLORS.DARK_BLUE} />
		</View>
	)

	const isAddedBlessing = !!Object.keys(addedBlessing || {})?.length;
	const isUnAddedBlessing = !!Object.keys(unAddedBlessing || {})?.length;

	return (
		<>
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<ScreenHeader />
					<ScreenTitle />
					<View style={styles.content}>
						{isUnAddedBlessing && (
							<BlessingList
								changeAmount={changeAmount}
								onClickedBlessing={clickedBlessingHandler}
								BlessingListData={unAddedBlessing}
								title={HUNDRED_BLESSING_PAGE_TITLES.ADD}
								isAddedSection={false}
							/>
						)}
						{isAddedBlessing && (
							<BlessingList
								changeAmount={changeAmount}
								onClickedBlessing={clickedBlessingHandler}
								BlessingListData={addedBlessing}
								title={HUNDRED_BLESSING_PAGE_TITLES.EXIST}
								isAddedSection
							/>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
			{isInfoModalOpen && (
				<CustomModal onClose={() => setIsInfoModalOpen(false)} visible={isInfoModalOpen} animationType="fade" transparent>
					<InfoModal />
				</CustomModal>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: COMMON_COLORS.VERY_DARK_BLUE,
		borderRadius: 10,
		opacity: 0.85,
		padding: 10
	},
	buttonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16,
		letterSpacing: 1,
		textAlign: 'center'
	},
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
		justifyContent: 'flex-start'
	},
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	headerButton: {
		position: 'absolute',
	},
	headerButtons: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
		position: 'relative',
		width: '100%'
	},
	info: {
		position: 'absolute',
		right: 20
	},
	textContainer: {
		alignItems: 'flex-end',
		flexDirection: 'row-reverse',
		justifyContent: 'center',
		marginTop: 15,
		position: 'relative',
		textAlign: 'center'
	},
	titleNumber: {
		fontSize: 28,
		fontWeight: 'bold',
		marginHorizontal: 5
	}
});

export default BlessingScreen;