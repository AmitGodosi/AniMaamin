import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { distributionStore } from "./Names";
import { DistributionState } from "@/services/store/models";
import { EMPTY_STRING } from "@/consts/GeneralConsts";

type SelectedBookAction = {
	selectedBook: string;
}

type SelectedDaysAction = {
	selectedDays: string[]
}

const initialState = {
	selectedBook: EMPTY_STRING,
	selectedDays: []
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
		}
	}
})


export const setSelectedBook = distributionStoreSlice.actions.setSelectedBook
export const setSelectedDays = distributionStoreSlice.actions.setSelectedDays

export default distributionStoreSlice.reducer