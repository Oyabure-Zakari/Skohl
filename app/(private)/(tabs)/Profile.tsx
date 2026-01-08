// React
import { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { ScrollView, Text, View } from "react-native";
// Packages/Libraries
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import Header from "@/components/profile/Header";
import PostAndBookmarksBtn from "@/components/profile/PostAndBookmarksBtn";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
// Constants
import COLORS from "@/constants/colors";
import LOTTIES from "@/constants/lottie";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Firebase
import fetchUserInfo from "@/firebase/users/fetchUserInfo";
// Styles
import useProfileScreenStyles from "@/styles/profile.styles";
import useReuseableStyles from "@/styles/reuable.styles";
// Utils
import formatFullName from "@/utils/formatUserFullname";
import formatDate from "@/utils/formateDate";

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
  const { data: user, isPending: isLoading } = useQuery<any>({
    queryKey: ["user", userUid],
    queryFn: () => fetchUserInfo(userUid),
    enabled: !!userUid, // only run when userUid is defined
    staleTime: 1000 * 60 * 4,
  });

  // Format fullname and date
  const userFullname = formatFullName(user?.fullName);
  const joinedDate = formatDate(user);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <Header user={user} />

      {/* User Bio */}
      <UserBio
        isLoading={isLoading}
        user={user}
        userFullname={userFullname}
        joinedDate={joinedDate}
      />

      {/* Posts and Bookmarks Buttons */}
      <PostAndBookmarksBtn activeButton={activeButton} setActiveButton={setActiveButton} />

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
