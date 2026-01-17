import COLORS from "@/constants/colors";
import useEditProfileStyles from "@/styles/editProfile.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EditProfileHeader = () => {
  const router = useRouter();

  // Styles
  const editProfileStyles = useEditProfileStyles();

  return (
    <View style={editProfileStyles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.white} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={editProfileStyles.title}>Edit Profile</Text>
    </View>
  );
};

export default EditProfileHeader;
