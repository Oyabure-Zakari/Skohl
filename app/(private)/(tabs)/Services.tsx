import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text>Services Screen</Text>
      <FloatingActionButton />
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
