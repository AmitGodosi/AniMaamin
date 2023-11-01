import { useState, useReducer } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RootStackParamList, RoutesNames } from '@/services/navigation/Routes';
import { auth, createUserWithEmailAndPassword, db, doc, ref, setDoc, storage, uploadBytes } from '@/services/firebase'
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { EMPTY_STRING } from '@/consts/GeneralConsts';
import { unfilledInput, incorrectEmail, BackendError, unmatchedPasswords } from '@/consts/AlertMessegesConsts';
import { validateEmail } from '../../utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { signupReducer, signupReducerInitialState } from '@/services/reducers/signupReducer';
import { ApplicationState } from '../../services/store/models';
import { COMMON_COLORS } from '@/services/sass/colors';
import {
	SET_DISPLAYNAME_BLUR, SET_DISPLAYNAME_FOCUS, SET_EMAIL_BLUR, SET_EMAIL_FOCUS, SET_PASSWORD2_BLUR, SET_PASSWORD2_FOCUS, SET_PASSWORD_BLUR, SET_PASSWORD_FOCUS
} from '@/services/reducers/reducersConsts';
import ImagePicker from '../../common/ImagePicker';

type Props = NativeStackScreenProps<RootStackParamList, RoutesNames.SIGNUP_ROUTE>;

export default function SignupScreen({ navigation }: Props) {
	const [displayName, setDisplayName] = useState<string>(EMPTY_STRING)
	const [email, setEmail] = useState<string>(EMPTY_STRING)
	const [password, setPassword] = useState<string>(EMPTY_STRING)
	const [password2, setPassword2] = useState(EMPTY_STRING);
	const [reducerState, reducerDispatch] = useReducer(signupReducer, signupReducerInitialState);

	const profilePicture = useSelector((state: ApplicationState) => state?.generalStore.profilePicture)

	const handleSignup = async () => {
		try {
			if (!email || !password || !password2 || !displayName) {
				Alert.alert(unfilledInput);
				return;
			}
			const isValidEmaild = !validateEmail(email) && email !== EMPTY_STRING
			if (isValidEmaild || (password2 !== password)) {
				Alert.alert(isValidEmaild ? incorrectEmail : unmatchedPasswords);
				return;
			}
			await createUserWithEmailAndPassword(auth, email, password)
			if (auth.currentUser) {
				const uid = auth?.currentUser?.uid
				saveUserInfo(uid)
				if (profilePicture) {
					const storageRef = ref(storage, uid);
					await uploadBytes(storageRef, profilePicture)
				}
				navigation.navigate(RoutesNames.LOGIN_ROUTE)
			}
		} catch (e) {
			Alert.alert(BackendError)
		}
	};

	const saveUserInfo = async (uid: string) => {
		try {
			const userData = { email, displayName, isAdmin: false }
			const docRef = doc(db, "users", uid);
			await setDoc(docRef, userData);
		} catch (e) {
			Alert.alert("Error adding document")
		}
	}

	return (
		<>
			<StatusBar hidden />
			<View style={styles.container}>
				<LinearGradient
					colors={[COMMON_COLORS.VERY_DARK_BLUE, COMMON_COLORS.VERY_LIGHT_BLUE]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.header}
				/>
				<View style={styles.formWrapper}>
					<Text style={[styles.subtitle, { marginBottom: 30 }]}>הרשם עכשיו כדי שנוכל להתחיל !</Text>
					<View style={[styles.inputContainer, reducerState?.isDisplayNameFocused && styles.isFocused]}>
						<TextInput
							style={styles.input}
							placeholder="שם מלא"
							returnKeyType="next"
							onChangeText={setDisplayName}
							onFocus={() => reducerDispatch({ type: SET_DISPLAYNAME_FOCUS })}
							onBlur={() => reducerDispatch({ type: SET_DISPLAYNAME_BLUR })}
						/>
						<AntDesign style={styles.icon} name="user" size={24} color="black" />
					</View>
					<View style={[styles.inputContainer, reducerState?.isEmailFocused && styles.isFocused]}>
						<TextInput
							style={styles.input}
							placeholder="אימייל"
							keyboardType="email-address"
							returnKeyType="next"
							onChangeText={setEmail}
							onFocus={() => reducerDispatch({ type: SET_EMAIL_FOCUS })}
							onBlur={() => reducerDispatch({ type: SET_EMAIL_BLUR })}
						/>
						<MaterialCommunityIcons style={styles.icon} name="email-outline" size={24} color="black" />
					</View>
					<View style={[styles.inputContainer, reducerState?.isPasswordFocused && styles.isFocused]}>
						<TextInput
							style={styles.input}
							placeholder="סיסמא"
							secureTextEntry
							returnKeyType="done"
							onChangeText={setPassword}
							onFocus={() => reducerDispatch({ type: SET_PASSWORD_FOCUS })}
							onBlur={() => reducerDispatch({ type: SET_PASSWORD_BLUR })}
						/>
						<Ionicons style={styles.icon} name="lock-closed-outline" size={24} color="black" />
					</View>
					<View style={[styles.inputContainer, reducerState?.isPassword2Focused && styles.isFocused]}>
						<TextInput
							style={styles.input}
							placeholder="אימות סיסמא"
							secureTextEntry
							returnKeyType="done"
							onChangeText={setPassword2}
							onFocus={() => reducerDispatch({ type: SET_PASSWORD2_FOCUS })}
							onBlur={() => reducerDispatch({ type: SET_PASSWORD2_BLUR })}
						/>
						<Ionicons style={styles.icon} name="lock-closed-outline" size={24} color="black" />
					</View>
					<View style={styles.imageContainer}>
						<ImagePicker />
					</View>
					<LinearGradient
						colors={[COMMON_COLORS.VERY_DARK_BLUE, COMMON_COLORS.LIGHT_BLUE]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.gradient}
					>
						<TouchableOpacity style={styles.button} onPress={handleSignup}>
							<AntDesign name="arrowleft" size={24} color="white" />
							<Text style={styles.buttonText}>הרשמה</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
				<View style={styles.signinContainer}>
					<LinearGradient
						colors={[COMMON_COLORS.VERY_DARK_BLUE, COMMON_COLORS.LIGHT_BLUE]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{ marginHorizontal: 10, borderRadius: 50 }}
					>
						<TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate(RoutesNames.LOGIN_ROUTE)}>
							<Text style={{ color: COMMON_COLORS.WHITE, fontWeight: 'bold' }}>התחבר עכשיו</Text>
						</TouchableOpacity>
					</LinearGradient>
					<Text style={styles.subtitle}>נרשמת כבר?</Text>
				</View>
			</View>

		</>
	);
}
const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	buttonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 18,
		marginLeft: 10
	},
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
		justifyContent: 'center'
	},
	formWrapper: {
		alignItems: 'center',
		flex: 5,
		justifyContent: 'center',
		paddingHorizontal: '10%',
		width: '100%'
	},
	gradient: {
		alignSelf: 'flex-start',
		borderRadius: 25,
		marginVertical: 20
	},
	header: {
		alignSelf: 'flex-end',
		borderBottomEndRadius: 25,
		borderBottomStartRadius: 80,
		borderTopStartRadius: 60,
		flex: 1,
		width: '25%'
	},
	icon: {
		flex: 1,
		marginLeft: 10
	},
	imageContainer: {
		flex: 2,
		width: '60%'
	},
	input: {
		flex: 9,
		height: 20,
		textAlign: 'right'
	},
	inputContainer: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 16,
		padding: 8,
		shadowColor: COMMON_COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	isFocused: {
		transform: [{ scale: 1.05 }]
	},
	signinContainer: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	signupButton: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	subtitle: {
		color: COMMON_COLORS.VERY_DARK_GREY,
		fontSize: 20,
		fontWeight: 'bold'
	}
});
