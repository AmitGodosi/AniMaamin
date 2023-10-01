export type TDailyItems = TDailyItem[];

export type TDailyItem = {
	id: string;
	label: string;
	name: string;
	options?: TDailyItemOptions[];
}

export type TDailyItemOptions = {
	id: string;
	label: string;
	name: string;
}

export type TCheckedCheckboxes = {
	elements: {
		[key: string]: string;
	};
	options: {
		[key: string]: number;
	};
}