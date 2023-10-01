export type TFinishedBooks = TFinishedBook[];

export type TUserFinishedBook = TFinishedBook & {
	totalDays: string[];
}
export type TFinishedBook = {
	id: string;
	date: string;
	book: string;
	contributors: TContributor[];
	status: string;
}

export type TContributor = {
	name: string;
	id: string;
	days: string[];
};