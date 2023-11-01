export interface IBessingListData {
	[key: string]: TBlessing;
}

export type TBlessing = {
	label: string;
	amount: number;
	id: string;
	nubmerOfClicked?: number;
}

export type TBlessingList = {
	id?: TBlessing
}