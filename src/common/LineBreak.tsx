import { COMMON_COLORS } from '@/services/sass/colors';
import { StyleSheet, View } from 'react-native';

const LineBreak = () => {
	return (
		<View
			style={styles.container}
		/>
	);
};

export default LineBreak;

const styles = StyleSheet.create({
	container: {
		borderBottomColor: COMMON_COLORS.BLACK,
		borderBottomWidth: 1,
		marginVertical: 10,
		width: '100%'
	}
});