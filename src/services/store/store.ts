import { configureStore } from "@reduxjs/toolkit";
import BlessingStore from "./BlessingStore";
import distributionReducer from './DistributionStore';
import GeneralStore from "./GeneralStore";
import AuthStore from "./AuthStore";


export const store: any = configureStore({
	reducer: {
		distributionStore: distributionReducer,
		blessingStore: BlessingStore,
		authStore: AuthStore,
		generalStore: GeneralStore
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
})

