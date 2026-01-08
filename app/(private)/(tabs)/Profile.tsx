// React
import { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Expo
// Packages
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { getDocs, query, Timestamp, where } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import Header from "@/components/profile/Header";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
// Constants
import COLORS from "@/constants/colors";
import LOTTIES from "@/constants/lottie";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Firebase
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
// Styles
import useProfileScreenStyles from "@/styles/profile.styles";
import useReuseableStyles from "@/styles/reuable.styles";
// Utils
import formatFullName from "@/utils/formatUserFullname";

export default function ProfileScreen() {
  // States
  const [activeButton, setActiveButton] = useState<"Posts" | "Bookmarks">("Posts");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Firebase Auth
  const { userUid } = useAuth();

  // Styles
  const reUseableStyles = useReuseableStyles();
  const profileStyles = useProfileScreenStyles();

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Fetch user via TanStack Query instead of local state
  const fetchUserInfo = async () => {
    const q = query(usersCollectionRef, where("uid", "==", userUid));
    const snapshot = await getDocs(q);

    let fetchedInfo = {
      image: "",
      fullName: "",
      faculty: "",
      bio: "",
      joinedAt: { nanoseconds: 0, seconds: 0 },
    };

    snapshot.forEach((doc) => {
      const data = doc.data();
      fetchedInfo = {
        image: data?.image,
        fullName: `${data?.surname} ${data?.firstname}`,
        faculty: data?.faculty,
        bio: data?.bio,
        joinedAt: {
          nanoseconds: data?.joinedAt?.nanoseconds ?? 0,
          seconds: data?.joinedAt?.seconds ?? 0,
        },
      };
    });

    return fetchedInfo;
  };

  // TanStack Query
  const { data: user, isPending: isLoading } = useQuery<any>({
    queryKey: ["user", userUid],
    queryFn: fetchUserInfo,
    enabled: !!userUid,
    staleTime: 1000 * 60 * 4,
  });

  const firestoreTimestamp = {
    seconds: user?.joinedAt?.seconds, // seconds should always come first
    nanoseconds: user?.joinedAt?.nanoseconds,
  };

  // Turns the Firestore timestamp into  to JavaScript Date e.g Joined January 2025
  const date = new Timestamp(firestoreTimestamp.seconds, firestoreTimestamp.nanoseconds).toDate();
  // Format date
  const year = date?.getFullYear();
  const month = date?.toLocaleString("default", { month: "long" });

  // Format fullname
  const userFullname = formatFullName(user?.fullName);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <Header user={user} />

      {/* User Bio */}
      <UserBio
        isLoading={isLoading}
        user={user}
        userFullname={userFullname}
        month={month}
        year={year}
      />

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
