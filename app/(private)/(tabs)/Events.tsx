import COLORS from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text>Events Screen</Text>
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
