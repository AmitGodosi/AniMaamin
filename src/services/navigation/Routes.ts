export enum ScreensNames {
	HOME = 'פרופיל',
	DAILY = 'סדר יומי',
	DISTRIBUTION = 'קריאת ספרי קודש',
	FINISHED_BOOKS = 'ספרים שחולקו',
	BLESSING = 'מאה ברכות',
	LOGIN = 'התחברות',
	SIGNUP = 'הרשמה',
	DAY_TIMES = 'זמני היום'
};

export enum RoutesNames {
	TABS_ROUTE = 'Tabs',
	LOGIN_ROUTE = 'Login',
	SIGNUP_ROUTE = 'Signup',
	HOME_ROUTE = 'Home',
	DAILY_ROUTE = 'Daily',
	PICK_BOOK_ROUTE = 'PickBook',
	PICK_DAYS_ROUTE = 'PickDays',
	FINISHED_BOOKS_ROUTE = 'FinishedBooks',
	BLESSING_ROUTE = 'Blessing'
}

export type RootStackParamList = {
	Tabs: undefined;
	Login: undefined;
	Signup: undefined;
	Home: undefined;
	Daily: undefined;
	PickBook: undefined;
	PickDays: undefined;
	FinishedBooks: undefined;
	Blessing: undefined;
};