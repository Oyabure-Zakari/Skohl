import SafeScreen from "@/components/SafeScreen";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

// Configure Expo Router to use (tabs) as the initial route
export const unstable_settings = {
  // 'anchor' tells Expo which route should be loaded first
  // In this case, it will load the (private)/(tabs) group/folder
  anchor: "(private)/(tabs)",
};

function AppLayout() {
  const [loaded, error] = useFonts({
    Segoe_UI: require("../assets/fonts/Segoe_UI.ttf"),
    Segoe_UI_Bold: require("../assets/fonts/Segoe_UI_Bold.ttf"),
    Segoe_UI_Italic: require("../assets/fonts/Segoe_UI_Italic.ttf"),
    Segoe_UI_Bold_Italic: require("../assets/fonts/Segoe_UI_Bold_Italic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const isAuthenticated = false;

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(private)/(tabs)"
          options={{ headerShown: false }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(public)/(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeScreen>
        <KeyboardProvider>
          <AppLayout />
        </KeyboardProvider>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
