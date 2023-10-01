import { initializeApp } from 'firebase/app';
import {
	getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, signInAnonymously
} from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UID } from '@/consts';

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
	measurementId: process.env.EXPO_PUBLIC_APP_ID,
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