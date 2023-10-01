import { useState } from 'react';
import { Image, View, Text, StyleSheet, Alert } from 'react-native';
import { useCameraPermissions, PermissionStatus, launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker'
import { useDispatch } from 'react-redux';
import { EMPTY_STRING } from '@/consts/GeneralConsts';
import { COMMON_COLORS } from '@/services/sass/colors';
import { setProfilePicture } from '@/services/store/GeneralStore';
import ModifiedTouchableOpacity from './ModifiedTouchableOpacity';
import CustomModal from './Modal';

export default function ImagePicker() {
	const [pickedImage, setPickedImage] = useState<string>(EMPTY_STRING);
	const [isImagePickerModalOpen, setIsImagePickerModalOpen] = useState<boolean>(false);
	const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

	const dispatch = useDispatch()

	const verifyPermission = async () => {
		if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted
		}
		if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
			return false
		}
		return true
	}

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermission();

		if (!hasPermission) {
			return
		}
		const { assets } = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		})
		const imageUri = assets?.[0]?.uri;
		imageUri && handleConvertImageToBlob(imageUri)
		setIsImagePickerModalOpen(false)
	}

	const pickImageHandler = async () => {
		const result = await launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		});

		if (!result.canceled) {
			const imageUri = result.assets?.[0]?.uri
			imageUri && handleConvertImageToBlob(imageUri)
		} else {
			Alert.alert('You did not select any image.');
		}
		setIsImagePickerModalOpen(false)
	};

	const handleConvertImageToBlob = async (imageUri: string) => {
		const response = await fetch(imageUri)
		const blob = await response.blob()
		dispatch(setProfilePicture({ profilePicture: blob }))
		setPickedImage(imageUri)
	}

	return (
		<>
			<View style={styles.container}>
				<ModifiedTouchableOpacity title='תמונת פרופיל' onPress={() => setIsImagePickerModalOpen(true)} ButtonClassName={styles.imageButton} TextClassName={styles.imageButtonText} />
				<View style={[styles.imagePreview, { backgroundColor: pickedImage ? COMMON_COLORS.DEFAULT : COMMON_COLORS.DARK_GREY }]}>
					{pickedImage ? (
						<Image source={{ uri: pickedImage }} style={styles.image} />
					) : (
						<Text>לא נבחרה תמונה</Text>
					)}
				</View>
			</View>
			{isImagePickerModalOpen && (
				<CustomModal onClose={() => setIsImagePickerModalOpen(false)} visible={isImagePickerModalOpen} animationType="fade" transparent>
					<View style={styles.modal}>
						<ModifiedTouchableOpacity title='תמונה מהגלרייה' onPress={pickImageHandler} ButtonClassName={styles.modalButton} TextClassName={styles.modalButtonText} />
						<ModifiedTouchableOpacity title='תמונה חדשה' onPress={takeImageHandler} ButtonClassName={styles.modalButton} TextClassName={styles.modalButtonText} />
					</View>
				</CustomModal>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	image: {
		borderRadius: 5,
		height: '100%',
		resizeMode: 'contain',
		width: '100%'
	},
	imageButton: {
		borderBottomColor: COMMON_COLORS.BLUE,
		borderBottomWidth: 1,
		marginBottom: 20,
	},
	imageButtonText: {
		color: COMMON_COLORS.VERY_DARK_GREY,
		fontSize: 16,
		textAlign: 'center'
	},
	imagePreview: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 5,
		height: '80%',
		justifyContent: 'center',
		width: '100%'
	},
	modal: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.WHITE,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 10,
		paddingVertical: 20,
		width: '80%'
	},
	modalButton: {
		borderColor: COMMON_COLORS.VERY_LIGHT_BLUE,
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
		width: '45%'
	},
	modalButtonText: {
		color: COMMON_COLORS.VERY_DARK_BLUE,
		fontSize: 16,
		textAlign: 'center'
	}
});