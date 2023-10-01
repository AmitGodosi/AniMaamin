import { ReactNode } from 'react';
import { BACKGROUND_COLORS } from '@/services/sass/colors';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native'

type Props = {
	visible: boolean;
	onClose: () => void;
	children: ReactNode;
	animationType?: "none" | "slide" | "fade";
	transparent?: boolean;
}

export default function CustomModal({ visible, onClose, animationType, transparent, children }: Props) {
	return (
		<Modal animationType={animationType} transparent={transparent} visible={visible} onRequestClose={onClose}>
			<TouchableOpacity style={styles.overlay} onPress={onClose}>
				{children}
			</TouchableOpacity>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		alignItems: 'center',
		backgroundColor: BACKGROUND_COLORS.MODAL,
		flex: 1,
		justifyContent: 'center'
	}
});