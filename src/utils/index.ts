import { ANONYMIOUS, UID, daysOfWeek } from '@/consts';
import { auth, signOut } from '@/services/firebase';
import { setUserLoggedOut } from '@/services/store/AuthStore';
import { RoutesNames } from '@/services/navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveUserData = async () => {
	try {
		const value = await AsyncStorage.getItem(UID);
		if (value !== null) {
			return value
		}
	} catch (e) {
		console.log(e);
	}
}

export const isAnonymousUser = async () => {
	try {
		const value = await AsyncStorage.getItem(ANONYMIOUS);
		return value === ANONYMIOUS
	} catch (e) {
		console.log(e);
	}
}

export const logoutHandler = async (navigation: any, dispatch: any) => {
	try {
		await signOut(auth)
		await AsyncStorage.removeItem(UID);
		await AsyncStorage.removeItem(ANONYMIOUS);
		dispatch(setUserLoggedOut())
		navigation.navigate(RoutesNames.LOGIN_ROUTE)
	} catch (e) {
		console.log(e)
	}
}

export const validateEmail = (email: string) => {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern?.test(String(email)?.toLowerCase());
}

export const getDate = (date: Date) => {
	const day = date?.getDate()?.toString()?.padStart(2, '0');
	const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0');
	const year = date?.getFullYear()?.toString();
	return `${month}-${day}-${year}`;
}

export const getDay = (selectedDate: string) => {
	const editedDateArray = selectedDate.split('-')
	const editedDate = `${editedDateArray[2]}-${editedDateArray[0]}-${editedDateArray[1]}`
	return daysOfWeek[new Date(editedDate)?.getDay()]
}

export const dateDashesConvert = (dateString: string) => {
	const date = dateString.split('-');
	return `${date[1]}-${date[2]}-${date[0]}`;
}
