import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { generalStore } from "./Names";
import { EMPTY_STRING } from "@/consts/GeneralConsts";
import { GeneralState } from "@/services/store/models";

type SelectedDateAction = {
	date: string;
}

type StartToReadBookAction = {
	isStartToReadBook: boolean;
}

type ProfilePictureAction = {
	profilePicture: Blob;
}

const initialState = {
	dailySelectedDate: EMPTY_STRING
} as GeneralState

const authStoreSlice = createSlice({
	name: generalStore,
	initialState,
	reducers: {
		setDailySelectedDate: (state: GeneralState, action: PayloadAction<SelectedDateAction>) => {
			state.dailySelectedDate = action.payload.date
		},
		setBlessingSelectedDate: (state: GeneralState, action: PayloadAction<SelectedDateAction>) => {
			state.blessingSelectedDate = action.payload.date
		},
		setIsStartToReadBook: (state: GeneralState, action: PayloadAction<StartToReadBookAction>) => {
			state.isStartToReadBook = action.payload.isStartToReadBook
		},
		setProfilePicture: (state: GeneralState, action: PayloadAction<ProfilePictureAction>) => {
			state.profilePicture = action.payload.profilePicture
		}
	}
})


export const setDailySelectedDate = authStoreSlice.actions.setDailySelectedDate
export const setBlessingSelectedDate = authStoreSlice.actions.setBlessingSelectedDate
export const setIsStartToReadBook = authStoreSlice.actions.setIsStartToReadBook
export const setProfilePicture = authStoreSlice.actions.setProfilePicture

export default authStoreSlice.reducer