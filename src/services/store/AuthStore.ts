import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { authStore } from "./Names";
import { AuthState } from "@/services/store/models";
import { EMPTY_STRING } from "@/consts/GeneralConsts";

type UserLoggedInAction = {
	userInfo: {
		displayName: string;
		isAdmin: boolean;
		uid: string;
		profilePicture: string;
	}
}

const initialState = {
	userInfo: {
		displayName: EMPTY_STRING,
		isAdmin: false,
		uid: EMPTY_STRING
	}
} as AuthState

const authStoreSlice = createSlice({
	name: authStore,
	initialState,
	reducers: {
		setUserLoggedIn: (state: AuthState, action: PayloadAction<UserLoggedInAction>) => {
			state.userInfo = action.payload.userInfo
		},
		setUserLoggedOut: (state: AuthState) => {
			state.userInfo = { isAdmin: false, displayName: EMPTY_STRING, uid: EMPTY_STRING, profilePicture: EMPTY_STRING }
		}
	}
})


export const setUserLoggedIn = authStoreSlice.actions.setUserLoggedIn
export const setUserLoggedOut = authStoreSlice.actions.setUserLoggedOut

export default authStoreSlice.reducer