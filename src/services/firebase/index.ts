import { initializeApp } from 'firebase/app';
import {
	getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, signInAnonymously
} from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UID } from '@/consts';
import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from '@env';

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'havodathashem.firebaseapp.com',
	projectId: 'havodathashem',
	storageBucket: 'havodathashem.appspot.com',
	messagingSenderId: '724085087659',
	appId: '1:724085087659:web:514b221df263fa2af986ee',
	measurementId: 'G-0V53K7E8RC',
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

onAuthStateChanged(auth, async (user) => {
	if (user) {
		await AsyncStorage.setItem(UID, user?.uid);
	} else {
		await AsyncStorage.removeItem(UID);
	}
});

export {
	app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInAnonymously,
	db, collection, setDoc, doc, getDoc,
	storage, ref, uploadBytes, getDownloadURL
}