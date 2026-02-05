import blurhash from "@/constants/expoBlurImage";
import useHomeStyles from "@/styles/homeStyles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type HomeHeaderProps = {};

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  const homeStyles = useHomeStyles();

  const router = useRouter();

  return (
    <View style={homeStyles.header}>
      {/* User Name */}
      <Text style={homeStyles.userName}>Hey,{"\n"}Halima</Text>
      {/* User Image */}
      <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
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

export default HomeHeader;
