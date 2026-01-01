import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import LOTTIES from "@/constants/lottie";
import { useAuth } from "@/contexts/AuthContext";
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import useHandleLogOut from "@/hooks/logOut";
import useProfileScreenStyles from "@/styles/profile.styles";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { getDocs, query, Timestamp, where } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  // States
  const [activeButton, setActiveButton] = useState<"Posts" | "Bookmarks">("Posts");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );
  const [user, setUser] = useState({
    image: "",
    fullName: "",
    faculty: "",
    bio: "",
    joinedAt: {
      nanoseconds: 0,
      seconds: 0,
    },
  });

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Firebase Auth
  const { userUid } = useAuth();

  // Styles
  const registerStyles = useRegisterScreenStyles();
  const reUseableStyles = useReuseableStyles();
  const profileStyles = useProfileScreenStyles();

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Custom Hooks
  const { handleLogOut } = useHandleLogOut();

  const fetchUserInfo = async () => {
    // Query user document
    const q = query(usersCollectionRef, where("uid", "==", userUid));
    const snapshot = await getDocs(q);

    // Get user's info
    snapshot.forEach((doc) => {
      const data = doc.data();
      setUser((prev) => ({
        ...prev,
        image: data.image,
        fullName: `${data.surname} ${data.firstname}`,
        faculty: data.faculty,
        bio: data.bio,
        joinedAt: {
          nanoseconds: data.joinedAt.nanoseconds,
          seconds: data.joinedAt.seconds,
        },
      }));
    });
  };

  // Fetch user info
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Your timestamp object from Firestore
  const firestoreTimestamp = {
    seconds: user.joinedAt.seconds, // seconds should always come first
    nanoseconds: user.joinedAt.nanoseconds,
  };

  // Convert to Firebase Timestamp, then to JavaScript Date
  const date = new Timestamp(firestoreTimestamp.seconds, firestoreTimestamp.nanoseconds).toDate();

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <View style={profileStyles.header}>
        {/* Profile Section */}
        <View style={profileStyles.profile}>
          {/* Profile Image */}
          <Image
            source={{ uri: user.image }}
            style={registerStyles.image}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Avatar"
          />

          {/* Edit Button */}
          <TouchableOpacity style={profileStyles.editProfileBtn}>
            <Text style={profileStyles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={profileStyles.logOutBtn} onPress={handleLogOut}>
          <MaterialCommunityIcons name="logout" size={20} color={COLORS.red} />
          <Text style={profileStyles.logOutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* User Bio */}
      <View style={profileStyles.bioContainer}>
        {/* Full Name */}
        <Text numberOfLines={1} style={profileStyles.bioText1}>
          {user.fullName}
        </Text>

        {/* Faculty */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="school-outline" size={20} color={COLORS.darkGrey} />
          <Text style={profileStyles.bioText2}> {user.faculty} </Text>
        </View>

        {/* Joined Date */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="date-range" size={20} color={COLORS.darkGrey} />
          <Text style={profileStyles.bioText2}>
            Joined {month}, {year}
          </Text>
        </View>

        {/* Display bio if available */}
        {user.bio && (
          <Text numberOfLines={4} style={[profileStyles.bioText2, { fontSize: 12, marginTop: 4 }]}>
            {user.bio}
          </Text>
        )}
      </View>

      {/* Posts and Bookmarks Buttons */}
      <View style={[reUseableStyles.buttonTypeContainer, { alignSelf: "center", marginTop: 10 }]}>
        {/* Posts Button */}
        <TouchableOpacity
          style={[
            activeButton === "Posts"
              ? reUseableStyles.activeButton
              : reUseableStyles.inactiveButton,
          ]}
          onPress={() => setActiveButton("Posts")}
        >
          <Text
            style={[
              activeButton === "Posts" ? reUseableStyles.activeText : reUseableStyles.inactiveText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>

        {/* Bookmarks Button */}
        <TouchableOpacity
          style={[
            activeButton === "Bookmarks"
              ? reUseableStyles.activeButton
              : reUseableStyles.inactiveButton,
          ]}
          onPress={() => setActiveButton("Bookmarks")}
        >
          <Text
            style={[
              activeButton === "Bookmarks"
                ? reUseableStyles.activeText
                : reUseableStyles.inactiveText,
            ]}
          >
            Bookmarks
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider*/}
      <View style={reUseableStyles.bottomSheetDivider} />

      {/* Content */}
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: "red",
          }}
        >
          <LottieView
            autoPlay
            speed={1.5}
            style={profileStyles.lottieStyle}
            source={LOTTIES.nothingFound}
          />
          <Text style={{ fontFamily: "Segoe_UI_Bold", fontSize: 16, color: COLORS.darkGrey }}>
            No {activeButton === "Posts" ? "posts" : "bookmarks"} found.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}
