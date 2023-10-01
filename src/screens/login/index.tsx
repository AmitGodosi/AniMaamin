import { useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth, signInAnonymously } from '@/services/firebase'
import { logoutHandler, validateEmail } from '@/utils';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { RootStackParamList, RoutesNames } from '@/services/navigation/Routes';
import { EMPTY_STRING } from '@/consts/GeneralConsts';
import { loginReducer, loginReducerInitialState } from '@/services/reducers/LoginReducer';
import { BackendError, incorrectEmail, unfilledInput } from '@/consts/AlertMessegesConsts';
import { fetchProfilePicture, insertUserDateils, login } from '@/services/api/Auth';
import { ANONYMIOUS, UID } from '@/consts';
import { setUserLoggedIn } from '@/services/store/AuthStore';
import { SET_EMAIL_BLUR, SET_EMAIL_FOCUS, SET_PASSWORD_BLUR, SET_PASSWORD_FOCUS } from '@/services/reducers/reducersConsts';
import { COMMON_COLORS } from '@/services/sass/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModifiedTouchableOpacity from '@/common/ModifiedTouchableOpacity';
import CustomModal from '@/common/Modal';
import ResetPasswordModal from './components/ResetPasswordModal';

type Props = NativeStackScreenProps<RootStackParamList, RoutesNames.LOGIN_ROUTE>;

export default function LoginScreen({ navigation }: Props) {
	const [email, setEmail] = useState<string>(EMPTY_STRING)
	const [password, setPassword] = useState<string>(EMPTY_STRING)
	const [isResetPassowrdModalOpen, setIsResetPassowrdModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const [reducerState, reducerDispatch] = useReducer(loginReducer, loginReducerInitialState);
	const dispatch = useDispatch()
	
	const handleLogin = async () => {
		try {
			if (!email || !password) {
				Alert.alert(unfilledInput);
				return;
			}
			if (!validateEmail(email.trim()) && email !== EMPTY_STRING) {
				Alert.alert(incorrectEmail)
				return
			}
			setIsLoading(true)
			const uid = await login(email?.trim(), password)
			if (uid) {
				await handleUserData(uid)
			} else {
				setIsLoading(false)
				Alert.alert(BackendError)
			}
		} catch (e) {
			setIsLoading(false)
			Alert.alert(BackendError)
		}
	};

	const handleUserData = async (uid: string) => {
		try {
			const response = await insertUserDateils(uid) 
			if (!response) {
				await logoutHandler(navigation, dispatch)
				Alert.alert(BackendError)
				return;
			}
			const { displayName, isAdmin } = response;
			const profilePicture = await fetchProfilePicture(uid)
			dispatch(setUserLoggedIn({ userInfo: { displayName, isAdmin, uid, profilePicture } }))
			await AsyncStorage.setItem(UID, uid);
			navigation.navigate(RoutesNames.TABS_ROUTE)
			setIsLoading(false)
		} catch (e) {
			Alert.alert(BackendError)
		}
	}

	const handleAnonymousLogin = async () => {
		try {
			await signInAnonymously(auth)
			await AsyncStorage.setItem(ANONYMIOUS, ANONYMIOUS);
			navigation.navigate(RoutesNames.TABS_ROUTE)
		} catch (e) {
			console.log(e);
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
					<Text style={[styles.subtitle, { marginBottom: 30 }]}>התחברות</Text>
					<View style={[styles.inputContainer, reducerState.isEmailFocused && styles.isFocused]}>
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
					<View style={[styles.inputContainer, reducerState.isPasswordFocused && styles.isFocused]}>
						<TextInput
							style={styles.input}
							placeholder="סיסמא"
							secureTextEntry
							returnKeyType="done"
							onChangeText={setPassword}
							onSubmitEditing={handleLogin}
							onFocus={() => reducerDispatch({ type: SET_PASSWORD_FOCUS })}
							onBlur={() => reducerDispatch({ type: SET_PASSWORD_BLUR })}
						/>
						<Ionicons style={styles.icon} name="lock-closed-outline" size={24} color="black" />
					</View>
					<ModifiedTouchableOpacity
						title='שחזור סיסמא'
						onPress={() => setIsResetPassowrdModalOpen(true)}
						ButtonClassName={[styles.link, { alignSelf: 'flex-end' }]}
						TextClassName={styles.linkText}
					/>
					<View style={{ alignSelf: 'flex-start' }}>
						<LinearGradient
							colors={[COMMON_COLORS.VERY_DARK_BLUE, COMMON_COLORS.LIGHT_BLUE]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.gradient}
						>
							<TouchableOpacity style={styles.button} onPress={handleLogin}>
								{isLoading ? (
									<ActivityIndicator color={COMMON_COLORS.WHITE} />
								) : (
									<>
										<AntDesign name="arrowleft" size={24} color="white" />
										<Text style={styles.buttonText}>כניסה</Text>
									</>
								)}
							</TouchableOpacity>
						</LinearGradient>
						<ModifiedTouchableOpacity
							title='כניסה כאורח'
							onPress={handleAnonymousLogin}
							ButtonClassName={[styles.link, { alignSelf: 'center' }]}
							TextClassName={styles.linkText}
						/>
					</View>
				</View>
				<View style={styles.signupContainer}>
					<LinearGradient
						colors={[COMMON_COLORS.VERY_DARK_BLUE, COMMON_COLORS.LIGHT_BLUE]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{ marginHorizontal: 10, borderRadius: 50 }}
					>
						<TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate(RoutesNames.SIGNUP_ROUTE)}>
							<Text style={{ color: COMMON_COLORS.WHITE, fontWeight: 'bold' }}>הרשם עכשיו</Text>
						</TouchableOpacity>
					</LinearGradient>
					<Text style={styles.subtitle}>עוד לא נרשמת?</Text>
				</View>
			</View >
			{isResetPassowrdModalOpen && (
				<CustomModal
					onClose={() => setIsResetPassowrdModalOpen(false)}
					visible={isResetPassowrdModalOpen}
					animationType='fade'
					transparent
				>
					<ResetPasswordModal
						closeModal={() => setIsResetPassowrdModalOpen(false)}
					/>
				</CustomModal>
			)
			}
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: 100
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
		flex: 7,
		justifyContent: 'center'
	},
	gradient: {
		alignSelf: 'flex-start',
		borderRadius: 25,
		marginVertical: 20,
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
		width: '80%'
	},
	isFocused: {
		transform: [{ scale: 1.05 }]
	},
	link: {
		borderBottomColor: COMMON_COLORS.DARK_BLUE,
		borderBottomWidth: 2
	},
	linkText: {
		color: COMMON_COLORS.BLUE,
		fontSize: 16
	},
	signupButton: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	signupContainer: {
		alignItems: 'center',
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	subtitle: {
		color: COMMON_COLORS.VERY_DARK_GREY,
		fontSize: 20,
		fontWeight: 'bold'
	}
});
