import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { TCheckedCheckboxes, TDailyItem } from "./models";
import { ApplicationState } from "@/services/store/models";
import { EMPTY_STRING } from "@/consts/GeneralConsts";
import { getDay, isAnonymousUser, retrieveUserData } from "@/utils";
import { db, doc, getDoc, setDoc } from '@/services/firebase';
import { DAILY } from "@/consts";
import { DAILY_DATA } from "@/screens/daily/consts";
import { COMMON_COLORS } from "@/services/sass/colors";
import { BackendError, anonymiusUser } from "@/consts/AlertMessegesConsts";
import DailyItem from "./components/DailyItem";
import ModifiedTouchableOpacity from "@/common/ModifiedTouchableOpacity";
import CustomCalendar from "@/common/CustomCalendar";

const CHECKED_ITEMS_STATE_INITIAL_VALUE = { elements: {}, options: {} }

const DailyScreen = () => {
	const [checkedItems, setCheckedItems] = useState<TCheckedCheckboxes>(CHECKED_ITEMS_STATE_INITIAL_VALUE);
	const [dayName, setDayName] = useState(EMPTY_STRING)

	const selectedDate = useSelector((state: ApplicationState) => state?.generalStore?.dailySelectedDate)

	useEffect(() => {
		if (selectedDate) {
			const fetchDailyDataByDate = async () => {
				const dayName = getDay(selectedDate)
				setDayName(dayName)
				const uid = await retrieveUserData()
				if (uid) {
					const docRef = await getDoc(doc(db, DAILY, uid));
					const docData = docRef.data()?.[selectedDate]
					setCheckedItems(docData || CHECKED_ITEMS_STATE_INITIAL_VALUE)
				}
			}
			fetchDailyDataByDate()
		}
	}, [selectedDate])

	const saveDailyDataHandler = async () => {
		try {
			const isAnonymous = await isAnonymousUser()
			if (isAnonymous) {
				Alert.alert(anonymiusUser)
				return;
			}
			const uid = await retrieveUserData()
			const docData = { [selectedDate]: checkedItems }
			if (uid) {
				const docRef = doc(db, DAILY, uid);
				await setDoc(docRef, docData, { merge: true });
				Alert.alert('הנתונים נשמרו בהצלחה!')
			}
		} catch (e) {
			Alert.alert(BackendError)
		}
	}

	const handleCheck = (item: TDailyItem, index?: number) => {
		const { id, options, name: itemName } = item;

		setCheckedItems(prevState => {
			const newState = { ...prevState };
			if (options && index) {
				const isChecked = newState?.options?.[itemName] === index - 1;
				isChecked ? delete newState.options[itemName] : newState.options[itemName] = index - 1;
			} else {
				const isChecked = newState?.elements?.[itemName];
				isChecked ? delete newState.elements[itemName] : newState.elements[itemName] = id;
			}
			return newState;
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<CustomCalendar customStyle={styles.calendarIcon} pageName='daily' />
				<View style={styles.button}>
					<Text style={styles.buttonText}>{dayName}</Text>
				</View>
			</View>
			<View style={styles.itemsContainer}>
				<View style={styles.options}>
					<Ionicons style={styles.option} name="person-outline" size={24} color={COMMON_COLORS.VERY_DARK_BLUE} />
					<SimpleLineIcons style={styles.option} name="people" size={24} color={COMMON_COLORS.VERY_DARK_BLUE} />
				</View>
				<View style={styles.itemsList}>
					<FlatList
						data={DAILY_DATA}
						keyExtractor={(item) => item?.id}
						renderItem={({ item }) => <DailyItem handleCheck={handleCheck} item={item} checkedItems={checkedItems} />}
					/>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<ModifiedTouchableOpacity
					onPress={saveDailyDataHandler}
					title="שמירה"
					ButtonClassName={styles.button}
					TextClassName={styles.buttonText}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: COMMON_COLORS.VERY_DARK_BLUE,
		borderRadius: 10,
		opacity: 0.85,
		padding: 10
	},
	buttonContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'space-between',
		marginTop: 20
	},
	buttonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16,
		letterSpacing: 1,
		textAlign: 'center'
	},
	calendarIcon: {
		left: 20,
		position: 'absolute'
	},
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
		paddingTop: 20
	},
	header: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 50,
		marginTop: 20,
		position: 'relative',
		width: '100%'
	},
	itemsContainer: {
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 20,
		flex: 4,
		width: '90%',
	},
	itemsList: {
		alignSelf: 'flex-end',
		width: '100%'
	},
	option: {
		marginLeft: 25
	},
	options: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: 20
	}
});

export default DailyScreen;