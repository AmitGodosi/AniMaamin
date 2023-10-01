import {
	SET_DISPLAYNAME_BLUR, SET_DISPLAYNAME_FOCUS, SET_EMAIL_BLUR, SET_EMAIL_FOCUS, SET_PASSWORD2_BLUR, SET_PASSWORD2_FOCUS, SET_PASSWORD_BLUR, SET_PASSWORD_FOCUS
} from "./reducersConsts";

export const signupReducerInitialState = {
	isEmailFocused: false,
	isPasswordFocused: false,
	isPassword2Focused: false,
	isDisplayNameFocused: false
};

export const signupReducer = (state: any, action: any) => {
	switch (action.type) {
		case SET_EMAIL_FOCUS:
			return {
				isEmailFocused: true,
				isPasswordFocused: false,
				isPassword2Focused: false,
				isDisplayNameFocused: false,
			};
		case SET_PASSWORD_FOCUS:
			return {
				isEmailFocused: false,
				isPasswordFocused: true,
				isPassword2Focused: false,
				isDisplayNameFocused: false,
			};
		case SET_PASSWORD2_FOCUS:
			return {
				isEmailFocused: false,
				isPasswordFocused: false,
				isPassword2Focused: true,
				isDisplayNameFocused: false,
			};
		case SET_DISPLAYNAME_FOCUS:
			return {
				isEmailFocused: false,
				isPasswordFocused: false,
				isPassword2Focused: false,
				isDisplayNameFocused: true,
			};
		case SET_EMAIL_BLUR:
		case SET_PASSWORD_BLUR:
		case SET_PASSWORD2_BLUR:
		case SET_DISPLAYNAME_BLUR:
			return {
				isEmailFocused: false,
				isPasswordFocused: false,
				isPassword2Focused: false,
				isDisplayNameFocused: false,
			};
		default:
			return state;
	}
};
