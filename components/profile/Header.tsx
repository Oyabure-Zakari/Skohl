// React
import React from "react";
// React Native
import { Text, TouchableOpacity, View } from "react-native";
// Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
// Constants
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
// Custom Hooks
import useHandleLogOut from "@/hooks/logOut";
// Styles
import useProfileScreenStyles from "@/styles/profile.styles";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";

type HeaderProps = {
  user: any;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  // Styles
  const registerStyles = useRegisterScreenStyles();
  const profileStyles = useProfileScreenStyles();

  // Custom Hooks
  const { handleLogOut } = useHandleLogOut();
  return (
    <View style={profileStyles.header}>
      {/* Profile Section */}
      <View style={profileStyles.profile}>
        {/* Profile Image */}
        <Image
          source={{ uri: user?.image }}
          style={registerStyles.image}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
          alt="Avatar"
        />

        {/* Edit Button */}
        <TouchableOpacity style={profileStyles.editProfileBtn}>
          <Text style={profileStyles.editProfileBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={profileStyles.logOutBtn} onPress={handleLogOut}>
        <MaterialCommunityIcons name="logout" size={20} color={COLORS.red} />
        <Text style={profileStyles.logOutBtnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
