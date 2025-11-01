import COLORS from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function ChatListsScreen() {
  return (
    <View style={styles.container}>
      <Text>ChatLists Screen</Text>
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
