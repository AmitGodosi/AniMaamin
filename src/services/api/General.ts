import { db, doc, getDoc } from '@/services//firebase'
import { Alert } from "react-native";
import { DISTRIBUTION, PROGRESS } from '@/services/firebase/consts';
import { FINISHED } from '@/consts';
import { BackendError } from '@/consts/AlertMessegesConsts';
import { THomeFinishedBook } from '@/screens/home/models';
import { setIsStartToReadBook } from '../store/GeneralStore';
import { retrieveUserData } from '@/utils';

export const fetchRemainders = async (dispatch: any) => {
	console.log('start fetching')
	const uid = await retrieveUserData()
	console.log('uid', uid)
	if (!uid) {
		Alert.alert(BackendError);
		return;
	}
	const docRef = await getDoc(doc(db, DISTRIBUTION, uid));
	const docData = docRef.data()
	console.log(docData)
	dispatch(setIsStartToReadBook({ isStartToReadBook: false }))
	return Object.values(docData || {})?.filter((book: THomeFinishedBook) => book?.status === PROGRESS)
}

export const fetchFinishedBooks = async () => {
	const finishedBookRef = await getDoc(doc(db, DISTRIBUTION, FINISHED));
	const finishedBookData = finishedBookRef.data()
	const finishedBooksValues = Object.values(finishedBookData || {});
	return finishedBooksValues;
}