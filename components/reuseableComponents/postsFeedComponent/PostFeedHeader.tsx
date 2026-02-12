import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/userProfile";
import useHomeStyles from "@/styles/homeStyles";
import UserProfileType from "@/types/userProfileTypes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

type PostFeedHeaderProps = {
  screenText: string;
};

const PostFeedHeader: React.FC<PostFeedHeaderProps> = ({ screenText }) => {
  const homeStyles = useHomeStyles();

  const router = useRouter();

  const { userUid } = useAuth();
  const { data, isError, error } = useUserProfile(userUid);
  const user: UserProfileType = data;

  if (isError) Alert.alert("Error", error.message);

  return (
    <View style={homeStyles.header}>
      <Text style={homeStyles.screenText}>{screenText}</Text>

      {/* User Image */}
      <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
        <Image
          source={{ uri: user?.image }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
          alt="Profile Picture"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostFeedHeader;
