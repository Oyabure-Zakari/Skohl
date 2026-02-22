import COLORS from "@/constants/colors";
import useEditPostStyles from "@/styles/editPost.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EditPostHeader: React.FC = () => {
  const router = useRouter();

  const editPostStyles = useEditPostStyles();
  return (
    <View style={editPostStyles.header}>
      <TouchableOpacity style={editPostStyles.headerBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>
      <Text style={editPostStyles.headerTitle}>Edit Post</Text>
    </View>
  );
};

export default EditPostHeader;
