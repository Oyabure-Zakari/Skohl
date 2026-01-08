// React
import { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// Packages
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { getDocs, query, Timestamp, where } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
// Constants
import COLORS from "@/constants/colors";
import LOTTIES from "@/constants/lottie";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Firebase
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
// Custom Hooks
// Styles
import useProfileScreenStyles from "@/styles/profile.styles";
import useReuseableStyles from "@/styles/reuable.styles";
// Utils
import Header from "@/components/profile/Header";
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
      <View style={profileStyles.bioContainer}>
        {isLoading ? (
          <>
            {/* Skeleton */}
            <MotiView style={{ marginBottom: 6 }}>
              <Skeleton show={isLoading} colorMode="light" width={"60%"}></Skeleton>
            </MotiView>
            <MotiView style={{ marginBottom: 6 }}>
              <Skeleton show={isLoading} colorMode="light" width={"40%"}></Skeleton>
            </MotiView>
          </>
        ) : (
          <>
            {/* Full Name */}
            <Text numberOfLines={1} style={profileStyles.bioText1}>
              {userFullname}
            </Text>

            {/* Faculty */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="school-outline" size={20} color={COLORS.darkGrey} />
              <Text style={profileStyles.bioText2}> {user?.faculty} </Text>
            </View>

            {/* Joined Date */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="date-range" size={20} color={COLORS.darkGrey} />
              <Text style={profileStyles.bioText2}>
                Joined {month}, {year}
              </Text>
            </View>

            {/* Display bio if available */}
            {user?.bio && (
              <Text
                numberOfLines={4}
                style={[profileStyles.bioText2, { fontSize: 12, marginTop: 4 }]}
              >
                {user?.bio}
              </Text>
            )}
          </>
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
