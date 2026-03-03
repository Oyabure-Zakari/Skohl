import COLORS from "@/constants/colors";
import IMAGES from "@/constants/images";
import { Image } from "expo-image";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";

const NoChatsComponent: React.FC = () => {
  const { fontScale } = useWindowDimensions();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={IMAGES.noChats}
        style={{ width: 200, height: 200 }}
        contentFit="contain"
        alt="No Chats"
      />

      <Text
        style={{
          fontSize: fontScale * 16,
          fontFamily: "Segoe_UI_Bold",
          color: COLORS.darkGrey,
        }}
      >
        No chats yet.
      </Text>
    </View>
  );
};

export default NoChatsComponent;
