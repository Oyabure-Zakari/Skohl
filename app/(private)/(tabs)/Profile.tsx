import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { signOut } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  // States
  const [isBioAvalailable, setIsBioAvailable] = useState(false);
  const [activeButton, setActiveButton] = useState<"Posts" | "Bookmarks">("Posts");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );
  const [user, setUser] = useState({
    image: "",
    fullName: "",
    faculty: "",
    joinedAt: "",
  });

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Firebase Auth
  const { userUid } = useAuth();

  // Zustand
  const clearToken = useVerificationStore((state) => state.clearVerificationToken);

  // Styles
  const registerStyles = useRegisterScreenStyles();
  const reUseableStyles = useReuseableStyles();

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  const handleLogOut = async () => {
    try {
      await clearToken();
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
        joinedAt: data.joinedAt,
      }));
    });
  };

  // Fetch user info
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        {/* Profile Section */}
        <View style={styles.profile}>
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
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logOutBtn} onPress={handleLogOut}>
          <MaterialCommunityIcons name="logout" size={20} color={COLORS.red} />
          <Text style={styles.logOutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* User Bio */}
      <View style={styles.bioContainer}>
        <Text numberOfLines={1} style={styles.bioText1}>
          {user.fullName}
        </Text>
        <Text style={styles.bioText2}>
          {user.faculty}
          {"\n"}Ahmadu Bello University,{"\n"}Zaria
        </Text>

        {/* Display bio if available */}
        <Text numberOfLines={4} style={[styles.bioText2, { fontSize: 12, marginTop: 4 }]}>
          Mobile App Developer🔸I build fast, reliable, & visually appealing apps. My goal is to
          turn your ideas into elegant, performant app solutions that users love Passionate about
          technology and innovation. Avid reader and lifelong learner.
        </Text>
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
        <Text style={{ paddingHorizontal: 16 }}>
          Why use a lorem ipsum generator? If everyone used the identical lorem ipsum copy, search
          engines would flag it for plagiarism and downgrade the site for its lack of helpful
          content for the reader. However, when you send sample layouts filled with fun lorem ipsum
          to your customers, they will focus on the look and feel of the page instead of digging
          into and arguing about the content. Nevertheless, lorem ipsum generators do not spew a
          random bank of words and paragraphs. Why use a lorem ipsum generator? If everyone used the
          identical lorem ipsum copy, search engines would flag it for plagiarism and downgrade the
          site for its lack of helpful content for the reader. However, when you send sample layouts
          filled with fun lorem ipsum to your customers, they will focus on the look and feel of the
          page instead of digging into and arguing about the content. Nevertheless, lorem ipsum
          generators do not spew a random bank of words and paragraphs. Why use a lorem ipsum
          generator? If everyone used the identical lorem ipsum copy, search engines would flag it
          for plagiarism and downgrade the site for its lack of helpful content for the reader.
          However, when you send sample layouts filled with fun lorem ipsum to your customers, they
          will focus on the look and feel of the page instead of digging into and arguing about the
          content. Nevertheless, lorem ipsum generators do not spew a random bank of words and
          paragraphs. Why use a lorem ipsum generator? If everyone used the identical lorem ipsum
          copy, search engines would flag it for plagiarism and downgrade the site for its lack of
          helpful content for the reader. However, when you send sample layouts filled with fun
          lorem ipsum to your customers, they will focus on the look and feel of the page instead of
          digging into and arguing about the content. Nevertheless, lorem ipsum generators do not
          spew a random bank of words and paragraphs.
        </Text>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    //backgroundColor: COLORS.darkGrey,
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    //backgroundColor: "red",
  },

  editProfileBtn: {
    backgroundColor: COLORS.purple,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },

  editProfileBtnText: {
    color: COLORS.lightGrey,
    fontSize: 14,
    fontFamily: "Segoe_UI_Bold",
    textAlign: "center",
  },

  logOutBtn: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  logOutBtnText: {
    color: COLORS.red,
    fontSize: 14,
    fontFamily: "Segoe_UI_Bold",
    textAlign: "center",
  },

  bioContainer: {
    paddingHorizontal: 16,
  },

  bioText1: {
    fontSize: 18,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkBlue,
    width: "52%", // To prevent long names from overflowing
  },

  bioText2: {
    fontSize: 14,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkGrey,
  },
});
