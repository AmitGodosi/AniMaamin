import { RootStackParamList, RoutesNames, ScreensNames } from './Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_PAGE } from '@/consts';
import { useNavigation } from '@react-navigation/native';
import { COMMON_COLORS } from '@/services/sass/colors';
import TabsNavigator from './TabsNavigator';
import DailyScreen from '@/screens/daily';
import BackButton from '@/common/BackButton';
import BooksScreen from '@/screens/books';
import DaysScreen from '@/screens/days';
import FinishedBooksScreen from '@/screens/finished-books';
import HundredBlessing from '@/screens/blessing';
import SignupScreen from '@/screens/SignupScreen';
import LoginScreen from '@/screens/login';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
	const navigation = useNavigation();

	const {
		DAILY_ROUTE, PICK_BOOK_ROUTE, PICK_DAYS_ROUTE, FINISHED_BOOKS_ROUTE,
		BLESSING_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, TABS_ROUTE
	} = RoutesNames;
	const {
		DAILY, DISTRIBUTION, FINISHED_BOOKS, BLESSING, LOGIN, SIGNUP, HOME
	} = ScreensNames;

	return (
		<Stack.Navigator screenOptions={{
			headerStyle: { backgroundColor: COMMON_COLORS.DARK_GREY },
			headerTintColor: COMMON_COLORS.WHITE
		}}>
			<Stack.Screen
				name={LOGIN_ROUTE}
				component={LoginScreen}
				options={{
					title: LOGIN,
					headerShown: false
				}}
			/>
			<Stack.Screen
				name={SIGNUP_ROUTE}
				component={SignupScreen}
				options={{
					title: SIGNUP,
					headerShown: false
				}}
			/>
			<Stack.Screen
				name={TABS_ROUTE}
				component={TabsNavigator}
				options={{
					headerShown: false,
					gestureEnabled: false
				}}
			/>
			<Stack.Screen
				name={DAILY_ROUTE}
				component={DailyScreen}
				options={{
					title: DAILY
				}}
			/>
			<Stack.Screen
				name={PICK_BOOK_ROUTE}
				component={BooksScreen}
				options={{
					title: DISTRIBUTION
				}}
			/>
			<Stack.Screen
				name={PICK_DAYS_ROUTE}
				component={DaysScreen}
				options={{
					title: DISTRIBUTION
				}}
			/>
			<Stack.Screen
				name={FINISHED_BOOKS_ROUTE}
				component={FinishedBooksScreen}
				options={{
					title: FINISHED_BOOKS,
					headerLeft: () => <BackButton title={HOME_PAGE} customOnPress={() => navigation.navigate(HOME as never)} />,
					gestureEnabled: false
				}}
			/>
			<Stack.Screen
				name={BLESSING_ROUTE}
				component={HundredBlessing}
				options={{
					title: BLESSING
				}}
			/>
		</Stack.Navigator>

	)
}