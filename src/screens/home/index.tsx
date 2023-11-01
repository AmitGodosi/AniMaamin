import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { logoutHandler } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/services/store/models";
import { COMMON_COLORS } from "@/services/sass/colors";
import Remainders from "./compenents/Remainders";

type Props = {
	navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
	const userInfo = useSelector((state: ApplicationState) => state?.authStore?.userInfo)
	const dispatch = useDispatch()

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.screenHeader}>
				<TouchableOpacity
					style={[styles.footerButton, { marginLeft: 40, backgroundColor: COMMON_COLORS.VERY_DARK_BLUE, marginBottom: 0 }]}
					onPress={() => logoutHandler(navigation, dispatch)}
				>
					<AntDesign name="logout" size={16} color='white' />
					<Text style={styles.footerButtonText}>התנתקות</Text>
				</TouchableOpacity>
				<View style={styles.screenTitle}>
					<Image style={styles.image} source={userInfo?.profilePicture ? { uri: userInfo?.profilePicture } : require('../../../assets/noProfile.png')} />
					<Text style={styles.displayName}>{userInfo.displayName}</Text>
				</View>
			</View>
			<Remainders />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DEFAULT,
		flex: 1,
		gap: 20
	},
	displayName: {
		color: COMMON_COLORS.WHITE,
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 1
	},
	footerButton: {
		alignItems: 'center',
		backgroundColor: COMMON_COLORS.DARK_GREY,
		borderRadius: 10,
		flexDirection: 'row',
		gap: 6,
		justifyContent: 'center',
		marginHorizontal: 10,
		opacity: 0.8,
		paddingHorizontal: 12,
		paddingVertical: 8
	},
	footerButtonText: {
		color: COMMON_COLORS.WHITE,
		fontSize: 16,
	},
	image: {
		borderRadius: 50,
		height: 80,
		marginVertical: 10,
		resizeMode: 'cover',
		width: 80
	},
	screenHeader: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		flex: 1.5,
		justifyContent: 'space-between',
		width: '100%'
	},
	screenTitle: {
		alignItems: 'flex-end',
		marginRight: 20,
		marginTop: 10
	}
});

export default HomeScreen