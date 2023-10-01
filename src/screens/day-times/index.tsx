import { useState, useEffect, useMemo } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Zmanim } from '@hebcal/core';
import { CITIES_DATA, TIMES_LABEL, TZEIT } from '@/screens/day-times/consts';
import { TCityGeo, TCityTimes } from './models';
import { COLON } from '@/consts/GeneralConsts';
import { COMMON_COLORS } from '@/services/sass/colors';
import RNPickerSelect from 'react-native-picker-select';
import LineBreak from '../../common/LineBreak';

type TItem = {
	item: string;
}

export default function DayTimesScreen() {
	const [selectedCityGeo, setSelectedCityGeo] = useState<TCityGeo>(CITIES_DATA[0].value);
	const [cityTimes, setCityTimes] = useState<TCityTimes>({});

	const selectedCity = useMemo(() => {
		return selectedCityGeo || CITIES_DATA[0].value;
	}, [selectedCityGeo]);

	useEffect(() => {
		const cityTime = new Zmanim(new Date(), selectedCity.latitude, selectedCity.longitude);
		const CITY_TIMES = {
			alotHaShachar: cityTime.alotHaShachar().toLocaleTimeString(),
			neitzHaChama: cityTime.neitzHaChama().toLocaleTimeString(),
			sofZmanShmaMGA: cityTime.sofZmanShmaMGA().toLocaleTimeString(),
			sofZmanShma: cityTime.sofZmanShma().toLocaleTimeString(),
			sofZmanTfillaMGA: cityTime.sofZmanTfillaMGA().toLocaleTimeString(),
			sofZmanTfilla: cityTime.sofZmanTfilla().toLocaleTimeString(),
			chatzot: cityTime.chatzot().toLocaleTimeString(),
			minchaGedola: cityTime.minchaGedola().toLocaleTimeString(),
			minchaKetana: cityTime.minchaKetana().toLocaleTimeString(),
			plagHaMincha: cityTime.plagHaMincha().toLocaleTimeString(),
			shkiah: cityTime.shkiah().toLocaleTimeString(),
			tzeit: cityTime.tzeit().toLocaleTimeString(),
		};
		setCityTimes(CITY_TIMES);
	}, [selectedCity]);

	const CityKey = (item: TItem) => {
		const key = item?.item
		const valueWithoutSeconds = cityTimes?.[key]?.substring(0, cityTimes?.[key]?.lastIndexOf(COLON));

		return (
			<>
				<View style={styles.row}>
					<Text style={styles.time}>{valueWithoutSeconds}</Text>
					<Text style={styles.label}>{TIMES_LABEL?.[key]}</Text>
				</View>
				{key !== TZEIT && <LineBreak />}
			</>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.dropdown}>
				<RNPickerSelect
					onValueChange={setSelectedCityGeo}
					items={CITIES_DATA}
					value={selectedCityGeo}
					placeholder={{ label: 'בחר מיקום', value: null }}
					style={{
						inputIOS: {
							color: COMMON_COLORS.WHITE,
							fontSize: 16,
							letterSpacing: 1,
							textAlign: 'center'
						}
					}}
				/>
			</View>
			<View style={styles.times}>
				{cityTimes && (
					<FlatList
						data={Object.keys(cityTimes)}
						renderItem={({ item }) => <CityKey item={item} />}
						keyExtractor={(item) => item}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
		justifyContent: 'space-around'
	},
	dropdown: {
		backgroundColor: COMMON_COLORS.VERY_DARK_BLUE,
		borderRadius: 10,
		opacity: 0.85,
		padding: 10
	},
	label: {
		fontSize: 16
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5
	},
	time: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	times: {
		backgroundColor: COMMON_COLORS.MIDDLE_GREY,
		borderRadius: 20,
		padding: 20,
		width: '90%',
	}
});
