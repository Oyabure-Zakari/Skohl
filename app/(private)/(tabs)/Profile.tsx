import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import { signOut } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const clearToken = useVerificationStore((state) => state.clearVerificationToken);
  const handleLogOut = async () => {
    try {
      await clearToken();
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <CustomButton text={"Log Out"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
