// React
import { useCallback, useEffect } from "react";
// React Native
import { Alert } from "react-native";
// Expo
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// Packages
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
// Libraries
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
// Components
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SafeScreen from "@/components/SafeScreen";
// Contexts
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
// Zustand
import useVerificationStore from "@/store/verificatonStore";
// Firebase
import COLORS from "@/constants/colors";
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { db } from "@/firebase/firebase.config";
import { doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";

// Initialize the library with English locale
TimeAgo.addDefaultLocale(en);

SplashScreen.preventAutoHideAsync();

// Configure Expo Router to use (tabs) as the initial route
export const unstable_settings = {
  // 'anchor' tells Expo which route should be loaded first
  // In this case, it will load the (private)/(tabs) group/folder
  anchor: "(private)/(tabs)",
};

function AppLayout() {
  const [loaded] = useFonts({
    Segoe_UI: require("../assets/fonts/Segoe_UI.ttf"),
    Segoe_UI_Bold: require("../assets/fonts/Segoe_UI_Bold.ttf"),
    Segoe_UI_Italic: require("../assets/fonts/Segoe_UI_Italic.ttf"),
    Segoe_UI_Bold_Italic: require("../assets/fonts/Segoe_UI_Bold_Italic.ttf"),
  });

  // Zustand
  const verificationFingerprint = useVerificationStore((state) => state.verificationFingerprint);
  const studentInfo = useVerificationStore((state) => state.studentInfo);
  const loadVerificationFingerprint = useVerificationStore(
    (state) => state.loadVerificationFingerprint
  );
  const loadVerifiedStudentInfo = useVerificationStore((state) => state.loadVerifiedStudentInfo);

  // Firebase
  const { userUid, loading: authLoading } = useAuth();

  // Fetch user doc from Firestore
  const {
    data: userDoc,
    isLoading: userLoading,
    isError: userError,
    error: userErrorDetails,
    refetch,
  } = useQuery({
    queryKey: ["userDoc", userUid],
    queryFn: async () => {
      if (!userUid) return null;
      // Check if user doc exists
      const q = query(usersCollectionRef, where("uid", "==", userUid));
      const snapshot = await getDocs(q);
      // If user doc doesn't exist, return null
      return snapshot.empty ? null : snapshot.docs[0].data();
    },
    enabled: !!userUid, // Only fetch if userUid is defined
    retry: false, // Disable automatic retries
  });

  // Auto-create Firestore user if missing but we have auth + verification data
  const createUserIfMissing = useCallback(async () => {
    if (!userUid || !verificationFingerprint || !studentInfo) return;

    // Check if user doc already exists
    if (userDoc) return; // Already created

    try {
      await setDoc(doc(db, "users", userUid), {
        uid: userUid,
        image: "",
        firstname: studentInfo.firstname,
        surname: studentInfo.surname,
        faculty: studentInfo.faculty,
        gender: studentInfo.gender,
        religion: studentInfo.religion,
        bio: "",
        verificationFingerprint,
        joinedAt: serverTimestamp(),
      });
      refetch(); // Refresh query
    } catch (error: any) {
      // Show alert with retry option
      Alert.alert(
        "Error Creating User",
        `Failed to create your user profile: ${error.message || "Unknown error"}`,
        [
          {
            text: "Retry",
            onPress: () => {
              refetch(); // This will trigger the query again
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [userUid, verificationFingerprint, studentInfo, userDoc, refetch]);

  // Show alert for query errors (e.g., fetching user doc)
  useEffect(() => {
    if (userError && userErrorDetails) {
      Alert.alert(
        "Error Loading User",
        `Failed to load user data: ${userErrorDetails.message || "Unknown error"}`,
        [
          {
            text: "Retry",
            onPress: () => {
              refetch();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [userError, userErrorDetails, refetch]);

  // Run creation check on every mount or when auth/verification changes
  useEffect(() => {
    if (loaded && !authLoading && !userLoading) {
      createUserIfMissing();
    }
  }, [loaded, authLoading, userLoading, createUserIfMissing]);

  // Load verification fingerprint and student info on app start
  useEffect(() => {
    loadVerificationFingerprint();
    loadVerifiedStudentInfo();
  }, [loadVerificationFingerprint, loadVerifiedStudentInfo]);

  // Hide splash when ready
  useEffect(() => {
    if (loaded && !authLoading && !userLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authLoading, userLoading]);

  if (!loaded || authLoading || userLoading) {
    return <OverlayLoadingIndicator />;
  }

  const isVerifiedAndAuthenticated = !!verificationFingerprint && !!userUid && !!userDoc;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isVerifiedAndAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(private)/(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!isVerifiedAndAuthenticated}>
        <Stack.Screen name="(public)/(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

// TanStack Query Client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="dark" backgroundColor={COLORS.white} />
          <SafeScreen>
            <KeyboardProvider>
              <AppLayout />
              {/* Toast Message must be added to the bottom */}
              <Toast position="top" visibilityTime={4000} />
            </KeyboardProvider>
          </SafeScreen>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
