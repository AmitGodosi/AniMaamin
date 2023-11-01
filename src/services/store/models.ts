import { IBessingListData } from "@/screens/blessing/models";
import { TFinishedBook } from "@/screens/finished-books/models";

export interface ApplicationState {
	distributionStore: DistributionState;
	blessingStore: BlessingState;
	authStore: AuthState;
	generalStore: GeneralState;
};

export type DistributionState = {
	selectedBook: string;
	selectedDays: string[];
	inProgressBook: TFinishedBook;
};

export type AuthState = {
	userInfo: {
		displayName: string;
		isAdmin: boolean;
		uid: string;
		profilePicture: string;
	}
};

export type GeneralState = {
	dailySelectedDate: string;
	blessingSelectedDate: string;
	isStartToReadBook: boolean;
	profilePicture: Blob;
};

export type BlessingState = {
	allBlessing: IBessingListData;
}