import { auth, db, doc, getDoc, getDownloadURL, ref, signInWithEmailAndPassword, storage } from '@/services/firebase'
import { EMPTY_STRING } from '@/consts/GeneralConsts'

export const login = async (email: string, password: string) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password)
	return user?.uid
}

export const insertUserDateils = async (uid: string) => {
	const docRef = await getDoc(doc(db, "users", uid));
	return docRef.data();
}

export const fetchProfilePicture = async (uid: string) => {
	try {
		const url = await getDownloadURL(ref(storage, uid))
		return url;
	} catch (e) {
		return EMPTY_STRING;
	}
}