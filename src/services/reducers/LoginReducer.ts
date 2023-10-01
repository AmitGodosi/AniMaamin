export const loginReducerInitialState = {
	isEmailFocused: false,
	isPasswordFocused: false
};

export const loginReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_EMAIL_FOCUS':
			return {
				isEmailFocused: true,
				isPasswordFocused: false,
			};
		case 'SET_EMAIL_BLUR':
			return {
				isEmailFocused: false,
				isPasswordFocused: false,
			};
		case 'SET_PASSWORD_FOCUS':
			return {
				isEmailFocused: false,
				isPasswordFocused: true,
			};
		case 'SET_PASSWORD_BLUR':
			return {
				isEmailFocused: false,
				isPasswordFocused: false,
			};
		default:
			return state;
	}
};
