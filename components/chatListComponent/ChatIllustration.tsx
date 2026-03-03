import COLORS from "@/constants/colors";
import IMAGES from "@/constants/images";
import { Image } from "expo-image";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";

const ChatIllustration: React.FC = () => {
  const { fontScale } = useWindowDimensions();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontFamily: "Segoe_UI_Bold",
          color: COLORS.darkBlue,
          fontSize: fontScale * 20,
          lineHeight: 25,
        }}
      >
        {`"Find someone${"\n"}to chat with"`}
      </Text>

      <Image
        source={IMAGES.hello}
        style={{ width: 100, height: 140 }}
        contentFit="contain"
        alt="Post feed illustration"
      />
    </View>
  );
};

export default ChatIllustration;
