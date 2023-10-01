import { IBessingListData } from "@/screens/blessing/models";

export const BlessingList: IBessingListData = {
	1: { label: 'אשר יצר', amount: 1, id: '1' },
	2: { label: 'נטילת ידים (של הבוקר)', amount: 1, id: '2' },
	3: { label: 'ברכות השחר', amount: 15, id: '3' },
	4: { label: 'ברכות התורה', amount: 2, id: '4' },
	5: { label: 'אלוקי נשמה', amount: 1, id: '5' },
	6: { label: 'תפילין', amount: 1, id: '6' },
	7: { label: 'ציצית', amount: 1, id: '7' },
	8: { label: 'ברכות ק"ש של שחרית', amount: 3, id: '8' },
	9: { label: 'ברכות ברוך שאמר וישתבח', amount: 2, id: '9' },
	10: { label: 'תפילת שמו"ע של מנחה', amount: 19, id: '10' },
	11: { label: 'תפילת שמו"ע של שחרית', amount: 19, id: '11' },
	12: { label: 'תפילת שמו"ע של ערבית', amount: 19, id: '12' },
	13: { label: 'ברכות ק"ש של ערבית', amount: 4, id: '13' },
	14: { label: 'נטילת ידים לסעודה', amount: 1, id: '14' },
	15: { label: 'ברכת המפיל', amount: 1, id: '15' },
	16: { label: 'ברכות הנהנין', amount: 1, id: '16' },
	17: { label: 'מעין שלוש', amount: 1, id: '17' },
	18: { label: 'ברכת המזון', amount: 3, id: '18' },
	19: { label: 'בורא נפשות', amount: 1, id: '19' },
}

export const MuiltipleClickedBlessing = ['1', '14', '16', '17', '18', '19']

export const BlessingActionRemove = 'REMOVE';

export const BlessingActionAdd = 'ADD';

export const HUNDRED_BLESSING_PAGE_TITLES = {
	ADD: 'ברכות חדשות',
	EXIST: 'מה בירכתי היום?',
	RESTART: 'התחל מחדש',
	SAVE: 'שמור'
}