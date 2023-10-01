import { useEffect, useState } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../services/store/models';
import { Ionicons } from '@expo/vector-icons';
import { DAILY } from '@/consts';
import { dateDashesConvert, getDate } from '@/utils';
import { TDay } from '@/services/interfaces';
import { setBlessingSelectedDate, setDailySelectedDate } from '@/services/store/GeneralStore';
import CustomModal from './Modal'

type Props = {
	pageName: 'daily' | 'blessing';
	customStyle?: StyleProp<ViewStyle>;
}

export default function CustomCalendar({ pageName, customStyle }: Props) {
	const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
	const selectedDate = useSelector((state: ApplicationState) => pageName === DAILY ? state?.generalStore?.dailySelectedDate : state?.generalStore?.blessingSelectedDate)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!selectedDate) {
			const date = getDate(new Date())
			dispatch(pageName === DAILY ? setDailySelectedDate({ date }) : setBlessingSelectedDate({ date }))
		}
	}, [])

	const handleDayPress = (day: TDay) => {
		const date = dateDashesConvert(day?.dateString);
		dispatch(pageName === DAILY ? setDailySelectedDate({ date }) : setBlessingSelectedDate({ date }))
		setIsCalendarModalOpen(false)
	};

	return (
		<View style={customStyle}>
			<View style={styles.buttonContainer}>
				<Ionicons onPress={() => setIsCalendarModalOpen(true)} name="calendar-outline" size={36} color="black" />
			</View>
			<CustomModal visible={isCalendarModalOpen} onClose={() => setIsCalendarModalOpen(false)} animationType="fade" transparent>
				<Calendar
					style={styles.calendarStyle}
					onDayPress={handleDayPress}
					markedDates={{
						[String(selectedDate)]: { selected: true }
					}}
				/>
			</CustomModal>
		</View>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'center'
	},
	calendarStyle: {
		borderRadius: 10
	}
});