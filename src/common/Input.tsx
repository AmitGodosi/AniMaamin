import { Text, View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { COMMON_COLORS } from '@/services/sass/colors';

type Props = {
	inputProps?: InputProps;
	label: string;
	labelStyle?: StyleProp<ViewStyle>;
}

type InputProps = {
	keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
	placehlder?: string;
	style?: StyleProp<ViewStyle>;
}

export default function Input({ inputProps, label, labelStyle }: Props) {
	return (
		<View style={styles.container}>
			<Text style={labelStyle && labelStyle}>{label}</Text>
			<TextInput {...inputProps} style={styles.input} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 15,
		width: '100%'
	},
	input: {
		borderColor: COMMON_COLORS.GREY,
		borderWidth: 2,
		padding: 10,
		width: '50%'
	}
});