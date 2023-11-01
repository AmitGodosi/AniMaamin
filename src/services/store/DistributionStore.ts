import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { distributionStore } from "./Names";
import { DistributionState } from "@/services/store/models";
import { EMPTY_STRING } from "@/consts/GeneralConsts";
import { TFinishedBook } from "@/screens/finished-books/models";

type SelectedBookAction = {
	selectedBook: string;
}

type SelectedDaysAction = {
	selectedDays: string[]
}

type InProgressBookAction = {
	inProgressBook: TFinishedBook;
}

const initialState = {
	selectedBook: EMPTY_STRING,
	selectedDays: [],
	inProgressBook: null
} as DistributionState

const distributionStoreSlice = createSlice({
	name: distributionStore,
	initialState,
	reducers: {
		setSelectedBook: (state: DistributionState, action: PayloadAction<SelectedBookAction>) => {
			state.selectedBook = action.payload.selectedBook
		},
		setSelectedDays: (state: DistributionState, action: PayloadAction<SelectedDaysAction>) => {
			state.selectedDays = action.payload.selectedDays
		},
		setInProgressBook: (state: DistributionState, action: PayloadAction<InProgressBookAction>) => {
			state.inProgressBook = action.payload.inProgressBook
		}
	}
})


export const setSelectedBook = distributionStoreSlice.actions.setSelectedBook
export const setSelectedDays = distributionStoreSlice.actions.setSelectedDays
export const setInProgressBook = distributionStoreSlice.actions.setInProgressBook

export default distributionStoreSlice.reducer