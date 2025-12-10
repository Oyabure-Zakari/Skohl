import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SafeScreen from "@/components/SafeScreen";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import useVerificationStore from "@/store/verificatonStore";

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

  const verificationToken = useVerificationStore((state) => state.verificationToken);
  const checkVerificationToken = useVerificationStore((state) => state.checkVerificationToken);

  const { userUid, loading: authLoading } = useAuth();

  useEffect(() => {
    checkVerificationToken();
  }, []);

  useEffect(() => {
    if (loaded && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authLoading]);

  // Show nothing (or loading screen) until auth is ready
  if (!loaded || authLoading) {
    return <OverlayLoadingIndicator />;
  }

  const isVerifiedAndAuthenticated = !!verificationToken && !!userUid;

  return (
    <Stack>
      <Stack.Protected guard={isVerifiedAndAuthenticated}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(private)/(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isVerifiedAndAuthenticated}>
        <Stack.Screen name="(public)/(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SafeScreen>
          <KeyboardProvider>
            <AppLayout />
          </KeyboardProvider>
        </SafeScreen>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
