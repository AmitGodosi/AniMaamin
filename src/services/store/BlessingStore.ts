import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blessingStore } from "./Names";
import { IBessingListData } from "@/screens/blessing/models";
import { BlessingState } from "@/services/store/models";

type SetInitialStategAction = {
	allBlessing: IBessingListData
};

const initialState = {
	allBlessing: {},
} as BlessingState;

const blessingStoreSlice = createSlice({
	name: blessingStore,
	initialState,
	reducers: {
		setBlessingInitialState: (state: BlessingState, action: PayloadAction<SetInitialStategAction>) => {
			state.allBlessing = action.payload.allBlessing
		},
	},
});

export const setBlessingInitialState = blessingStoreSlice.actions.setBlessingInitialState;

export default blessingStoreSlice.reducer;