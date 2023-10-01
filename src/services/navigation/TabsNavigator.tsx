import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreensNames } from './Routes';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COMMON_COLORS } from '../sass/colors';
import BooksScreen from '@/screens/books';
import HomeScreen from '@/screens/home';
import BlessingScreen from '@/screens/blessing';
import DailyScreen from '@/screens/daily';
import DayTimesScreen from '@/screens/day-times';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
	const { DISTRIBUTION, HOME, DAILY, BLESSING, DAY_TIMES } = ScreensNames;

	return (
		<Tab.Navigator
			initialRouteName={HOME}
			screenOptions={() => ({
				headerShown: false,
				tabBarStyle: { paddingTop: 6 },
				tabBarLabelStyle: { fontSize: 12 },
				tabBarInactiveTintColor: COMMON_COLORS.GREY,
				tabBarActiveTintColor: COMMON_COLORS.BLUE

			})}>
			<Tab.Screen
				name={DAY_TIMES}
				component={DayTimesScreen}
				options={{
					tabBarIcon: ({ focused }) => <AntDesign name={focused ? "clockcircle" : "clockcircleo"} size={24} color={focused ? COMMON_COLORS.BLUE : COMMON_COLORS.GREY} />
				}}
			/>
			<Tab.Screen
				name={BLESSING}
				component={BlessingScreen}
				options={{
					tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="cash-100" size={24} color={focused ? COMMON_COLORS.BLUE : COMMON_COLORS.GREY} />
				}}
			/>
			<Tab.Screen
				name={DAILY}
				component={DailyScreen}
				options={{
					tabBarIcon: ({ focused }) => <Feather name="rotate-cw" size={24} color={focused ? COMMON_COLORS.BLUE : COMMON_COLORS.GREY} />
				}}
			/>
			<Tab.Screen
				name={DISTRIBUTION}
				component={BooksScreen}
				options={{
					tabBarIcon: ({ focused }) => <Ionicons name={focused ? "book" : "book-outline"} size={24} color={focused ? COMMON_COLORS.BLUE : COMMON_COLORS.GREY} />
				}}
			/>
			<Tab.Screen
				name={HOME}
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={24} color={focused ? COMMON_COLORS.BLUE : COMMON_COLORS.GREY} />
				}}
			/>
		</Tab.Navigator>
	)
}
