import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { signOut } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  // States
  const [user, setUser] = useState({ firstName: "", image: "", fullName: "", faculty: "" });
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  const clearToken = useVerificationStore((state) => state.clearVerificationToken);
  const handleLogOut = async () => {
    try {
      await clearToken();
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Auth Context
  const { userUid } = useAuth();

  const fetchUserInfo = async () => {
    // Query user document
    const q = query(usersCollectionRef, where("uid", "==", userUid));
    const snapshot = await getDocs(q);

    // Get user's info
    snapshot.forEach((doc) => {
      const data = doc.data();
      setUser((prev) => ({
        ...prev,
        firstName: data.firstname,
        image: data.image,
        fullName: `${data.surname} ${data.firstname}`,
        faculty: data.faculty,
      }));
    });
  };

  // Fetch user info
  useEffect(() => {
    fetchUserInfo();
  }, []);

  console.log(user.firstName, user.image, user.fullName, user.faculty);

  const { width, fontScale } = useWindowDimensions();
  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      <Text>Profile Screen</Text>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={{ uri: user.image }}
            style={{
              alignSelf: "center",
              width: width * 0.15,
              height: width * 0.15,
              resizeMode: "contain",
              marginBottom: 20,
              borderRadius: 50,
              // backgroundColor: "red",
            }}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Avatar"
          />
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={COLORS.red}
            style={{ paddingLeft: 10 }}
          />
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    //alignItems: "center",
  },

  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    marginBottom: 20,
    //backgroundColor: COLORS.red,
  },

  profile: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    //backgroundColor: COLORS.darkGrey,
  },

  editBtn: {
    // width: 80,
    // height: 40,
    padding: 4,
    borderRadius: 5,
    backgroundColor: COLORS.purple,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  editBtnText: {
    color: COLORS.lightGrey,
    textAlign: "center",
    fontFamily: "Segoe_UI_Bold",
    paddingHorizontal: 10,
    //fontSize: 12,
  },

  logoutBtn: {
    // width: 80,
    // height: 40,
    padding: 4,
    borderRadius: 5,
    backgroundColor: COLORS.lightGrey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  logoutBtnText: {
    color: COLORS.red,
    textAlign: "center",
    fontFamily: "Segoe_UI_Bold",
    paddingRight: 10,
  },
});
